import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { ContactController } from './contact.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [HomeController, ContactController, UsersController],
  providers: [UsersService],
})
export class AppModule {}
