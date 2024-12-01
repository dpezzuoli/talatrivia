import {
  Column,
  ManyToOne,
  Entity,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class QuizResponse {
  @PrimaryColumn({ name: 'question_id', select: false })
  questionId: number;

  @PrimaryColumn({ name: 'quiz_id', select: false })
  quizId: number;

  @PrimaryColumn({ name: 'user_id', select: false })
  userId: number;

  @Column()
  response: string;

  @Column({ default: 0 })
  score: number;


  @ManyToOne(
    () => User,
    user => user.quizes,
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User[];

}
