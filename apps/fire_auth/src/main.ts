import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FireAuthModule } from './fire_auth.module';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        FireAuthModule,
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
