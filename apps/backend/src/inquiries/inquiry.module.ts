import { Module } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';
import { setMicroservice } from '@app/common/microservices_configuration/microservice.config';
import { MICROSERVICE_CONSTANTS } from '../config/microservice.constants';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';

@Module({
    imports: [
        setMicroservice(MICROSERVICE_CONSTANTS.AUTH),
        setMicroservice(MICROSERVICE_CONSTANTS.INQUIRY),
    ],
    controllers: [InquiryController],
    providers: [InquiryService, ClientRedis],
})
export class InquiryModule {}
