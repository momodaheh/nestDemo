import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UserStatsDto } from './user-stats.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('用户模块')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '分页查询用户列表' })
  @ApiQuery({ name: 'page', description: '页码，从1开始', required: false, example: 1 })
  @ApiQuery({ name: 'limit', description: '每页条数，最大100', required: false, example: 10 })
  @ApiResponse({ status: 200, description: '分页结果', schema: { example: { data: [], total: 0, page: 1, limit: 10 } } })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.userService.findAll(+page, +limit);
  }

  @ApiOperation({ summary: '获取用户统计数据' })
  @ApiResponse({ status: 200, description: '统计数据', type: UserStatsDto })
  @Get('stats')
  getUserStats() {
    return this.userService.getUserStats();
  }

  @ApiOperation({ summary: '根据ID查询用户' })
  @ApiParam({ name: 'id', description: '用户ID', example: 1 })
  @ApiResponse({ status: 200, description: '用户信息' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: '根据ID查询用户及其文章' })
  @ApiParam({ name: 'id', description: '用户ID', example: 1 })
  @ApiResponse({ status: 200, description: '用户及文章信息' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @Get(':id/with-articles')
  findOneWithArticles(@Param('id') id: string) {
    return this.userService.findOneWithArticles(+id);
  }

  @ApiOperation({ summary: '创建用户' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: '创建成功' })
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @ApiOperation({ summary: '更新用户' })
  @ApiParam({ name: 'id', description: '用户ID', example: 1 })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(+id, data);
  }

  @ApiOperation({ summary: '删除用户' })
  @ApiParam({ name: 'id', description: '用户ID', example: 1 })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
