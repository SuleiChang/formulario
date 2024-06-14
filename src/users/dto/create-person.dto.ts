import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsDecimal,
  IsDate,
  IsOptional,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  cPerLastname: string;

  @IsString()
  @IsNotEmpty()
  cPerName: string;

  @IsString()
  @IsNotEmpty()
  cPerAddress: string;

  @IsDate()
  @Type(() => Date)
  cPerDateBorn: Date;

  @IsInt()
  @Type(() => Number)
  nPerYears: number;

  @IsDecimal()
  nPerSalary: number;

  @IsString()
  @IsNotEmpty()
  cPerRnd: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['1', '0'])
  cPerState: string;

  @IsString()
  @IsOptional()
  cPerSexo?: string;

  @IsString()
  @IsNotEmpty()
  remember_token: string;
}
