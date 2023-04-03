import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductModule } from './product.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        ProductModule,
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
