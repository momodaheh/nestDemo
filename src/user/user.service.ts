import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserStatsDto } from './user-stats.dto';
import { RedisService } from '../common/redis/redis.service';




@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private redisService: RedisService, // 注入Redis服务
  ) {}

  async findAll(page = 1, limit = 10) {
    const cacheKey = `all_users_${page}_${limit}`;
    // 1. 先查Redis
    const cacheData = await this.redisService.get<User[]>(cacheKey);
    if (cacheData) {
      console.log('走Redis缓存');
      return cacheData;
    }
    // 2. 查PG
    console.log('走PG数据库');
    const users = await this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    // 3. 存Redis 60秒
    await this.redisService.set(cacheKey, users, 60);
    return users;
  }

  findOne(id: number) {
    if (Number.isNaN(id)) return '无效的 id';
    return this.userRepository.findOneBy({ id });
  }

  // 查询用户并带出所有文章
  findOneWithArticles(id: number) {
    if (Number.isNaN(id)) return '无效的 id';
    return this.userRepository.findOne({
      where: { id },
      relations: ['articles'], // 自动把这个用户的所有文章一起查出来
    });
  }

  create(data: Partial<User>) {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async update(id: number, data: Partial<User>) {
    if (Number.isNaN(id)) return '无效的 id';
    await this.userRepository.update(id, data);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    if (Number.isNaN(id)) return '无效的 id';
    await this.userRepository.delete(id);
    return '删除成功';
  }

  // 获取用户统计信息（计算结果，不是数据库表）
  async getUserStats(): Promise<UserStatsDto> {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      return {
        totalUsers: 0,
        averageAge: 0,
        maxAge: 0,
        minAge: 0,
      };
    }

    const totalUsers = users.length;
    const ages = users.map((u) => u.age);
    const averageAge = ages.reduce((a, b) => a + b, 0) / totalUsers;
    const maxAge = Math.max(...ages);
    const minAge = Math.min(...ages);

    return {
      totalUsers,
      averageAge,
      maxAge,
      minAge,
    };
  }
}
