import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthGuard,
    JwtAuthGuard,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
