import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { hash, genSalt, compare } from 'bcrypt';
import { User } from 'src/users/entities/user/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersServices: UsersService,
        private jwtService: JwtService
    ){}

    private logger = new Logger(AuthService.name, { timestamp: true });

    async register(name: string, email: string, password: string): Promise<User> {
        
        const saltRounds = await genSalt();

        const hashedPassword = await hash(password, saltRounds);
        return this.usersServices.createUser(name, email, hashedPassword);
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersServices.findUserByEmail(email);

        if(user){
            const isMatch = await compare(password, user.password);    
            if(isMatch) return user;   
        }
             
        return null;
    }

    async signedJwt(user: User): Promise<string> {
        const payload = { 
            email: user.email,
            name: user.name, 
            sub: user.id 
        };

        return this.jwtService.sign(payload)
    }

}
