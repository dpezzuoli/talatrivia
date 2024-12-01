import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { SeedService } from './seed.service';


@Controller('seeders')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Post()
  create() {
    return this.seedService.seed();
  }

}
