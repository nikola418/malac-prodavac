import { AuthUser, Public } from '@malac-prodavac/common';
import { UserEntity } from '@malac-prodavac/data-access-users';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { LoginDto } from '../dto';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  @ApiBody({ type: LoginDto })
  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  public logIn(
    @AuthUser() user: UserEntity,
    @Res({ passthrough: true }) res: FastifyReply
  ): UserEntity {
    const expires = new Date();
    const expiresIn = this.configService.getOrThrow<string>('JWT_EXPIRES_IN');

    expires.setSeconds(
      expires.getSeconds() +
        Number(expiresIn.substring(0, expiresIn.length - 1))
    );

    res.setCookie('Authentication', this.jwtService.sign({ ...user }), {
      expires,
    });

    return user;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async me(@AuthUser() user: UserEntity) {
    return user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) res: FastifyReply): Promise<void> {
    res.clearCookie('Authentication');
    return;
  }

  @MessagePattern()
  @UseGuards(JwtAuthGuard)
  public async authenticate(
    @Payload() data: any,
    @AuthUser() user: UserEntity
  ) {
    console.log(data);
    return user;
  }
}
