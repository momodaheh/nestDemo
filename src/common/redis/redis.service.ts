import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor() {
    // 连接本地Redis
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  // 存数据，ttl是过期时间，单位秒，不传就永久存
  async set(key: string, value: any, ttl?: number) {
    const strValue = JSON.stringify(value);
    if (ttl) {
      await this.redis.set(key, strValue, 'EX', ttl);
    } else {
      await this.redis.set(key, strValue);
    }
  }

  // 取数据，返回null就是没缓存
  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  // 删数据
  async del(key: string) {
    await this.redis.del(key);
  }
}
