import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryRepository } from './history.repository';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';
import { LogUserPoint } from 'src/log/entity/log-user-point.entity';
import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';
import { LogAdminPoint } from 'src/log/entity/log-admin-point.entity';
import { LogSiteMoney } from 'src/log/entity/log-site-money.entity';
import { AdminModule } from 'src/admin/admin.module';
import { UserModule } from 'src/user/user.module';
import { LogUserThirdpartyMoney } from 'src/log/entity/log-user-thirdparty-money.entity';

@Module({  
  imports: [
    AdminModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false}),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions:{
        expiresIn: parseInt(process.env.JWT_EXPIRES),
      }
    }),
    TypeOrmModule.forFeature([LogUserMoney, LogUserPoint, LogAdminMoney, LogAdminPoint, LogSiteMoney, LogUserThirdpartyMoney]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService, HistoryRepository]
})
export class HistoryModule {}
