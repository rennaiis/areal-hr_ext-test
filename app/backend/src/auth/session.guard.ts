import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRoles } from "../../../enums/UserRoles";

@Injectable()
export class SessionGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest()
        if (!req.isAuthenticated()){
            throw new UnauthorizedException
        }
        return true
    }
}

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()

        if (!req.isAuthenticated()) {
            throw new UnauthorizedException()
        }

        if (req.user.role !== UserRoles.ADMIN) {
            throw new ForbiddenException()
        }

        return true
    }
}