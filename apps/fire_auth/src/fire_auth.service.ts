import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { passwordPolicyRegex } from './constants/password_policy_regex';

@Injectable()
export class FireAuthService {
    constructor(private readonly auth: FirebaseAuthenticationService) {}

    getUsers() {
        return this.auth.listUsers();
    }

    getUserById(id: string) {
        return this.auth.getUser(id);
    }

    async setClaims(
        id: string,
        claims: { userRole: 'admin' | 'user' | undefined },
    ) {
        if (!['admin', 'seller', 'buyer'].includes(claims.userRole))
            throw new BadRequestException({
                message: 'No role named ' + claims.userRole,
            });

        await this.auth.setCustomUserClaims(id, claims).catch((error) => {
            console.error(error);
            throw new InternalServerErrorException();
        });
        return true;
    }

    deleteUser(id: string) {
        return this.auth.deleteUser(id);
    }

    async createUserWithEmailAndPasswordAndPhoneNumber(
        email: string,
        password: string,
        phoneNumber: string,
        displayName: string,
    ) {

        if (!password.match(passwordPolicyRegex)) {
            throw new Error("Password is no good")
        }

        const user = await this.auth
            .createUser({
                email,
                displayName,
                password,
                phoneNumber,
                emailVerified: true,
                multiFactor: {
                    enrolledFactors: [
                        {
                            factorId: 'phone',
                            phoneNumber,
                            displayName: 'sms_verification_phone',
                        },
                    ],
                },
            })
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException();
            });

        const uid = user.uid;

        return uid;
    }
}
