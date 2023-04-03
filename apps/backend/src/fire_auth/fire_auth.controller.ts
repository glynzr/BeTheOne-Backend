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
import { AuthIsAdminGuard } from 'libs/guards';
import { ApiConsts } from '../config/api.constants';
import { FireAuthService } from './fire_auth.service';


@Controller(ApiConsts.auth)
export class FireAuthController {
    constructor(private readonly fireAuthService: FireAuthService) {}

    @Get()
    @UseGuards(AuthIsAdminGuard)
    getUsers() {
        return this.fireAuthService.getUsers();
    }

    @Get(':id')
    @UseGuards(AuthIsAdminGuard)
    getUserById(@Param('id') id: string) {
        return this.fireAuthService.getUserById(id);
    }

    @Put(':id')
    @UseGuards(AuthIsAdminGuard)
    setUserClaims(
        @Param('id') id: string,
        @Body() body: { userRole: 'admin' | 'user' | undefined },
    ) {
        console.log(body);
        return this.fireAuthService.setUserClaims(id, body);
    }

    @Delete(':id')
    @UseGuards(AuthIsAdminGuard)
    deleteUser(id: string) {
        return this.fireAuthService.deleteUser(id);
    }

    @Post('register')
    register(
        @Body()
        {
            email,
            password,
            phoneNumber,
            displayName,
        }: {
            email: string;
            password: string;
            phoneNumber: string;
            displayName: string;
        },
    ) {
        return this.fireAuthService.register(
            email,
            password,
            phoneNumber,
            displayName,
        );
    }
}
