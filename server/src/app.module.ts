import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user/user';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { Wallet } from './wallet/entities/wallet';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Wallet]
    }),
    AuthModule,
    UsersModule,
    WalletModule
  ],
})
export class AppModule {}
