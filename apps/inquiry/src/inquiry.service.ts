import { InquiryDto } from '@app/entities';
import { Inquiry } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InquiryService {
    constructor(
        @InjectRepository(Inquiry)
        private readonly inquiryRepository: Repository<Inquiry>,
    ) {}

    getInquiries() {
        return this.inquiryRepository.find();
    }

    getInquiryById(id: string) {
        return this.inquiryRepository.findOne({ where: { id } });
    }

    addInquiry(inquiry: InquiryDto) {
        return this.inquiryRepository.save(inquiry);
    }

    updateInquiry(id: string, inquiry: InquiryDto) {
        return this.inquiryRepository.update(id, inquiry);
    }

    deleteInquiry(id: string) {
        return this.inquiryRepository.delete(id);
    }
}
