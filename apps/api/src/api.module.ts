import { Module} from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import {
  JWT_SECRET_KEY,
  JWT_TTL,
} from '@smart-home/libs/common/constants';
import { PinoLoggerService} from '@smart-home/libs/common/logger';
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "api/users/user/auth/jwt-strategy";
import {MarketModule} from "api/market/market.module";
import {UserModule} from "api/users/user/user.module";
import {PortfolioModule} from "api/portfolio/portfolio.module";

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_TTL },
    }),
    UserModule,
    MarketModule,
    PortfolioModule,
  ],
  controllers: [ApiController],
  providers: [
    PinoLoggerService,
    ApiService,
    JwtStrategy,
  ],
})
export class ApiModule {}
