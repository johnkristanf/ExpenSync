import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import { hash, genSalt, compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private usersServices: UsersService,
        private jwtService: JwtService
    ){}

    private logger = new Logger(AuthService.name, { timestamp: true });

    async register(name: string, email: string, password: string): Promise<User> {

        try {
            const saltRounds = await genSalt();

            const hashedPassword = await hash(password, saltRounds);
            return this.usersServices.createUser(name, email, hashedPassword);

        } catch (error) {
            console.error('Database Error:', error);
            throw new InternalServerErrorException('Failed to register user');
        }
    }

    async validateUser(email: string, password: string): Promise<number | null> {

        try {
            const userData = await this.usersServices.findUserByEmail(email);

                this.logger.debug(`userData id: ${userData.id}`)

                if(userData){
                    const isMatch = await compare(password, userData.password);    
                    if (isMatch) {
                        return userData.id;
                    }
                } 
                    
                return null;

        } catch (error) {
            console.error('Database Error:', error);
            throw new InternalServerErrorException('Failed to validateUser');
        }

    }

    async signedJwt(user: User): Promise<string> {
        const payload = { 
            email: user.email,
            name: user.name, 
            sub: user.id 
        };

        return this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
            expiresIn: '1h', 
        });
    }

}
