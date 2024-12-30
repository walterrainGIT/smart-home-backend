import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {JWT_SECRET_KEY} from "@smart-home/libs/common/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRET_KEY,
        });
    }

    async validate(payload: any) {
        return { userId: payload.id, username: payload.username, email: payload.email };
    }
}
