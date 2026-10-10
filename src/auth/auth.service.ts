import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;
    const existUser = await this.userRepo.findOne({ where: { name: username } });
    if (existUser) throw new ConflictException('用户名已存在');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepo.create({ name: username, password: hashedPassword });
    await this.userRepo.save(newUser);
    return { message: '注册成功', userId: newUser.id };
  }

  async login(loginDto: RegisterDto) {
    const { username, password } = loginDto;
    const user = await this.userRepo.findOne({ where: { name: username } });
    if (!user) throw new UnauthorizedException('用户名或密码错误');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('用户名或密码错误');
    const token = this.jwtService.sign({ userId: user.id, username: user.name });
    return {
      access_token: token,
      userInfo: { id: user.id, username: user.name },
    };
  }
}
