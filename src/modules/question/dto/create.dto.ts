import { IsString, IsNotEmpty, IsEnum } from 'class-validator';


enum STATUS {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(STATUS)
  difficulty: STATUS;
}

