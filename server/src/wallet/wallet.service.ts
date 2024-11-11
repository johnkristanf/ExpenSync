import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
    ){}

    private logger = new Logger(WalletService.name, { timestamp: true })


    addNewWallet(name: string, icon: string, amount: number, user_id: number): Promise<Wallet> {
        this.logger.debug(`Creating wallet with name: ${name}`);
        
        const user = this.walletRepository.create({ name, icon, amount, user_id });
        return this.walletRepository.save(user);
    }
}
