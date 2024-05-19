import { AUTH_SERVICE, JwtAuthGuard } from '@malac-prodavac/common';
import { DataAccessUsersModule } from '@malac-prodavac/data-access-users';
import { PrismaModule } from '@malac-prodavac/prisma-module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RMQ_URL')],
            queue: 'auth',
          },
        }),
        inject: [ConfigService],
      },
    ]),
    PrismaModule,
    {
      module: DataAccessUsersModule,
      imports: [PrismaModule],
    },
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
