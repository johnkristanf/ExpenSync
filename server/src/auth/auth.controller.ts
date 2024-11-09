import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from 'src/users/dto/user';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    private logger = new Logger(AuthController.name, { timestamp: true })

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(
        @Body() registerDTO: RegisterUserDTO
    ){
        return this.authService.register(registerDTO.name, registerDTO.email, registerDTO.password)
    }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(
        @Request() req, 
        @Res({ passthrough: true }) res: Response
    ): Promise<{ message: string; }> {
        this.logger.debug(`Request Payload: ${req.user}`)
        const jwtToken = await this.authService.signedJwt(req.user);

        res.cookie('accessToken', jwtToken, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === 'PRODUCTION', 
            maxAge: 3600000, 
        });

        return { message: 'Login successful' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(
        @Request() req
    ) {
        this.logger.debug(`Request Payload: ${req.user}`)
        return req.user;
    }
}
