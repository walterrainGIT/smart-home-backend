import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ApiModule } from './api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RAILWAY_PUBLIC_DOMAIN, SWAGGER_PORT } from 'api/constants';
import { GrpcErrorInterceptor, PinoLoggerService } from '../../../libs/common/logger';
import { getServerConfig } from '../../../libs/common/modules';
import { GRPC_API_PORT } from '@smart-home/libs/grpc';
import * as cookieParser from 'cookie-parser';
import { CookieInterceptor } from "libs/common/cookies";
import { API_BASE_SERVICE_NAME } from "@smart-home/libs/common/constants";
import * as fs from "fs";
import * as https from "https";

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

  // Запуск HTTPS сервера
  const port = SWAGGER_PORT || 3000;
  const address = RAILWAY_PUBLIC_DOMAIN || 'localhost';

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
      .addServer(`http://localhost:${port}`, 'Local HTTP server')
      .build();

  const document = SwaggerModule.createDocument(httpApp, config);
  SwaggerModule.setup('api', httpApp, document);

  // Настройка CORS
  httpApp.enableCors({
    origin: ['http://localhost:8080', 'https://localhost:8080', 'https://walterraingit.github.io/smart-home-frontend/'], // Разрешаем только ваши фронтенд-URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Разрешаем нужные HTTP методы
    allowedHeaders: ['Content-Type', 'Authorization'], // Разрешаем необходимые заголовки
    credentials: true,
  });

  // Чтение сертификатов
  const privateKey = fs.readFileSync('./cert/server.key', 'utf8');
  const certificate = fs.readFileSync('./cert/server.crt', 'utf8');

  // Создание HTTPS сервера
  const serverOptions = {
    key: privateKey,
    cert: certificate,
  };

  const httpsServer = https.createServer(serverOptions, httpApp.getHttpAdapter().getInstance());

  httpApp.listen(port, () => {
    logger.log(`HTTPS service is running on https://${address}:${port}`);
  });
}

bootstrap();
