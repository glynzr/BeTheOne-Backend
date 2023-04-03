import { Module } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';
import { setMicroservice } from '@app/common/microservices_configuration/microservice.config';
import { MICROSERVICE_CONSTANTS } from '../config/microservice.constants';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [
        setMicroservice(MICROSERVICE_CONSTANTS.PRODUCT),
        setMicroservice(MICROSERVICE_CONSTANTS.AUTH),
        
    ],
    controllers: [ProductController],
    providers: [ProductService, ClientRedis],
})
export class ProductModule {}
