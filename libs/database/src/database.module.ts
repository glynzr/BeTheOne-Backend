import { Inquiry, InquiryAudit } from '@app/entities';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditingSubscriber } from 'typeorm-auditing';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DB_URL,
            entities: [...[Inquiry], ...[InquiryAudit]],
            synchronize: true,
            subscribers: [AuditingSubscriber],
        }),
    ],
})
export class DatabaseModule {}
