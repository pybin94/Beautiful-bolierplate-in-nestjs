import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module, forwardRef } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { Provider } from './entity/provider.entity';
import { ProviderService } from './provider.service';
import { ProviderRepository } from './provider.repository';
import { ProviderThirdparty } from './entity/provider-thirdparty.entity';
import { UnionService } from './provider/union';
import { MajorService } from './provider/major';
import { ProviderThirdpartySite } from './entity/provider-thirdparty-site.entity';
import { LogModule } from 'src/log/log.module';
import { SiteProvider } from 'src/site/entity/site-provider.entity';

@Module({
  imports: [
    LogModule,
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt', session: false}),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions:{
        expiresIn: parseInt(process.env.JWT_EXPIRES),
      }
    }),
    TypeOrmModule.forFeature([Provider, ProviderThirdparty, ProviderThirdpartySite, SiteProvider]),
  ],
  controllers: [ProviderController],
  providers: [
    ProviderService, 
    ProviderRepository,
    UnionService,
    MajorService,
  ],
  exports: [ProviderService]
})
export class ProviderModule {}
