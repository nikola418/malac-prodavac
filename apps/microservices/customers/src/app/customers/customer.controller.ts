import { JwtAuthGuard, Public } from '@malac-prodavac/common';
import {
  CreateCustomerDto,
  CustomerEntity,
} from '@malac-prodavac/data-access-customers';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<CustomerEntity> {
    return this.customerService.create(createCustomerDto);
  }

  @ApiCookieAuth('Authentication')
  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<CustomerEntity[]> {
    return this.customerService.findMany();
  }
}
