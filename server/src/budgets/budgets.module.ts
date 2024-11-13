import { Module } from '@nestjs/common';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budgets } from './entities/budgets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Budgets])],
  controllers: [BudgetsController],
  providers: [BudgetsService]
})
export class BudgetsModule {}
