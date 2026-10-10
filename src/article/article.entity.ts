import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  // 一篇文章属于一个用户
  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  // 新增：PG原生数组字段，存文章标签
  @Column('text', { array: true, default: [] })
  tags: string[];

  // 新增：JSONB字段，存文章额外配置
  @Column('jsonb', { default: {} })
  extra: Record<string, any>;

  // 新增：自动创建时间，不用手动赋值
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  // 新增：自动更新时间
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
