import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { UserEntity } from './entities';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DataAccessUsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private static readonly include: Prisma.UserInclude = { customer: true };

  public findUniqueOrThrow(
    args?: Prisma.UserFindUniqueOrThrowArgs<DefaultArgs>
  ): Promise<UserEntity> {
    return this.prismaService.user.findUniqueOrThrow(
      args === undefined
        ? args
        : { include: DataAccessUsersService.include, ...args }
    );
  }

  public findMany(
    args?: Prisma.UserFindManyArgs<DefaultArgs>
  ): Promise<UserEntity[]> {
    return this.prismaService.user.findMany({
      include: DataAccessUsersService.include,
      ...args,
    });
  }
}
