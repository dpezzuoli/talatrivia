import {
  Column,
  ManyToOne,
  Entity,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class QuizUser {
  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'quiz_id' })
  quizId: number;

  @ManyToOne(
    () => User,
    user => user.quizes,
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User[];


  @ManyToOne(
    () => Quiz,
    quiz => quiz.users,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'quiz_id', referencedColumnName: 'id' }])
  quizes: Quiz[];
}
