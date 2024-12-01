import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;

  @ManyToMany(
    () => Quiz, 
    quiz => quiz.users, //optional
    )
    @JoinTable({
      name: 'quiz_user',
      joinColumn: {
        name: 'user_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'quiz_id',
        referencedColumnName: 'id',
      },
    })
    quizes: Quiz[];
}
