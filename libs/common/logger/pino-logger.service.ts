import { LoggerService, Injectable } from '@nestjs/common';
import pino from 'pino';
import * as stream from 'stream';
import * as pretty from 'pino-pretty';  // Для вывода логов в удобочитаемом формате в dev-режиме

const isDev = process.env.NODE_ENV === 'development';

const streamToUse = isDev
  ? stream.pipeline(process.stdout, pretty())  // Используем pino-pretty для dev-режима
  : process.stdout;  // В продакшн-режиме выводим в стандартный поток

const logger = pino(
  {
    level: 'info',  // Уровень логирования по умолчанию
  },
  streamToUse,
);

@Injectable()
export class PinoLoggerService implements LoggerService {
  log(message: string, context?: string) {
    logger.info({ context }, message);  // Логируем информационные сообщения
  }

  error(message: string, trace: string, context?: string) {
    logger.error({ trace, context }, message);  // Логируем ошибки
  }

  warn(message: string, context?: string) {
    logger.warn({ context }, message);  // Логируем предупреждения
  }

  debug(message: string, context?: string) {
    logger.debug({ context }, message);  // Логируем сообщения для отладки
  }

  verbose(message: string, context?: string) {
    logger.trace({ context }, message);  // Логируем подробные сообщения
  }
}
