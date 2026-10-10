import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题', example: '我的第一篇文章' })
  @IsNotEmpty({ message: '标题不能为空' })
  @IsString({ message: '标题必须是字符串' })
  title: string;

  @ApiProperty({ description: '文章内容', example: '这是一篇关于 NestJS 的文章' })
  @IsNotEmpty({ message: '内容不能为空' })
  @IsString({ message: '内容必须是字符串' })
  content: string;

  @ApiProperty({ description: '所属用户ID', example: 1 })
  @IsNotEmpty({ message: '用户ID不能为空' })
  @IsInt({ message: '用户ID必须是整数' })
  userId: number;

  @ApiPropertyOptional({ description: '文章标签', example: ['TypeScript', 'NestJS'] })
  @IsOptional()
  @IsArray({ message: '标签必须是数组' })       // 必须是数组
  tags?: string[];

  @ApiPropertyOptional({ description: '额外配置（如阅读量）', example: { viewCount: 100 } })
  @IsOptional()
  @IsObject({ message: 'extra必须是对象' })     // 必须是对象
  extra?: Record<string, any>;
}
