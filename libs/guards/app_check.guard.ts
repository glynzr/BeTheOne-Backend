import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { getAppCheck, AppCheck } from 'firebase-admin/app-check';
import { initializeApp, cert } from 'firebase-admin/app';

@Injectable()
export class AppCheckGuard implements CanActivate {
    private readonly appCheck: AppCheck;

    constructor() {
        const app = initializeApp({
            credential: cert({
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY,
                projectId: process.env.FIREBASE_PROJECT_ID,
            }),
        });
        this.appCheck = getAppCheck(app);
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(req: Request) {
        const header = req.headers['x-firebase-appcheck'];

        if (header === undefined || typeof header !== 'string')
            throw new ForbiddenException();

        try {
            await this.appCheck.verifyToken(header);
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
}
