import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateDto } from './dto/create.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post()
  create(@Body() question: CreateDto) {
    return this.questionService.create(question);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.questionService.findOne(id);
  }

  @Get()
  findAll(@Query() queryParams: any) {
    return this.questionService.findAll();
  }
}
