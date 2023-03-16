import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './config/typeorm.config';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    UserModule,
  ],
})

export class AppModule {}
