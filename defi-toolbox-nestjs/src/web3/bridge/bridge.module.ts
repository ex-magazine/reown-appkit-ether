import { Module } from '@nestjs/common';
import { BridgeController } from './bridge.controller';
import { BridgeService } from './bridge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { ConfigModule } from '@nestjs/config';
import { WalletService } from '../../auth/wallet.service';
import { Web3UtilsModule } from '../utils/web3-utils.module';
import { User } from '../../auth/entities/user.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, User]),
    ConfigModule,
    Web3UtilsModule,
    AuthModule,
  ],
  controllers: [BridgeController],
  providers: [BridgeService, WalletService],
  exports: [BridgeService],
})
export class BridgeModule {}
