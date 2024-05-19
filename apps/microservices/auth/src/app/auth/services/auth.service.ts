import {
  DataAccessUsersService,
  UserEntity,
} from '@malac-prodavac/data-access-users';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataAccessUsersService: DataAccessUsersService
  ) {}

  private readonly logger = new Logger(AuthService.name);

  public async validateUser(
    email: string,
    password: string
  ): Promise<UserEntity> {
    const user = await this.dataAccessUsersService.findUniqueOrThrow({
      where: { email },
    });

    if (compareSync(password, user.password)) return user;

    throw new BadRequestException();
  }

  public getUser({ id }: Partial<UserEntity>): Promise<UserEntity> {
    return this.dataAccessUsersService.findUniqueOrThrow({
      where: { id },
    });
  }
}
