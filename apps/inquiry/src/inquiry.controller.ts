import { InquiryRoutes } from '@app/common/ms_routes/inquiry.routes';
import { InquiryDto } from '@app/entities/dto/inquiry.dto';
import { Controller, Get, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InquiryService } from './inquiry.service';

@Controller()
export class InquiryController {
    constructor(private readonly inquiryService: InquiryService) {}

    @MessagePattern(InquiryRoutes.get)
    getInquiries() {
        return this.inquiryService.getInquiries();
    }

    @MessagePattern(InquiryRoutes.getById)
    getInquiryById(@Payload(ValidationPipe) { id }: { id: string }) {
        return this.inquiryService.getInquiryById(id);
    }

    @MessagePattern(InquiryRoutes.add)
    addInquiry(@Payload(ValidationPipe) { inquiry }: { inquiry: InquiryDto }) {
        return this.inquiryService.addInquiry(inquiry);
    }

    @MessagePattern(InquiryRoutes.update)
    updateInquiry(
        @Payload(ValidationPipe)
        { id, inquiry }: { id: string; inquiry: InquiryDto },
    ) {
        return this.inquiryService.updateInquiry(id, inquiry);
    }

    @MessagePattern(InquiryRoutes.deleteOne)
    deleteInquiry(@Payload(ValidationPipe) { id }: { id: string }) {
        return this.inquiryService.deleteInquiry(id);
    }
}
