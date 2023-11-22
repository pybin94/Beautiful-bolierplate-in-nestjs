import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { typeORMConfig } from './config/typeorm.config';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { IPBlockMiddleware } from './middleware/IP-block.middleware';

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
    AdminModule,
    UserModule,
  ],
  providers: [IPBlockMiddleware],
})

export class AppModule implements NestModule {
  constructor(private readonly ipBlockMiddleware: IPBlockMiddleware) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(this.ipBlockMiddleware.use.bind(this.ipBlockMiddleware)).forRoutes('*');
  }
}