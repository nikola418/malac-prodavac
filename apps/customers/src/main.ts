import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { RmqOptions, Transport } from '@nestjs/microservices';
import fastifyCookie from '@fastify/cookie';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
    {
      logger: new Logger(AppModule.name),
    }
  );

  await app.register(fastifyCookie, {});

  const configService = app.get(ConfigService);
  const globalPrefix = 'api';

  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      noAck: false,
      urls: [configService.getOrThrow<string>('RMQ_URL')],
    },
  });
  const httpAdapter = app.getHttpAdapter();

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .addCookieAuth('Authentication')
    .setTitle('Customers example')
    .setDescription('The customers API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const httpPort = configService.getOrThrow<number>('HTTP_PORT');

  app.startAllMicroservices();
  await app.listen(httpPort, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${httpPort}/${globalPrefix}`
  );
}

bootstrap();
