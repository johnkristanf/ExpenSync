import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Savings } from './entities/savings.entity';
import { Repository } from 'typeorm';
import { CreateSavingsDTO } from './dto/create-savings-dto';

@Injectable()
export class SavingsService {
    constructor(
        @InjectRepository(Savings)
        private savingsRepository: Repository<Savings>,
    ){}

    async createSavings(savingsDTO: CreateSavingsDTO): Promise<number | null> {

        try {
            const create = this.savingsRepository.create(savingsDTO);
            const { id } = await this.savingsRepository.save(create)

            return id

        } catch (error) {
            console.error('Database Error:', error);
            throw new InternalServerErrorException('Failed to create new savings');
        }
        
    }
}
