import { AUTH_SERVICE, JwtAuthGuard } from '@malac-prodavac/common';
import { DataAccessCustomersModule } from '@malac-prodavac/data-access-customers';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from 'nestjs-prisma';
import { CustomerController } from './customers/customer.controller';
import { CustomerService } from './customers/customer.service';

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
    PrismaModule.forRoot({}),
    {
      module: DataAccessCustomersModule,
      imports: [PrismaModule],
    },
  ],
  controllers: [CustomerController],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }, CustomerService],
})
export class AppModule {}
