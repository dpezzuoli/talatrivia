import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { Quiz } from '../../entities/quiz.entity';
import { QuizUser } from '../../entities/quizUser.entity';
import { QuizQuestion } from 'src/entities/quizQuestion.entity';
import { AddUserDto } from './dto/addUser.dto';
import { AddQuestionDto } from './dto/addQuestion.dto';
import { QuizResponseDto } from './dto/response.dto';
import { QuizResponse } from 'src/entities/quizResponse.entity';
import { Answer } from 'src/entities/answer.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(QuizUser)
    private quizUserRepository: Repository<QuizUser>,
    @InjectRepository(QuizQuestion)
    private quizQuestionRepository: Repository<QuizQuestion>,
    @InjectRepository(QuizResponse)
    private quizResponseRepository: Repository<QuizResponse>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>
  ) { }

  async create(body: CreateDto) {
    const quiz = await this.quizRepository.save(body);

    for (let index = 0; index < body.userIds.length; index++) {
      const element = body.userIds[index];
      const quiz_user = {
        quizId: quiz.id, userId: element
      }
      this.quizUserRepository.save(quiz_user);
    }
    for (let index = 0; index < body.questionIds.length; index++) {
      const element = body.questionIds[index];
      const quiz_question = {
        quizId: quiz.id, questionId: element
      }
      await this.quizQuestionRepository.save(quiz_question);
    }
    return await this.findOne(quiz.id);
  }

  async findOne(id: number): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: { id: id },
      relations: ['users', 'questions'],
    });
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizRepository.find({
      relations: ['users', 'questions.answers'],
    }
    );
  }

  async addUser(id: number, body: AddUserDto): Promise<Quiz> {
    for (let index = 0; index < body.userIds.length; index++) {
      const element = body.userIds[index];
      const quiz_user = {
        quizId: id, userId: element
      }
      await this.quizUserRepository.save(quiz_user);
    }
    return await this.findOne(id);
  }

  async addQuestion(id: number, body: AddQuestionDto): Promise<Quiz> {
    try {

      for (let index = 0; index < body.questionIds.length; index++) {
        const element = body.questionIds[index];
        const quiz_question = {
          quizId: id, questionId: element
        }
        await this.quizQuestionRepository.save(quiz_question);
      }
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }

  }

  async response(id: number, body: QuizResponseDto) {
    for (let index = 0; index < body.questions.length; index++) {
      const element = body.questions[index];
      const data = {
        userId: body.userId,
        quizId: id,
        questionId: element.questionId,
        response: element.response,
        score: await this.getScore(element.questionId, element.response)
      };
      await this.quizResponseRepository.save(data);
    }
    return `save ${body.questions.length} responses`;
  }

  async ranking(id: number) {
    const data = await this.quizResponseRepository.createQueryBuilder("quiz_response")
      .where("quiz_id = :id", { id })
      .leftJoin("quiz_response.users", "users")
      .select('users.email, SUM(score) as score')
      .groupBy('users.email')
      .orderBy('score', 'DESC')
      .getRawMany();
    return data;
  }

  async getScore(questionId: number, option: string) {
    const answer = await this.answerRepository.findOne({
      where: {
        questionId: questionId,
        option,
        isCorrect: true
      },
      relations: ['question'],
    });

    return !answer ? 0 : this.getDifficult(answer['question']['difficulty']);
  }

  async getDifficult(difficulty: string) {
    let value = 0;
    switch (difficulty) {
      case 'easy':
        value = 1;
        break;
      case 'medium':
        value = 2;
        break;
      default:
        value = 3;
        break;
    }
    return value;
  }
}
