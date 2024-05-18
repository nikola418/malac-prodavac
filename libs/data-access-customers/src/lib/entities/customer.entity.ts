import { Customer } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';

export class CustomerEntity implements Customer {
  constructor(partial: Partial<CustomerEntity>) {
    Object.assign(this, partial);
  }

  userId: number;
  @Type(() => Number)
  rating: Decimal;
  ratingsCount: number;
  updatedAt: Date;
  createdAt: Date;
}
