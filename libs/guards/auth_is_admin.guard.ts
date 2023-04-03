import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserInfo } from 'firebase-admin/auth';
import { Observable } from 'rxjs';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class AuthIsAdminGuard implements CanActivate {
    constructor(
        private readonly firebaseService: FirebaseAuthenticationService,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(req: Request) {
        const header = req.headers['authorization'];
        if (header === undefined) throw new UnauthorizedException();

        const bearer = header.trim();
        const token = bearer.split(' ')[1];

        const result = await this.firebaseService
            .verifyIdToken(token)
            .catch((error) => {
                throw new UnauthorizedException();
            });

        req['user'] = result;

        return result.userRole === "admin";
    }
}
