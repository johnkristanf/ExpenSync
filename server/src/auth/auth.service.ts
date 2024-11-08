import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { hash, genSalt } from 'bcrypt';
import { User } from 'src/users/entities/user/user';

@Injectable()
export class AuthService {
    constructor(
        private usersServices: UsersService,
    ){}

    async register(name: string, email: string, password: string): Promise<User> {
        
        const saltRounds = await genSalt();

        const hashedPassword = await hash(password, saltRounds);
        return this.usersServices.createUser(name, email, hashedPassword);
    }
}
