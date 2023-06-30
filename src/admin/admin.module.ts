import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './entity/admin.entity';
import { AdminCommissionRate } from './entity/admin-commission-rate.entity';
import { LogModule } from 'src/log/log.module';
import { SiteModule } from 'src/site/site.module';
import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';
import { Site } from 'src/site/entity/site.entity';

@Module({
  imports: [
    SiteModule,
    LogModule,
    TypeOrmModule.forFeature([Admin, Site, LogAdminMoney, AdminCommissionRate]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions:{
        expiresIn: parseInt(process.env.JWT_EXPIRES),
      }
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
  exports: [AdminRepository],
})
export class AdminModule {}
