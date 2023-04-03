import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { Module } from '@nestjs/common';
import { FireAuthModule } from './fire_auth/fire_auth.module';
import { InquiryModule } from './inquiries/inquiry.module';
import { ProductModule } from './product/product.module';
import admin from 'firebase-admin';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        FireAuthModule,
        ProductModule,
        InquiryModule,
        FirebaseAdminModule.forRoot({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(
                    /\\n/g,
                    '\n',
                ),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
            projectId: process.env.FIREBASE_PROJECT_ID,
        }),
    ],
})
export class AppModule {}
