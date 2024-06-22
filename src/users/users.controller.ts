import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Render,
  Res,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
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

  @Get('edit/:id')
  @Render('edit-user')
  async getEditUserForm(@Param('id') id: string) {
    const user = await this.usersService.getUserById(parseInt(id));
    return { user };
  }

  @Patch('edit/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatePersonDto: any,
    @Res() res: Response,
  ) {
    const person = plainToClass(UpdatePersonDto, updatePersonDto);
    const errors = await validate(person);

    if (errors.length > 0) {
      const errorMessages = errors.flatMap((error) =>
        error.constraints ? Object.values(error.constraints) : [],
      );
      const user = await this.usersService.getUserById(parseInt(id));
      return res.render('edit-user', { user, errors: errorMessages });
    }

    // Convertir los tipos de datos antes de enviar a Prisma
    updatePersonDto.cPerDateBorn = new Date(updatePersonDto.cPerDateBorn);
    updatePersonDto.nPerYears = parseInt(
      updatePersonDto.nPerYears.toString(),
      10,
    );
    updatePersonDto.nPerSalary = parseFloat(
      updatePersonDto.nPerSalary.toString(),
    );

    await this.usersService.updateUser(parseInt(id), updatePersonDto);
    return res.redirect('/users');
  }
}
