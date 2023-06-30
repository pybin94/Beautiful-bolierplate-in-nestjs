import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { typeORMConfig } from './config/typeorm.config';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { SiteModule } from './site/site.module';
import { NoticeModule } from './notice/notice.module';
import { LogModule } from './log/log.module';
import { TransactionModule } from './transaction/transaction.module';
import { IPBlockMiddleware } from './middleware/IP-block.middleware';
import { HistoryModule } from './history/history.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions:{
        expiresIn: parseInt(process.env.JWT_EXPIRES),
      }
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    HistoryModule,
    AdminModule,
    UserModule,
    SiteModule,
    ProviderModule,
    NoticeModule,
    LogModule,
    TransactionModule,
  ],
  providers: [IPBlockMiddleware],
})

export class AppModule implements NestModule {
  constructor(private readonly ipBlockMiddleware: IPBlockMiddleware) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(this.ipBlockMiddleware.use.bind(this.ipBlockMiddleware)).forRoutes('*');
  }
}