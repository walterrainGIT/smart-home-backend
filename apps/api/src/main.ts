import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ApiModule } from './api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {API_BASE_SERVICE_NAME, RAILWAY_PUBLIC_DOMAIN, SWAGGER_PORT} from 'api/constants';
import {HttpExceptionFilter, PinoLoggerService} from '../../../libs/common/logger';
import { getServerConfig } from '../../../libs/common/modules';
import { GRPC_API_PORT } from '@smart-home/libs/grpc';

async function bootstrap() {
  const logger = new PinoLoggerService();

  logger.log('Starting application...');

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(ApiModule, getServerConfig({
    serviceName: API_BASE_SERVICE_NAME,
    port: GRPC_API_PORT,
  }));
  grpcApp.useGlobalFilters(new HttpExceptionFilter());
  // Запуск gRPC сервиса
  grpcApp.listen();

  const httpApp = await NestFactory.create(ApiModule, {
    logger: new PinoLoggerService(),
  });
  httpApp.useGlobalFilters(new HttpExceptionFilter());
  // Конфигурация Swagger
  const config = new DocumentBuilder()
    .setTitle('Smart Home API')
    .setDescription('API documentation for the Smart Home project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(httpApp, config);
  SwaggerModule.setup('api', httpApp, document);

  // Настройка CORS
  httpApp.enableCors({
    origin: 'https://walterraingit.github.io/smart-home-frontend/',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });

  // Запуск HTTP сервиса с использованием Railway-порта
  const port = SWAGGER_PORT || 3000;
  const address = RAILWAY_PUBLIC_DOMAIN || 'localhost';

  await httpApp.listen(port);
  logger.log(`HTTP service is running on http://${address}:${port}`);
}

bootstrap();
