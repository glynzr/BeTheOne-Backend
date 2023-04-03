import { ClientsModule, Transport } from "@nestjs/microservices";
import { MICROSERVICE_CONSTANTS } from "apps/backend/src/config/microservice.constants";

export const setMicroservice = (name: MICROSERVICE_CONSTANTS) => ClientsModule.register([
    {
        name,
        transport: Transport.REDIS,
        options: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
        },
    },
])