import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Quiz } from '../../entities/quiz.entity';
import { QuizUser } from 'src/entities/quizUser.entity';
import { QuizQuestion } from 'src/entities/quizQuestion.entity';
import { QuizResponse } from 'src/entities/quizResponse.entity';
import { Answer } from 'src/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, QuizUser, QuizQuestion, QuizResponse, Answer])],
  controllers: [QuizController],
  providers: [
    QuizService
  ],
})
export class QuizModule { }
