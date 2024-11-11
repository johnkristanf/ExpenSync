import { Body, Controller, Get, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { NewWalletDTO } from './dto/wallet';

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService){}

    private logger = new Logger(WalletController.name, { timestamp: true })


    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addNewWalletController(
        @Request() req,
        @Body() newWalletDTO: NewWalletDTO

    ) {
        this.logger.debug(`Request Payload: ${req.user.id}`)

        const newWallet = await this.walletService.addNewWallet(
            newWalletDTO.name,
            newWalletDTO.icon,
            newWalletDTO.amount,
            req.user.id
        )

        return newWallet;
    }


    @UseGuards(JwtAuthGuard)
    @Get('get')
    async getWalletsController(
        @Request() req,
    ) {
        this.logger.debug(`Request Payload: ${req.user.id}`)
        const wallets = await this.walletService.getWallets(req.user.id);

        return wallets;
    }

}
