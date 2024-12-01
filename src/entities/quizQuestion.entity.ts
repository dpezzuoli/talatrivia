import {
  Column,
  ManyToOne,
  Entity,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Quiz } from './quiz.entity';

@Entity()
export class QuizQuestion {
  @PrimaryColumn({ name: 'question_id', select: false })
  questionId: number;

  @PrimaryColumn({ name: 'quiz_id', select: false })
  quizId: number;

  @ManyToOne(
    () => Question,
    question => question.quizes,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'id' }])
  questions: Question[];


  @ManyToOne(
    () => Quiz,
    quiz => quiz.questions,
    {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'quiz_id', referencedColumnName: 'id' }])
  quizes: Quiz[];
}
