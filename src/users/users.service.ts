import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.person.findMany();
  }

  async getUserById(id: number) {
    const user = await this.prisma.person.findUnique({
      where: { nPerCode: id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
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

  async updateUser(id: number, updatePersonDto: UpdatePersonDto) {
    return this.prisma.person.update({
      where: { nPerCode: id },
      data: updatePersonDto,
    });
  }

  async deleteUser(id: number) {
    return this.prisma.person.delete({
      where: { nPerCode: id },
    });
  }
}
