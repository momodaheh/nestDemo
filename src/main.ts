import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 开启全局校验管道，所有@Body()参数自动走class-validator校验
  // whitelist: true → 自动过滤掉DTO里没定义的字段（防止前端传垃圾进来）
  // transform: true → 自动做类型转换（比如字符串"25"转成数字25）
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Nest.js 学习项目接口文档')
    .setDescription('用户/文章接口自动生成文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // 配置Knife4j CDN，零额外依赖
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Nest项目接口文档',
    customCssUrl: 'https://unpkg.com/knife4j-openapi3-ui@4.5.0/knife4j-openapi3-ui.css',
    customJs: 'https://unpkg.com/knife4j-openapi3-ui@4.5.0/knife4j-openapi3-ui.js',
  });

  await app.listen(3000);
}
bootstrap();
