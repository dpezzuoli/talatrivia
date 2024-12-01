import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Question } from 'src/entities/question.entity';
import { Answer } from 'src/entities/answer.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizUser } from 'src/entities/quizUser.entity';
import { QuizQuestion } from 'src/entities/quizQuestion.entity';


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


export async function seedData(dataSource: DataSource): Promise<void> {

    const userRepository = dataSource.getRepository(User);
    const questionRepository = dataSource.getRepository(Question);
    const answerRepository = dataSource.getRepository(Answer);
    const quizRepository = dataSource.getRepository(Quiz);
    const quizUserRepository = dataSource.getRepository(QuizUser);
    const quizQuestionRepository = dataSource.getRepository(QuizQuestion);

    const permissionsList = USERS_LIST;
    for (const item of permissionsList) {
        await userRepository.save(item);
    }

    const questionsList = QUESTIONS_LIST;
    for (const item of questionsList) {
        const question = await questionRepository.save({
            title: item.title,
            difficulty: item.difficulty
        });
        for (const answer of item.answers) {
            await answerRepository.save({ ...answer, questionId: question['id'] });
        }
    }

    const quisList = QUIZS_LIST;
    for (const item of quisList) {
        const quiz = await quizRepository.save(item);
        for (const id of item.usersIds) {
            await quizUserRepository.save({ quizId: quiz.id, userId: id });
        }
        for (const id of item.questionsIds) {
            await quizQuestionRepository.save({ quizId: quiz.id, questionId: id });
        }
    }
}