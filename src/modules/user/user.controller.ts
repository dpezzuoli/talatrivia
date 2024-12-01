import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateDto } from './dto/create.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() user: CreateDto) {
    return this.userService.create(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(@Query() queryParams: any) {
    return this.userService.findAll();
  }
}
