import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { BudgetsModule } from './budgets/budgets.module';
import { TransactionModule } from './transaction/transaction.module';
import { SavingsModule } from './savings/savings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // synchronize: true shouldn't be used in production 
    // - otherwise you can lose production data
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),

    AuthModule,
    UsersModule,
    WalletModule,
    BudgetsModule,
    TransactionModule,
    SavingsModule
  ],
})
export class AppModule {}
