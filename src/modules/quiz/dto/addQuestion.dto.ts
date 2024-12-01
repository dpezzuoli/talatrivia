import { IsNumber, IsString, IsArray, IsNotEmpty } from 'class-validator';

export class AddQuestionDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  questionIds: number[];
}

