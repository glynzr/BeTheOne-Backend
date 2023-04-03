import { DatabaseModule } from '@app/database';
import { Inquiry } from '@app/entities';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        TypeOrmModule.forFeature([Inquiry]),
    ],
    controllers: [InquiryController],
    providers: [InquiryService],
})
export class InquiryModule {}
