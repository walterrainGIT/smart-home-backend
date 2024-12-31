import {CanActivate, Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import {Reflector} from "@nestjs/core";
import {UserService} from "api/users/user/user.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(
        private reflector: Reflector,
        private readonly userService: UserService,
    ) {
        super();
    }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!roles) {
            return await super.canActivate(context) as boolean;
        }

        await super.canActivate(context);
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            return false;
        }

        const { role: userRole } = await this.userService.getUserById({ id: user.userId });

        return roles.some(role => role === userRole);
    }
}

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user?.[data] : user;
    },
);

export const ROLES_KEY = 'roles';
export const UserRoles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
