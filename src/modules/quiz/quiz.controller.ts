import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateDto } from './dto/create.dto';
import { AddUserDto } from './dto/addUser.dto';
import { AddQuestionDto } from './dto/addQuestion.dto';
import { QuizResponseDto } from './dto/response.dto';

@Controller('quizes')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }

  @Post()
  create(@Body() quiz: CreateDto) {
    return this.quizService.create(quiz);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.quizService.findOne(id);
  }

  @Get()
  findAll(@Query() queryParams: any) {
    return this.quizService.findAll();
  }

  @Post(':id/add-users')
  addUser(@Param('id') id: number, @Body() body: AddUserDto) {
    return this.quizService.addUser(id, body);
  }

  @Post(':id/add-questions')
  addQuestion(@Param('id') id: number, @Body() body: AddQuestionDto) {
    return this.quizService.addQuestion(id, body);
  }

  @Post(':id/responses')
  responses(@Param('id') id: number, @Body() body: QuizResponseDto) {
    return this.quizService.response(id, body);
  }

  @Get(':id/ranking')
  ranking(@Param('id') id: number) {
    return this.quizService.ranking(id);
  }
}
