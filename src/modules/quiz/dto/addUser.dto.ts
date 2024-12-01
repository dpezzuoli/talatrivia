import { IsNumber, IsString, IsArray, IsNotEmpty } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];
}

