import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// 扩展Express的Request类型，加上user属性
declare module 'express' {
  interface Request {
    user?: any;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // 重写canActivate方法，返回true就放行，返回false就拦截
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    // 从请求头里拿Authorization字段
    const authHeader = request.headers.authorization;
    // 格式是 Bearer xxxx，要把Bearer前缀去掉，只留token
    const token = authHeader?.split(' ')[1];
    if (!token) throw new UnauthorizedException('请先登录');
    try {
      // 解开token，把用户信息挂到request上，后面Controller里能直接拿到当前登录用户
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('token无效或已过期');
    }
  }
}
