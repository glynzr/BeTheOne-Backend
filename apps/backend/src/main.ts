import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppCheckGuard } from 'libs/guards/';

import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        httpsOptions: {
            key: fs.readFileSync(process.env.SSL_KEY, 'utf-8'),
            cert: fs.readFileSync(process.env.SSL_CERT, 'utf-8'),
        },
    });

    const config = new DocumentBuilder()
        .setTitle('Api Documentation')
        .setDescription('Backend Application')
        .setVersion('1.0')
        .addTag('Backend')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    
    SwaggerModule.setup('docs', app, document);
    app.enableCors();

    app.useGlobalGuards(new AppCheckGuard());

    await app.listen(3001);
}
bootstrap();
