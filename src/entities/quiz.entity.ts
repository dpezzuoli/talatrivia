import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany
} from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';


@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true})
  description: string

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @ManyToMany(
    () => User,
    user => user.quizes,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'},
  )
  users: User[];

  @ManyToMany(
    () => Question,
    question => question.quizes,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'},
  )
  questions: Question[];
}
