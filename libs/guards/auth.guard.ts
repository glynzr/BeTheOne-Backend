import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';
import { Request } from 'express';
import { AuthRoutes } from '@app/common';
import { Observable } from 'rxjs';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly firebaseService: FirebaseAuthenticationService) {}

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

        const result = await this.firebaseService.verifyIdToken(token).catch((error) => {
            throw new UnauthorizedException();
        })

        req['user'] = result

        return true;
    }
}
