import { InquiryDto } from '@app/entities/dto/inquiry.dto';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AuthIsAdminGuard, AuthIsVerifiedGuard } from 'libs/guards';
import { ApiConsts } from '../config/api.constants';
import { InquiryService } from './inquiry.service';

@Controller(ApiConsts.inquiry)
export class InquiryController {
    constructor(private readonly inquiryService: InquiryService) {}

    @UseGuards(AuthIsAdminGuard)
    @Get()
    getInquiries() {
        return this.inquiryService.getInquiries();
    }

    @UseGuards(AuthIsAdminGuard)
    @Get(':id')
    getInquiryById(@Param('id') id: string) {
      return this.inquiryService.getInquiryById(id);
    }

    // @UseGuards(AuthIsVerifiedGuard)
    @Post()
    addInquiry(@Body() body: InquiryDto) {
      return this.inquiryService.addInquiry(body);
    }

    @UseGuards(AuthIsAdminGuard)
    @Put(':id')
    updateInquiry(@Param('id') id: string, @Body() body: InquiryDto) {
        return this.inquiryService.updateInquiry(id, body);
    }

    @UseGuards(AuthIsAdminGuard)
    @Delete(':id')
    deleteInquiry(id: string) {
        return this.inquiryService.deleteInquiry(id);
    }

}
