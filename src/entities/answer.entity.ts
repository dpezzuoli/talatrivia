import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Relation,
  Index
} from 'typeorm';
import { Question } from './question.entity';


@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option: string;

  @Column()
  title: string;

  @Column({ name: "is_correct", default: false, select: false })
  isCorrect: boolean

  @Column({ name: 'question_id', select: false })
  questionId: number;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: "question_id" })
  question: Question
}