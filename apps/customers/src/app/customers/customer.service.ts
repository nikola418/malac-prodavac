import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import {
  CreateCustomerDto,
  CustomerEntity,
  DataAccessCustomersService,
} from '@malac-prodavac/data-access-customers';
import { hashSync, genSaltSync } from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    private readonly dataAccessCustomersService: DataAccessCustomersService
  ) {}

  public create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    return this.dataAccessCustomersService.create({
      data: {
        user: {
          create: {
            ...createCustomerDto.user,
            password: hashSync(createCustomerDto.user.password, genSaltSync()),
            roles: [UserRole.Customer],
          },
        },
      },
    });
  }

  public findMany(): Promise<CustomerEntity[]> {
    return this.dataAccessCustomersService.findMany();
  }
}
