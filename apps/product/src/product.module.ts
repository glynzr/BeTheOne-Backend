import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { StripeModule } from 'nestjs-stripe';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        StripeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                apiKey: configService.get<string>('STRIPE_API_KEY'),
                apiVersion: '2022-11-15',
            }),
        }),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
