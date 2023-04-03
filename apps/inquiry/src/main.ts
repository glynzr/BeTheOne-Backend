import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { InquiryModule } from './inquiry.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        InquiryModule,
        {
            transport: Transport.REDIS,
            options: {
                host: process.env.REDIS_HOST,
                port: +process.env.REDIS_PORT,
            },
        },
    );
    await app.listen();
}
bootstrap();
