// Register ts-node FIRST if running from dist but migrations are TypeScript files
// This must be done BEFORE any imports that might load migrations
const path = require('path');
const fs = require('fs');

if (
  __dirname.includes(path.join('dist', 'apps')) ||
  __dirname.includes('dist\\apps')
) {
  const migrationsPath = path.join(
    process.cwd(),
    'apps',
    'users',
    'user',
    'src',
    'entities',
    'migrations'
  );
  if (fs.existsSync(migrationsPath)) {
    const migrationFiles = fs
      .readdirSync(migrationsPath)
      .filter((f: string) => f.endsWith('.ts'));
    if (migrationFiles.length > 0) {
      try {
        // Register ts-node with proper configuration for CommonJS
        require('ts-node').register({
          transpileOnly: true,
          files: true,
          compilerOptions: {
            module: 'commonjs',
            target: 'ES2021',
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            resolveJsonModule: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            skipLibCheck: true,
            strict: false,
            moduleResolution: 'node',
            baseUrl: process.cwd(),
            paths: {
              '@smart-home/libs/*': ['libs/*'],
              'user/*': ['apps/users/user/src/*'],
            },
          },
        });
        require('tsconfig-paths/register');
      } catch (e) {
        console.warn('Failed to register ts-node:', e);
      }
    }
  }
}

import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { GRPC_USER_PORT } from '@smart-home/libs/grpc';
import { USER_BASE_SERVICE_NAME } from '@smart-home/libs/common/constants/services';
import { MikroORM } from '@mikro-orm/core';
import { getServerConfig } from '@smart-home/libs/common/modules/configs';
import { GrpcErrorInterceptor } from '@smart-home/libs/common/logger';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    getServerConfig({
      serviceName: USER_BASE_SERVICE_NAME,
      port: GRPC_USER_PORT,
    })
  );
  app.useGlobalInterceptors(new GrpcErrorInterceptor());

  const orm = app.get(MikroORM);
  await orm.getMigrator().up();

  await app.listen();
}
bootstrap();
