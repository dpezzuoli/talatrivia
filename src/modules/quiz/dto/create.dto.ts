import { IsNumber, IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  questionIds: number[];

  @IsNotEmpty()
  @IsString()
  description: string;
}

