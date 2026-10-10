import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Article } from '../article/article.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  password: string;

  @Column({ nullable: true })
  age: number;

  // 一个用户有多篇文章
  @OneToMany(() => Article, (article) => article.user)
  articles: Article[];
}
