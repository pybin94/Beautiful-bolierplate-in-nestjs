import { Body, Controller, Delete, Patch, Post, UseGuards } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { JwtAuthGuard } from 'src/gaurds/jwt-auth.gaurd';
import { Token } from 'src/user/user.decorator';
import { NoticeAdminUpsertDto } from './dto/notice-admin-upsert.dto';
import { NoticeUserUpsertDto } from './dto/notice-user-upsert.dto';
import { NoticePopupUpsertDto } from './dto/notice-popup-upsert.dto';
import { NoticeUserMessageUpsertDto } from './dto/notice-user-message-upsert.dto';
import { NoticeMessageTemplateUpsertDto } from './dto/notice-message-template-upsert.dto';
import { NoticeAdminMessageUpsertDto } from './dto/notice-admin-message-upsert.dto';

@Controller('notice')
@UseGuards(JwtAuthGuard)
export class NoticeController {
    constructor( 
        private readonly noticeService: NoticeService 
    ) {}

    @Post('/popup')
    async noticePopupList(@Body() body: any, @Token(1) token: any): Promise<object> {
        const noticePopupListResult = await this.noticeService.noticePopupList(body, token);
        return noticePopupListResult;
    }

    @Patch('/popup')
    async noticePopupUpsert(@Body() noticePopupUpsertDto: NoticePopupUpsertDto, @Token(1) token: any): Promise<object> {
        const noticePopupUpsertResult = await this.noticeService.noticePopupUpsert(noticePopupUpsertDto, token);
        return noticePopupUpsertResult;
    }

    @Delete('/popup')
    async noticePopupDelete(@Body() body: any, @Token(1) token: any): Promise<object> {
        const noticePopupDeleteResult = await this.noticeService.noticePopupDelete(body, token);
        return noticePopupDeleteResult;
    }

    @Post('/user')
    async noticeUserList(@Body() body: any, @Token(1) token: any): Promise<object> {
        const noticeUserListResult = await this.noticeService.noticeUserList(body, token);
        return noticeUserListResult;
    }

    @Patch('/user')
    async noticeUserUpsert(@Body() NoticeUserUpsertDto: NoticeUserUpsertDto, @Token(1) token: any): Promise<object> {
        const noticeUserUpsertResult = await this.noticeService.noticeUserUpsert(NoticeUserUpsertDto, token);
        return noticeUserUpsertResult;
    }

    @Delete('/user')
    async noticeUserDelete(@Body() body: any, @Token(1) token: any): Promise<object> {
        const noticeUserDeleteResult = await this.noticeService.noticeUserDelete(body, token);
        return noticeUserDeleteResult;
    }

    @Post('/user/message')
    async noticeUserMessageList(@Body() body: any, @Token(1) token: any): Promise<object> {
        const noticeUserMessageListResult = await this.noticeService.noticeUserMessageList(body, token);
        return noticeUserMessageListResult;
    }

    @Patch('/user/message')
    async noticeUserMessageUpsert(@Body() noticeUserMessageUpsertDto: NoticeUserMessageUpsertDto, @Token(1) token: any): Promise<object> {
        const noticeUserMessageUpsertResult = await this.noticeService.noticeUserMessageUpsert(noticeUserMessageUpsertDto, token);
        return noticeUserMessageUpsertResult;
    }

    @Delete('/user/message')
    async noticeUserMessageDelete(@Body() body: any, @Token(1) token: any): Promise<object> {
        const noticeUserMessageDeleteResult = await this.noticeService.noticeUserMessageDelete(body, token);
        return noticeUserMessageDeleteResult;
    }

    @Post('/user/message/template')
    async noticeUserMessageTemplateList(@Body() body: any, @Token(1) token: any): Promise<object> {
        const noticeUserMessageTemplateListResult = await this.noticeService.noticeUserMessageTemplateList(body, token);
        return noticeUserMessageTemplateListResult;
    }

    @Patch('/user/message/template')
    async noticeUserMessageTemplateUpsert(@Body() noticeMessageTemplateUpsertDto: NoticeMessageTemplateUpsertDto, @Token(1) token: any): Promise<object> {
        const noticeUserMessageTemplateUpsertResult = await this.noticeService.noticeUserMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token);
        return noticeUserMessageTemplateUpsertResult;
    }

    @Delete('/user/message/template')
    async noticeUserMessageTemplateDelete(@Body() body: any, @Token(1) token: any): Promise<object> {
        const noticeUserMessageTemplateDeleteResult = await this.noticeService.noticeUserMessageTemplateDelete(body, token);
        return noticeUserMessageTemplateDeleteResult;
    }

    @Post('/admin')
    async noticeAdminList(@Body() body: any, @Token() token: any): Promise<object> {
        const noticeAdminListResult = await this.noticeService.noticeAdminList(body, token);
        return noticeAdminListResult;
    }

    @Patch('/admin')
    async noticeAdminUpsert(@Body() noticeAdminUpsertDto: NoticeAdminUpsertDto, @Token() token: any): Promise<object> {
        const noticeAdminUpsertResult = await this.noticeService.noticeAdminUpsert(noticeAdminUpsertDto, token);
        return noticeAdminUpsertResult;
    }

    @Delete('/admin')
    async noticeAdminDelete(@Body() body: any, @Token(1) token: any): Promise<object> {
        const noticeAdminDeleteResult = await this.noticeService.noticeAdminDelete(body, token);
        return noticeAdminDeleteResult;
    }

    @Post('/admin/message')
    async noticeAdminMessageList(@Body() body: any, @Token() token: any): Promise<object> {
        const noticeUserMessageListResult = await this.noticeService.noticeAdminMessageList(body, token);
        return noticeUserMessageListResult;
    }

    @Patch('/admin/message')
    async noticeAdminMessageUpsert(@Body() noticeAdminMessageUpsertDto: NoticeAdminMessageUpsertDto, @Token() token: any): Promise<object> {
        const noticeUserMessageUpsertResult = await this.noticeService.noticeAdminMessageUpsert(noticeAdminMessageUpsertDto, token);
        return noticeUserMessageUpsertResult;
    }

    @Delete('/admin/message')
    async noticeAdminMessageDelete(@Body() body: any, @Token(1) token: any): Promise<object> {
        const noticeUserMessageDeleteResult = await this.noticeService.noticeAdminMessageDelete(body, token);
        return noticeUserMessageDeleteResult;
    }

    @Post('/admin/message/template')
    async noticeAdminMessageTemplateList(@Body() body: any, @Token() token: any): Promise<object> {
        const noticeUserMessageTemplateListResult = await this.noticeService.noticeAdminMessageTemplateList(body, token);
        return noticeUserMessageTemplateListResult;
    }

    @Patch('/admin/message/template')
    async noticeAdminMessageTemplateUpsert(@Body() noticeMessageTemplateUpsertDto: NoticeMessageTemplateUpsertDto, @Token(1) token: any): Promise<object> {
        const noticeUserMessageTemplateUpsertResult = await this.noticeService.noticeAdminMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token);
        return noticeUserMessageTemplateUpsertResult;
    }

    @Delete('/admin/message/template')
    async noticeAdminMessageTemplateDelete(@Body() body: any, @Token(1) token: any): Promise<object> {
        const noticeUserMessageTemplateDeleteResult = await this.noticeService.noticeAdminMessageTemplateDelete(body, token);
        return noticeUserMessageTemplateDeleteResult;
    }

}
