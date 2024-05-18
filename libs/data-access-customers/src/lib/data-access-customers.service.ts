import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'nestjs-prisma';
import { CustomerEntity } from './entities';

@Injectable()
export class DataAccessCustomersService {
  constructor(private readonly prismaService: PrismaService) {}

  private static readonly include: Prisma.CustomerInclude = { user: true };

  public create(
    args: Prisma.CustomerCreateArgs<DefaultArgs>
  ): Promise<CustomerEntity> {
    return this.prismaService.customer.create({
      include: DataAccessCustomersService.include,
      ...args,
    });
  }

  public findUniqueOrThrow(
    args?: Prisma.CustomerFindUniqueArgs<DefaultArgs>
  ): Promise<CustomerEntity> {
    return this.prismaService.customer.findUniqueOrThrow(
      args === undefined
        ? args
        : { include: DataAccessCustomersService.include, ...args }
    );
  }

  public findMany(
    args?: Prisma.CustomerFindManyArgs<DefaultArgs>
  ): Promise<CustomerEntity[]> {
    return this.prismaService.customer.findMany({
      include: DataAccessCustomersService.include,
      ...args,
    });
  }
}
