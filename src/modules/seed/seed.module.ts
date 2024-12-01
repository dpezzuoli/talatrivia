import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { Quiz } from '../../entities/quiz.entity';
import { QuizUser } from 'src/entities/quizUser.entity';
import { QuizQuestion } from 'src/entities/quizQuestion.entity';
import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/question.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Question, Answer, Quiz, QuizUser, QuizQuestion])],
  controllers: [SeedController],
  providers: [
    SeedService
  ],
})
export class SeedModule { }
