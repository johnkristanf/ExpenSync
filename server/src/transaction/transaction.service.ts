import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entities';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction-dto';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>
    ){}

    async createTransaction(createTransactionDTO: CreateTransactionDto): Promise<Transaction> {

        try {
            const transaction = this.transactionRepository.create(createTransactionDTO);
            return await this.transactionRepository.save(transaction);

        } catch (error) {
            console.error('Database Error:', error);
            throw new InternalServerErrorException('Failed to make transaction');
        }
    }
}
