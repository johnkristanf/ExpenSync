import { Injectable, InternalServerErrorException,  NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet-dto';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
    ){}

    async createNewWallet(createWalletDto: CreateWalletDto): Promise<Wallet> {

        try {
        
            const user = this.walletRepository.create(createWalletDto);
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
            throw new NotFoundException('Failed to get wallets');
        }
    
    }
}
