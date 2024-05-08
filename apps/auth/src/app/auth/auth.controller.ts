import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserEntity } from '@malac-prodavac/data-access-users';
import { LocalAuthGuard } from './guards';
import { AuthUser, Public } from '@malac-prodavac/common';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  public login(
    @AuthUser() user: Partial<UserEntity>,
    @Res({ passthrough: true }) res
  ): Promise<UserEntity[]> {
    return this.authService.login(res, user);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async me(
    @Res({ passthrough: true }) res,
    @AuthUser() user: Partial<UserEntity>
  ) {
    return new UserEntity(await this.authService.me(res, user));
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
