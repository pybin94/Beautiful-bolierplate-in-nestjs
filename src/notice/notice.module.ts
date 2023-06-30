import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { NoticeUser } from './entity/notice-user.entity';
import { NoticePopup } from './entity/notice-popup.entity';
import { NoticeMessageUser } from './entity/notice-message-user.entity';
import { NoticeMessageAdmin } from './entity/notice-message-admin.entity';
import { NoticeAdmin } from './entity/notice-admin.entity';
import { NoticeRepository } from './notice.repository';
import { NoticeMessageTemplateUser } from './entity/notice-message-template-user.entity';
import { NoticeMessageTemplateAdmin } from './entity/notice-message-template-admin.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      NoticePopup, 
      NoticeUser, 
      NoticeAdmin,
      NoticeMessageUser, 
      NoticeMessageAdmin,
      NoticeMessageTemplateUser, 
      NoticeMessageTemplateAdmin,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions:{
        expiresIn: parseInt(process.env.JWT_EXPIRES),
      }
    }),
  ],
  controllers: [NoticeController],
  providers: [NoticeService, NoticeRepository],
})
export class NoticeModule {}
