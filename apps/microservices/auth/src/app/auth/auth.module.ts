import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { AuthService } from './services';
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
