import {
  IsString,
  IsDate,
  IsNumber,
  IsPositive,
  Min,
  IsIn,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePersonDto {
  @IsOptional()
  @IsString({ message: 'El Apellido debe ser una cadena de texto' })
  cPerLastname?: string;

  @IsOptional()
  @IsString({ message: 'El Nombre debe ser una cadena de texto' })
  cPerName?: string;

  @IsOptional()
  @IsString({ message: 'La Dirección debe ser una cadena de texto' })
  cPerAddress?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'La Fecha de Nacimiento debe ser una fecha válida' })
  cPerDateBorn?: Date;

  @IsOptional()
  @IsNumber({}, { message: 'Los Años deben ser un número' })
  @Min(0, { message: 'Los Años deben ser un número positivo' })
  nPerYears?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El Salario debe ser un número' })
  @IsPositive({ message: 'El Salario debe ser un número positivo' })
  nPerSalary?: number;

  @IsOptional()
  @IsString({ message: 'El RND debe ser una cadena de texto' })
  cPerRnd?: string;

  @IsOptional()
  @IsIn(['1', '0'], { message: 'El Estado debe ser 1 o 0' })
  cPerState?: string;

  @IsString()
  @IsOptional()
  cPerSexo?: string;

  @IsOptional()
  @IsString({
    message: 'El Token de Recordatorio debe ser una cadena de texto',
  })
  remember_token?: string;
}
