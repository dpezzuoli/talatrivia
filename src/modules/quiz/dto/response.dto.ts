import { IsNumber, IsString, IsArray, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class QuestionResponseDto {
  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @IsNotEmpty()
  @IsString()
  response: string;
}

export class QuizResponseDto {

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @Type(() => QuestionResponseDto)
  @IsArray()
  questions: QuestionResponseDto[];
}

