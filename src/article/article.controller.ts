import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';

@ApiTags('文章模块')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 查某个人的所有文章
  @ApiOperation({ summary: '根据用户ID查询文章列表' })
  @ApiParam({ name: 'userId', description: '用户ID', example: 1 })
  @ApiResponse({ status: 200, description: '文章列表' })
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.articleService.findByUserId(+userId);
  }

  // 创建文章
  @ApiOperation({ summary: '创建文章' })
  @ApiBody({ type: CreateArticleDto })
  @ApiResponse({ status: 201, description: '创建成功' })
  @Post()
  create(@Body() data: CreateArticleDto) {
    return this.articleService.create(data);
  }
}
