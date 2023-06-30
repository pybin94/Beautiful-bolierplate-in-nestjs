import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { SiteRepository } from './site.repository';
import { Site } from './entity/site.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteProvider } from './entity/site-provider.entity';
import { IpBlacklist } from './entity/ip-blacklist.entity';
import { IpWhitelist } from './entity/ip-whitelist.entity';
import { SiteBonusLevelDetail } from './entity/site-bonus-level-detail.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false}),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions:{
        expiresIn: parseInt(process.env.JWT_EXPIRES),
      }
    }),
    TypeOrmModule.forFeature([Site, SiteProvider, IpBlacklist, IpWhitelist, SiteBonusLevelDetail]),
  ],
  controllers: [SiteController],
  providers: [SiteService, SiteRepository],
  exports: [SiteRepository],
})
export class SiteModule {}
