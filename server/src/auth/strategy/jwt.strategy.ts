import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({

            jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
                if (req && req.cookies) {
                    return req.cookies['accessToken']; 
                }
                return null;
            }]),

            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload: any) {
        const user = { 
            id: payload.sub, 
            name: payload.name, 
            email: payload.email 
        };

        return user;
    }
}