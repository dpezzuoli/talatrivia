import { IsBoolean, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  option: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;

  @IsNotEmpty()
  @IsNumber()
  questionId: number;
}

