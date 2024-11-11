import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from '../../enums/role.enum';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsDateString()
  birthAt?: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minSymbols: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: number;
}
