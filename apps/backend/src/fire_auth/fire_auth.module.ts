import { Module } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';
import { setMicroservice } from '@app/common/microservices_configuration/microservice.config';
import { MICROSERVICE_CONSTANTS } from '../config/microservice.constants';
import { FireAuthController } from './fire_auth.controller';
import { FireAuthService } from './fire_auth.service';

@Module({
    imports: [setMicroservice(MICROSERVICE_CONSTANTS.AUTH)],
    controllers: [FireAuthController],
    providers: [FireAuthService, ClientRedis],
})
export class FireAuthModule {}
