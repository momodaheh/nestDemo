import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsInt, Min, Max } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户姓名', example: '张三' })
  @IsNotEmpty({ message: '用户名不能为空' })   // 不能是 null/undefined/空字符串
  @IsString({ message: '用户名必须是字符串' })   // 必须是 string 类型
  @MinLength(2, { message: '用户名至少2个字符' }) // 最少2个字符
  name: string;

  @ApiProperty({ description: '用户年龄', example: 25 })
  @IsInt({ message: '年龄必须是整数' })          // 必须是整数
  @Min(1, { message: '年龄最小为1' })           // 最小值1
  @Max(150, { message: '年龄最大为150' })       // 最大值150
  age: number;
}
