import { UserEntity } from '@malac-prodavac/data-access-users';
import { PickType } from '@nestjs/swagger';

export class LoginDto extends PickType(UserEntity, ['email', 'password']) {}
