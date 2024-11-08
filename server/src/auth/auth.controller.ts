import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from 'src/users/dto/user';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() registerDTO: RegisterUserDTO){
        return this.authService.register(registerDTO.name, registerDTO.email, registerDTO.password)
    }
}
