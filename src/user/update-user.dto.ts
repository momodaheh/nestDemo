import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, IsInt, Min, Max } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: '用户姓名', example: '李四' })
  @IsOptional()                                // 允许不传（undefined），但传了就要校验
  @IsString({ message: '用户名必须是字符串' })
  @MinLength(2, { message: '用户名至少2个字符' })
  name?: string;

  @ApiPropertyOptional({ description: '用户年龄', example: 26 })
  @IsOptional()
  @IsInt({ message: '年龄必须是整数' })
  @Min(1, { message: '年龄最小为1' })
  @Max(150, { message: '年龄最大为150' })
  age?: number;
}
