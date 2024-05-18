import { $Enums } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
// /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[^\s]{8,}$/;

export const nameRegex = /^[\p{L} ,.'-]+$/iu;

export const phoneRegex =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const timeOfDayRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

export class CreateUserDto {
  @Matches(nameRegex)
  firstName: string;

  @Matches(nameRegex)
  lastName: string;

  @IsEmail()
  email: string;

  @Matches(passwordRegex)
  password: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  @Max(90)
  @Min(-90)
  addressLatitude?: number;

  @IsOptional()
  @IsNumber()
  @Max(90)
  @Min(-90)
  addressLongitude?: number;

  @IsOptional()
  @IsEnum($Enums.Currency)
  currency?: $Enums.Currency;

  @IsOptional()
  @IsEnum($Enums.PaymentMethod)
  paymentMethod?: $Enums.PaymentMethod;

  @IsOptional()
  @Matches(phoneRegex)
  phoneNumber?: string;
}
