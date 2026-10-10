import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // NestJS内置的Logger，类似Java里的@Slf4j
  private readonly logger = new Logger('HTTP');

  // 当前环境：development / test / production
  private readonly env = process.env.NODE_ENV || 'development';

  // 敏感字段列表，生产环境打日志时要脱敏
  private readonly sensitiveFields = ['password', 'token', 'accessToken', 'authorization'];

  use(req: Request, res: Response, next: NextFunction) {
    // 记录请求进来的时间
    const startTime = Date.now();
    const { method, originalUrl } = req;

    // 开发/测试环境：打印请求体
    if (this.env !== 'production') {
      this.logger.log(`[请求体] ${method} ${originalUrl} | Body: ${JSON.stringify(req.body)}`);
    } else {
      // 生产环境：脱敏后打印
      this.logger.log(`[请求体] ${method} ${originalUrl} | Body: ${JSON.stringify(this.maskSensitive(req.body))}`);
    }

    // 拦截响应体（仅开发环境）
    if (this.env === 'development') {
      const originalJson = res.json.bind(res);
      res.json = (body: any) => {
        this.logger.log(`[响应体] ${method} ${originalUrl} | Response: ${JSON.stringify(body)}`);
        return originalJson(body);
      };
    }

    // 请求结束的时候触发
    res.on('finish', () => {
      // 计算耗时
      const cost = Date.now() - startTime;
      // 打印日志：方法 路径 状态码 耗时
      this.logger.log(`${method} ${originalUrl} | 状态码: ${res.statusCode} | 耗时: ${cost}ms`);
    });

    // 放行，继续往下执行业务代码
    next();
  }

  // 敏感字段脱敏
  private maskSensitive(obj: any): any {
    if (!obj || typeof obj !== 'object') return obj;
    const masked = { ...obj };
    for (const key of Object.keys(masked)) {
      if (this.sensitiveFields.includes(key)) {
        masked[key] = '******';
      } else if (typeof masked[key] === 'object') {
        masked[key] = this.maskSensitive(masked[key]);
      }
    }
    return masked;
  }
}
