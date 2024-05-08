import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'nestjs-prisma';
import { UserEntity } from './entities';

@Injectable()
export class DataAccessUsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.UserCreateArgs<DefaultArgs>): Promise<UserEntity> {
    return this.prismaService.user.create(args);
  }

  public findUniqueOrThrow(
    args?: Prisma.UserFindUniqueOrThrowArgs<DefaultArgs>
  ): Promise<UserEntity> {
    return this.prismaService.user.findUniqueOrThrow(args);
  }

  public findMany(
    args?: Prisma.UserFindManyArgs<DefaultArgs>
  ): Promise<UserEntity[]> {
    return this.prismaService.user.findMany(args);
  }
}
