import { Module } from '@nestjs/common';
import { SavingsService } from './savings.service';
import { SavingsController } from './savings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Savings } from './entities/savings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Savings])],
  controllers: [SavingsController],
  providers: [SavingsService],
})
export class SavingsModule {}
