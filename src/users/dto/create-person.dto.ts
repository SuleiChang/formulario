import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsPositive,
  Min,
  IsIn,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePersonDto {
  @IsNotEmpty({ message: 'El Apellido no debe estar vacío' })
  @IsString({ message: 'El Apellido debe ser una cadena de texto' })
  cPerLastname: string;

  @IsNotEmpty({ message: 'El Nombre no debe estar vacío' })
  @IsString({ message: 'El Nombre debe ser una cadena de texto' })
  cPerName: string;

  @IsNotEmpty({ message: 'La Dirección no debe estar vacía' })
  @IsString({ message: 'La Dirección debe ser una cadena de texto' })
  cPerAddress: string;

  @IsNotEmpty({ message: 'La Fecha de Nacimiento no debe estar vacía' })
  @Type(() => Date)
  @IsDate({ message: 'La Fecha de Nacimiento debe ser una fecha válida' })
  cPerDateBorn: Date;

  @IsNotEmpty({ message: 'Los Años no deben estar vacíos' })
  @IsNumber({}, { message: 'Los Años deben ser un número' })
  @Min(0, { message: 'Los Años deben ser un número positivo' })
  nPerYears: number;

  @IsNotEmpty({ message: 'El Salario no debe estar vacío' })
  @IsNumber({}, { message: 'El Salario debe ser un número' })
  @IsPositive({ message: 'El Salario debe ser un número positivo' })
  nPerSalary: number;

  @IsNotEmpty({ message: 'El RND no debe estar vacío' })
  @IsString({ message: 'El RND debe ser una cadena de texto' })
  cPerRnd: string;

  @IsNotEmpty({ message: 'El Estado no debe estar vacío' })
  @IsIn(['1', '0'], { message: 'El Estado debe ser 1 o 0' })
  cPerState: string;

  @IsString()
  @IsOptional()
  cPerSexo?: string;

  @IsNotEmpty()
  @IsString({
    message: 'El Token de Recordatorio debe ser una cadena de texto',
  })
  remember_token: string;
}
