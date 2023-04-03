import { Injectable } from '@nestjs/common';
import { ClientRedis } from '@nestjs/microservices';
import { AuthRoutes } from '@app/common';

@Injectable()
export class FireAuthService {
    constructor(private readonly client: ClientRedis) {}

    getUsers() {
        return this.client.send(AuthRoutes.get, {});
    }

    getUserById(id: string) {
        return this.client.send(AuthRoutes.getById, { id });
    }

    setUserClaims(
        id: string,
        claims: { userRole: 'admin' | 'user' | undefined },
    ) {
        return this.client.send(AuthRoutes.setClaims, { id, claims });
    }

    deleteUser(id: string) {
        return this.client.send(AuthRoutes.delete, { id });
    }
    register(
        email: string,
        password: string,
        phoneNumber: string,
        displayName: string,
    ) {
        return this.client.send(AuthRoutes.register, {
            email,
            password,
            phoneNumber,
            displayName,
        });
    }
}
