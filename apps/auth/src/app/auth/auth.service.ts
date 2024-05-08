import {
  DataAccessUsersService,
  UserEntity,
} from '@malac-prodavac/data-access-users';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  me(
    res: any,
    user: Partial<UserEntity>
  ): Partial<UserEntity> | PromiseLike<Partial<UserEntity>> {
    throw new Error('Method not implemented.');
  }
  logout(res: Response) {
    throw new Error('Method not implemented.');
  }
  login(res: any, user: Partial<UserEntity>): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }
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

    if (!compareSync(password, user.password)) throw new BadRequestException();

    return user;
  }
}
