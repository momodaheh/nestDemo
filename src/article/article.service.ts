import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  // 查某个人的所有文章
  findByUserId(userId: number) {
    if (Number.isNaN(userId)) return '无效的 userId';
    return this.articleRepository.find({
      where: { userId },
    });
  }

  // 创建文章
  create(data: Partial<Article>) {
    const article = this.articleRepository.create(data);
    return this.articleRepository.save(article);
  }
}
