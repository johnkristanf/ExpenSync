import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Budgets } from './entities/budgets.entity';
import { Repository } from 'typeorm';
import { CreateBudgetDto } from './dto/create-budget-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GetBudgetDTO } from './dto/get-budget.dto';

@Injectable()
export class BudgetsService {
    constructor(
        @InjectRepository(Budgets)
        private budgetsRepository: Repository<Budgets>
    ){}

    async createBudget(createBudgetDTO: CreateBudgetDto): Promise<Budgets> {

        try {

            const user = this.budgetsRepository.create(createBudgetDTO);
            return await this.budgetsRepository.save(user);

        } catch (error) {
            console.error('Database Error:', error);
            throw new InternalServerErrorException('Failed to create new wallet');
        }
       
    }

    async getBudgets(user_id: number): Promise<GetBudgetDTO[]>{
        try {

            const results = await this.budgetsRepository.find({
                where: { user_id },
                select: ['id', 'name', 'icon', 'period', 'budget', 'wallet_id']
            });

            return results;

        } catch (error) {
            console.error('Database Error:', error);
            throw new InternalServerErrorException('Failed to get budgets');
        }
    
    }
}
