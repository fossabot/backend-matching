import { Controller, Get, Req, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth } from '../config/decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Hello World!
   *
   */

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * Returns jwt payload.
   *
   * @return authenticated user
   */
  @Auth()
  @Get('/me')
  testAuthentication(@Req() req) {
    return req.user;
  }
}
