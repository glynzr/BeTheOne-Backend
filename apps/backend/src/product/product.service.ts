import { CreateProductDto, UpdateProductDto } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';
import { ProductRoutes } from '@app/common';

@Injectable()
export class ProductService {
    constructor(private readonly client: ClientRedis) {}

    getProducts(
        limit: number,
        { page, filter }: { page?: string; filter?: string },
    ) {
        return this.client.send(ProductRoutes.get, { filter, page, limit });
    }

    getProductById(id: string) {
        return this.client.send(ProductRoutes.getById, { id });
    }

    getProductPaymentLink(items: string[]) {
        return this.client.send(ProductRoutes.getPaymentLink, { items });
    }

    getProductsByIds(ids: string[]) {
        return this.client.send(ProductRoutes.getProductsByIds, { ids });
    }
}
