import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
    ){}

    private logger = new Logger(WalletService.name, { timestamp: true })


    async addNewWallet(name: string, icon: string, amount: number, user_id: number): Promise<Wallet> {
        this.logger.debug(`Creating wallet with name: ${name}`);

        try {
        
            const user = this.walletRepository.create({ name, icon, amount, user_id });
            return await this.walletRepository.save(user);

        } catch (error) {
            console.error('Database Error:', error);
            throw new InternalServerErrorException('Failed to create new wallet');
        }
    }

    async getWallets(user_id: number): Promise<Wallet[]>{
        try {

            const results = await this.walletRepository.find({
                where: { user_id },
            });

            return results;

        } catch (error) {
            console.error('Database Error:', error);
            throw new InternalServerErrorException('Failed to get wallets');
        }
    
    }
}
