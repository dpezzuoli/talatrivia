import { Controller, Get, Header } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  @Header('Cache-Control', 'none')
  get() {
    return { ok: true };
  }
}
