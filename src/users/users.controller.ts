import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('users')
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return { users };
  }

  @Get('create')
  @Render('create-user')
  getCreateUserForm() {
    return {};
  }

  @Post('create')
  async createUser(
    @Body() createPersonDto: CreatePersonDto,
    @Res() res: Response,
  ) {
    const person = plainToClass(CreatePersonDto, createPersonDto);
    const errors = await validate(person);

    if (errors.length > 0) {
      const errorMessages = errors.flatMap((error) =>
        error.constraints ? Object.values(error.constraints) : [],
      );
      return res.render('create-user', { errors: errorMessages });
    }

    // Convertir los tipos de datos antes de enviar a Prisma
    createPersonDto.cPerDateBorn = new Date(createPersonDto.cPerDateBorn);
    createPersonDto.nPerYears = parseInt(
      createPersonDto.nPerYears.toString(),
      10,
    );
    createPersonDto.nPerSalary = parseFloat(
      createPersonDto.nPerSalary.toString(),
    );

    await this.usersService.createUser(createPersonDto);
    return res.redirect('/users');
  }
}
