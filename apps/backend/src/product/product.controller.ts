import {
    Body,
    Controller,
    Get,
    Header,
    Headers,
    Param,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiConsts } from '../config/api.constants';
import { countries } from '../config/countries';
import { categories } from '../config/categories';
import { AuthGuard } from 'libs/guards';
import { AuthIsVerifiedGuard } from 'libs/guards';
import { Request } from 'express';

@Controller(ApiConsts.product)
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    getProducts(
        @Query('filter') filter?: string | undefined,
        @Query('page') page?: string | undefined,
        @Query('limit') limit: number = 5,
    ) {
        return this.productService.getProducts(limit, { page, filter });
    }

    @Post('payment_link')
    @UseGuards(AuthIsVerifiedGuard)
    getProductPaymentLink(@Body('items') items: string[]) {
        return this.productService.getProductPaymentLink(items);
    }

    @Get('multiple')
    getProductsByIds(@Query('ids') param: string) {
        return this.productService.getProductsByIds(param.split('|'));
    }

    @Get('regions')
    getRegions() {
        return countries;
    }

    @Get('categories')
    getCategories() {
        return categories.map((e) => ({
            category: e.title,
        }));
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productService.getProductById(id);
    }
}
