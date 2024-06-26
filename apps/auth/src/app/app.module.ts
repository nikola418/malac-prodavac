import { DataAccessUsersModule } from '@malac-prodavac/data-access-users';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@malac-prodavac/prisma-module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<string>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    {
      module: DataAccessUsersModule,
      imports: [PrismaModule],
    },
    AuthModule,
  ],
})
export class AppModule {}
