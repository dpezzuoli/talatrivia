import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './modules/health/health.controller';
import { UserModule } from './modules/user/user.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresql_db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule, QuestionModule, AnswerModule, QuizModule, SeedModule
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule { }
