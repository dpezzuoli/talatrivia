import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateDto } from './dto/create.dto';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) { }

  @Post()
  create(@Body() answer: CreateDto) {
    return this.answerService.create(answer);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.answerService.findOne(id);
  }

  @Get()
  findAll(@Query() queryParams: any) {
    return this.answerService.findAll();
  }
}
