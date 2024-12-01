import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Answer } from './answer.entity';
import { Quiz } from './quiz.entity';


@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: "easy" })
  difficulty: string

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToMany(
    () => Quiz,
    quiz => quiz.questions,
  )
  @JoinTable({
    name: 'quiz_question',
    joinColumn: {
      name: 'question_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'quiz_id',
      referencedColumnName: 'id',
    },
  })
  quizes: Quiz[];

}
