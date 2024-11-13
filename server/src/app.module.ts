import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { Wallet } from './wallet/entities/wallet.entity';
import { BudgetsModule } from './budgets/budgets.module';
import { Budgets } from './budgets/entities/budgets.entity';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/entities/transaction.entities';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Wallet, Budgets, Transaction]
    }),
    AuthModule,
    UsersModule,
    WalletModule,
    BudgetsModule,
    TransactionModule
  ],
})
export class AppModule {}
