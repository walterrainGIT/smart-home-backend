import { LoggerService, Injectable } from '@nestjs/common';
import pino, { Logger } from 'pino';
import pretty from 'pino-pretty';

@Injectable()
export class PinoLoggerService implements LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = pino(
        {
          level: 'info', // Уровень логирования по умолчанию
          transport: {
            target: 'pino-pretty', // Используем pino-pretty для красивого вывода
            options: {
              colorize: true, // Цветной вывод
              translateTime: 'HH:MM:ss', // Время в читаемом формате
              ignore: 'pid,hostname', // Убираем pid и hostname
              singleLine: true, // Выводим логи в одну строку
            },
          },
        },
    );
  }

  private formatMessage(message: string, context?: string) {
    return context ? `[${context}] ${message}` : message;
  }

  log(message: string, context?: string) {
    this.logger.info(this.formatMessage(message, context));
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(
        {
          trace,
        },
        this.formatMessage(message, context),
    );
  }

  warn(message: string, context?: string) {
    this.logger.warn(this.formatMessage(message, context));
  }

  debug(message: string, context?: string) {
    this.logger.debug(this.formatMessage(message, context));
  }

  verbose(message: string, context?: string) {
    this.logger.trace(this.formatMessage(message, context));
  }

  /**
   * Метод для совместимости с MikroORM (или другими библиотеками).
   */
  getLoggerFunction(): (message: string) => void {
    return (message: string) => this.log(message, 'MikroORM');
  }
}
