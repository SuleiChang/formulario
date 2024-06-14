import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePersonDto } from './dto/create-person.dto';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async getAllUsers() {
    return this.prisma.person.findMany();
  }

  async createUser(createPersonDto: CreatePersonDto) {
    const {
      cPerLastname,
      cPerName,
      cPerAddress,
      cPerDateBorn,
      nPerYears,
      nPerSalary,
      cPerRnd,
      cPerState,
      cPerSexo,
      remember_token,
    } = createPersonDto;

    return this.prisma.person.create({
      data: {
        cPerLastname,
        cPerName,
        cPerAddress,
        cPerDateBorn,
        nPerYears,
        nPerSalary,
        cPerRnd,
        cPerState,
        cPerSexo,
        remember_token,
      },
    });
  }
}
