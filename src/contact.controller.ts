import { Controller, Get, Render } from '@nestjs/common';

@Controller('contact')
export class ContactController {
  @Get()
  @Render('contact')
  contact() {
    return {};
  }
}
