import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { LogModule } from 'src/log/log.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';

@Module({ 
  imports: [
    LogModule,
    TypeOrmModule.forFeature([LogAdminMoney, LogUserMoney]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions:{
        expiresIn: parseInt(process.env.JWT_EXPIRES),
      }
    }),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository]
})
export class TransactionModule {}
