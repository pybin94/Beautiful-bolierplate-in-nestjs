import { JwtModule } from '@nestjs/jwt';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserCommissionRate } from './entity/user-commission-rate.entity';
import { AdminModule } from 'src/admin/admin.module';
import { LogModule } from 'src/log/log.module';
import { SiteModule } from 'src/site/site.module';
import { Site } from 'src/site/entity/site.entity';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';
import { ProviderModule } from 'src/provider/provider.module';

@Module({
  imports: [
    SiteModule,
    AdminModule,
    LogModule,
    forwardRef(() => ProviderModule),
    TypeOrmModule.forFeature([User, UserCommissionRate, Site, LogUserMoney]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions:{
        expiresIn: parseInt(process.env.JWT_EXPIRES),
      }
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}