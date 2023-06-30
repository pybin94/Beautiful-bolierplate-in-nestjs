import { JwtStrategy } from './jwt.strategy';
import { Admin } from '../admin/entity/admin.entity';
import { AuthRepository } from './auth.repository';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Sign } from 'src/helper/sign.helper';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false}),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions:{
        expiresIn: parseInt(process.env.JWT_EXPIRES),
      }
    }),
    TypeOrmModule.forFeature([Admin]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy, Sign],
})
export class AuthModule {}