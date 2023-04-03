import { CreateProductDto, UpdateProductDto } from '@app/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { categories } from './categories';
@Injectable()
export class ProductService {
    constructor(
        @InjectStripe()
        private readonly stripe: Stripe,
    ) {}

    async getProducts(
        limit: number,
        {
            page,
            filter,
        }: { page?: string | undefined; filter?: string | undefined },
    ) {
        const queryString = { query: '' };
        if (filter === undefined || filter.trim() === '')
            queryString.query = 'active:"true"';
        else if (categories.includes(filter))
            queryString.query = `active:"true" AND metadata['category']:"${filter}"`;
        else
            queryString.query = `name~"${filter}" OR description:"${filter} OR metadata['manufacturer']:${filter}"`;

        const products = await this.stripe.products.search({
            limit,
            page,
            query: queryString.query,
            expand: ['data.default_price'],
        });

        return {
            products: products.data,
            next_page: products.next_page,
            has_more: products.has_more,
        };
    }

    async getProductById(id: string) {
        const product = await this.stripe.products.retrieve(id, {
            expand: ['default_price'],
        });

        return product;
    }

    async getProductsByIds(ids: string[]) {
        const myIds = ids.slice(1, ids.length);
        const products = await this.stripe.products.list({
            ids: myIds,
            expand: ['data.default_price'],
        });

        return products.data;
    }

    async getProductPurchaseLink(items: string[]) {
        return await this.stripe.paymentLinks.create({
            after_completion: {
                type: 'redirect',
                redirect: {
                    url: process.env.FRONTEND_LINK!,
                },
            },
            invoice_creation: {
                enabled: true,
                invoice_data: {
                    rendering_options: {
                        amount_tax_display: 'include_inclusive_tax',
                    },
                },
            },
            line_items: items.map((item) => {
                return {
                    price: item,
                    quantity: 1,
                    adjustable_quantity: {
                        enabled: true,
                        maximum: 15,
                        minimum: 0,
                    },
                };
            }),
        });
    }
}
