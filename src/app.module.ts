import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, RequestMethod } from '@nestjs/common';
import { typeORMConfig } from './config/typeorm.config';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { HelperModule } from './helper/helper.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions:{
        expiresIn: parseInt(process.env.JWT_EXPIRES),
      }
    }),
    AuthModule,
    AdminModule,
    UserModule,
  ],
})

export class AppModule {}
