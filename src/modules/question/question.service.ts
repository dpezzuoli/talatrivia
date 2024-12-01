import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { Question } from '../../entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) { }

  async create(body: CreateDto) {
    const store = this.questionRepository.create(body);
    return await this.questionRepository.save(store);
  }

  async findOne(id: number): Promise<Question> {
    return await this.questionRepository.findOne({
      where: { id: id },
      relations: { answers: true },
    });
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find(
      {
        relations: {
          answers: true,
        },
      });
  }
}
