import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { UserEntity } from '@malac-prodavac/data-access-users';
import { AuthService } from '../auth.service';
import { FastifyRequest } from 'fastify';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super(<StrategyOptionsWithoutRequest>{
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: FastifyRequest) =>
          request.cookies['Authentication'] ||
          request['Authentication'] ||
          request.headers['Authentication'],
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  async validate({ id }: Partial<UserEntity>) {
    return this.authService.getUser({ id });
  }
}
