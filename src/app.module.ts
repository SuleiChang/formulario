import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { ContactController } from './contact.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ServicesModule } from './services/services.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ServicesModule],
  controllers: [HomeController, ContactController, UsersController],
  providers: [UsersService, PrismaService],
})
export class AppModule {}
