import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global() // 全局模块，其他地方不用导入直接用
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
