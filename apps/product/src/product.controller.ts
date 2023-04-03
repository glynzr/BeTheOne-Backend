import { CreateProductDto, UpdateProductDto } from '@app/entities';
import { Controller, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductRoutes } from '@app/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @MessagePattern(ProductRoutes.get)
    getProducts(
        @Payload(ValidationPipe)
        {
            filter,
            limit,
            page,
        }: {
            filter?: string;
            page?: string;
            limit: number;
        },
    ) {
        return this.productService.getProducts(limit, {page, filter});
    }

    @MessagePattern(ProductRoutes.getById)
    getProductById(@Payload(ValidationPipe) { id }: { id: string }) {
        return this.productService.getProductById(id);
    }

    @MessagePattern(ProductRoutes.getProductsByIds)
    getProductsByIds(@Payload(ValidationPipe) { ids }: { ids: string[] }) {
        return this.productService.getProductsByIds(ids);
    }

    @MessagePattern(ProductRoutes.getPaymentLink)
    getProductPaymentLink(
        @Payload(ValidationPipe) { items }: { items: string[] },
    ) {
        return this.productService.getProductPurchaseLink(items);
    }
}
