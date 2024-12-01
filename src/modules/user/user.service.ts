import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(body: CreateDto) {
    return await this.userRepository.save(body);
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ['quizes.questions.answers'],

    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        quizes: true,
      }
    }
    );
  }
}
