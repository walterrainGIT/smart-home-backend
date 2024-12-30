import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ApiModule } from './api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {API_BASE_SERVICE_NAME, RAILWAY_PUBLIC_DOMAIN, SWAGGER_PORT} from 'api/constants';
import {GrpcErrorInterceptor, PinoLoggerService} from '../../../libs/common/logger';
import { getServerConfig } from '../../../libs/common/modules';
import { GRPC_API_PORT } from '@smart-home/libs/grpc';
import * as cookieParser from 'cookie-parser';
import {CookieInterceptor} from "api/cookies";

async function bootstrap() {
  const logger = new PinoLoggerService();

  logger.log('Starting application...');

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(ApiModule, getServerConfig({
    serviceName: API_BASE_SERVICE_NAME,
    port: GRPC_API_PORT,
  }));
  // Запуск gRPC сервиса
  grpcApp.useGlobalInterceptors(new GrpcErrorInterceptor());
  grpcApp.listen();

  const httpApp = await NestFactory.create(ApiModule, {
    logger: new PinoLoggerService(),
  });
  httpApp.useGlobalInterceptors(new GrpcErrorInterceptor());
  httpApp.useGlobalInterceptors(new CookieInterceptor());
  httpApp.use(cookieParser());

  // Конфигурация Swagger
  const config = new DocumentBuilder()
    .setTitle('Smart Home API')
    .setDescription('API documentation for the Smart Home project')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addCookieAuth('token', {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      })
    .build();
  const document = SwaggerModule.createDocument(httpApp, config);
  SwaggerModule.setup('api', httpApp, document);

  // Настройка CORS
  httpApp.enableCors({
    origin: ['http://localhost:3000', 'https://walterraingit.github.io/smart-home-frontend/'], // Разрешаем только ваши фронтенд-URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Разрешаем нужные HTTP методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешаем необходимые заголовки
    credentials: true,
  });

  // Запуск HTTP сервиса с использованием Railway-порта
  const port = SWAGGER_PORT || 3000;
  const address = RAILWAY_PUBLIC_DOMAIN || 'localhost';

  await httpApp.listen(port);
  logger.log(`HTTP service is running on http://${address}:${port}`);
}

bootstrap();
