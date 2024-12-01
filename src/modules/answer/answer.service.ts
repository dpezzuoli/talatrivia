import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { Answer } from '../../entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) { }

  async create(body: CreateDto) {
    return await this.answerRepository.save(body);
  }

  async findOne(id: number): Promise<Answer> {
    return await this.answerRepository.findOne({
      where: { id: id },
      relations: { question: true },
    });
  }

  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find(
      {
        relations: {
          question: true,
        },
      }
    );
  }
}
