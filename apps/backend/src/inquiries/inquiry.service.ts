import { Injectable } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';
import { AuthRoutes } from '@app/common';
import { InquiryDto } from '@app/entities/dto/inquiry.dto';
import { InquiryRoutes } from '@app/common/ms_routes/inquiry.routes';

@Injectable()
export class InquiryService {
    constructor(private readonly client: ClientRedis) {}

    getInquiries() {
        return this.client.send(InquiryRoutes.get, {});
    }

    getInquiryById(id: string) {
        return this.client.send(InquiryRoutes.getById, { id });
    }

    addInquiry(
        inquiry: InquiryDto,
    ) {
        return this.client.send(InquiryRoutes.add, { inquiry });
    }

    updateInquiry(id: string, inquiry: InquiryDto) {
        return this.client.send(InquiryRoutes.update, {id, inquiry})
    }

    deleteInquiry(id: string) {
        return this.client.send(InquiryRoutes.deleteOne, { id });
    }
}
