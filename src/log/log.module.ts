import { Module } from '@nestjs/common';
import { LogRepository } from './log.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogSiteMoney } from './entity/log-site-money.entity';
import { LogAdminMoney } from './entity/log-admin-money.entity';
import { LogAdminPoint } from './entity/log-admin-point.entity';
import { LogAdminRolling } from './entity/log-admin-rolling.entity';
import { LogAdminSignin } from './entity/log-admin-signin.entity';
import { LogUserMoney } from './entity/log-user-money.entity';
import { LogUserPoint } from './entity/log-user-point.entity';
import { LogUserRolling } from './entity/log-user-rolling.entity';
import { LogUserSignin } from './entity/log-user-signin.entity';
import { LogUserThirdpartyMoney } from './entity/log-user-thirdparty-money.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        LogSiteMoney, 
        LogAdminMoney,
        LogAdminPoint,
        LogAdminRolling,
        LogAdminSignin,
        LogUserMoney,
        LogUserPoint,
        LogUserRolling,
        LogUserSignin,
        LogUserThirdpartyMoney,
      ]),
    ],
    controllers: [],
    providers: [LogRepository],
    exports: [LogRepository],
})
export class LogModule {}
