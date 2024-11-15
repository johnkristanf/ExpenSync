import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { CreateWalletDto } from './dto/create-wallet-dto';

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService){}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addNewWalletController(
        @Request() req,
        @Body() newWalletDTO: CreateWalletDto

    ) {
        if(req.user.id) newWalletDTO.user_id = req.user.id
        const newWallet = await this.walletService.createNewWallet(newWalletDTO)

        return newWallet;
    }


    @UseGuards(JwtAuthGuard)
    @Get('get')
    async getWalletsController(
        @Request() req,
    ) {
        const wallets = await this.walletService.getWallets(req.user.id);

        return wallets;
    }

}
