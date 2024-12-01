import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../../entities/quiz.entity';
import { QuizUser } from '../../entities/quizUser.entity';
import { QuizQuestion } from 'src/entities/quizQuestion.entity';
import { Answer } from 'src/entities/answer.entity';
import { User } from 'src/entities/user.entity';
import { Question } from 'src/entities/question.entity';

export const USERS_LIST = [
  {
    name: "user 1",
    email: "user1@domain.com"
  },
  {
    name: "user 2",
    email: "user2@domain.com"
  }
];

export const QUESTIONS_LIST = [
  {
    title: "question n1",
    difficulty: "easy",
    answers: [{
      title: "answers n1",
      description: "answers n1",
      isCorrect: false,
      option: 'a'
    },
    {
      title: "answers n2",
      description: "answers n2",
      isCorrect: false,
      option: 'b'
    },
    {
      title: "answers n3",
      description: "answers n3",
      isCorrect: true,
      option: 'c'
    }
    ]
  },
  {
    title: "question n2",
    difficulty: "medium",
    answers: [{
      title: "answers n1",
      description: "answers n1",
      isCorrect: false,
      option: 'a'
    },
    {
      title: "answers n2",
      description: "answers n2",
      isCorrect: true,
      option: 'b'
    },
    {
      title: "answers n3",
      description: "answers n3",
      isCorrect: false,
      option: 'c'
    }
    ]
  },
  {
    title: "question n3",
    difficulty: "hard",
    answers: [{
      title: "answers n1",
      description: "answers n1",
      isCorrect: false,
      option: 'a'
    },
    {
      title: "answers n2",
      description: "answers n2",
      isCorrect: true,
      option: 'b'
    },
    {
      title: "answers n3",
      description: "answers n3",
      isCorrect: false,
      option: 'c'
    }
    ]
  }
];

export const QUIZS_LIST = [
  {
    name: "quiz #1",
    usersIds: [1, 2],
    questionsIds: [1, 2, 3],
  }
];

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(QuizUser)
    private quizUserRepository: Repository<QuizUser>,
    @InjectRepository(QuizQuestion)
    private quizQuestionRepository: Repository<QuizQuestion>
  ) { }

  async seed() {
    const permissionsList = USERS_LIST;
    for (const item of permissionsList) {
      await this.userRepository.save(item);
    }

    const questionsList = QUESTIONS_LIST;
    for (const item of questionsList) {
      const question = await this.questionRepository.save({
        title: item.title,
        difficulty: item.difficulty
      });
      for (const answer of item.answers) {
        await this.answerRepository.save({ ...answer, questionId: question['id'] });
      }
    }

    const quisList = QUIZS_LIST;
    for (const item of quisList) {
      const quiz = await this.quizRepository.save(item);
      for (const id of item.usersIds) {
        await this.quizUserRepository.save({ quizId: quiz.id, userId: id });
      }
      for (const id of item.questionsIds) {
        await this.quizQuestionRepository.save({ quizId: quiz.id, questionId: id });
      }
    }
    return "data  loaded!";
  }

}
