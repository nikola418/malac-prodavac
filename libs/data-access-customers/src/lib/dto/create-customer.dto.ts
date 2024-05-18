import { CreateUserDto } from '@malac-prodavac/data-access-users';
import { IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
