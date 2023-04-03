import { Controller, Get, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthRoutes } from '@app/common';
import { identity } from 'rxjs';
import { FireAuthService } from './fire_auth.service';

@Controller()
export class FireAuthController {
    constructor(private readonly fireAuthService: FireAuthService) {}

    @MessagePattern(AuthRoutes.get)
    getUsers() {
        return this.fireAuthService.getUsers();
    }

    @MessagePattern(AuthRoutes.getById)
    getUserById(@Payload(ValidationPipe) { id }: { id: string }) {
        return this.fireAuthService.getUserById(id);
    }

    @MessagePattern(AuthRoutes.setClaims)
    setUserClaims(
        @Payload(ValidationPipe)
        {
            id,
            claims,
        }: {
            id: string;
            claims: { userRole: 'admin' | 'user' | undefined };
        },
    ) {
        const data = this.fireAuthService.setClaims(id, claims);
        return data;
    }

    @MessagePattern(AuthRoutes.delete)
    deleteUser(@Payload(ValidationPipe) { id }: { id: string }) {
        return this.fireAuthService.deleteUser(id);
    }

    @MessagePattern(AuthRoutes.register)
    register(
        @Payload(ValidationPipe)
        {
            displayName,
            email,
            password,
            phoneNumber,
        }: {
            email: string;
            password: string;
            phoneNumber: string;
            displayName: string;
        },
    ) {
        return this.fireAuthService.createUserWithEmailAndPasswordAndPhoneNumber(email, password, phoneNumber, displayName)
    }
}
