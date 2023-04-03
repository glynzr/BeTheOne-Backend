import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientRedis } from '@nestjs/microservices';
import { FireAuthController } from './fire_auth.controller';
import { FireAuthService } from './fire_auth.service';
import {
    FirebaseAdminModule,
    FirebaseAuthenticationService,
} from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        FirebaseAdminModule.forRoot({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(
                    /\\n/g,
                    '\n',
                ),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
            projectId: process.env.FIREBASE_PROJECT_ID
        }),
    ],
    controllers: [FireAuthController],
    providers: [FireAuthService],
})
export class FireAuthModule {}
