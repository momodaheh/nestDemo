import { ApiProperty } from '@nestjs/swagger';

export class UserStatsDto {
  @ApiProperty({ description: '用户总数', example: 100 })
  totalUsers: number;

  @ApiProperty({ description: '平均年龄', example: 28.5 })
  averageAge: number;

  @ApiProperty({ description: '最大年龄', example: 60 })
  maxAge: number;

  @ApiProperty({ description: '最小年龄', example: 18 })
  minAge: number;
}
