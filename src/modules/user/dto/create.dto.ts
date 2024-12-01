import { IsOptional, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

}
