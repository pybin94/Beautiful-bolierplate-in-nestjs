import { Injectable } from '@nestjs/common';
import { NoticeRepository } from './notice.repository';
import { handleError, handleSend } from 'src/config/log.tools.config';
import { NoticeAdminUpsertDto } from './dto/notice-admin-upsert.dto';
import { NoticeUserUpsertDto } from './dto/notice-user-upsert.dto';
import { NoticePopupUpsertDto } from './dto/notice-popup-upsert.dto';
import { NoticeUserMessageUpsertDto } from './dto/notice-user-message-upsert.dto';
import { NoticeMessageTemplateUpsertDto } from './dto/notice-message-template-upsert.dto';
import { NoticeAdminMessageUpsertDto } from './dto/notice-admin-message-upsert.dto';

@Injectable()
export class NoticeService {
    constructor(
        private readonly noticeRepository: NoticeRepository,
    ) {}

    async noticePopupList(body: any, token: any): Promise<object> {
        try {
            let noticePopup = await this.noticeRepository.noticePopupList(body, token);
            const [list, total] = Object.values(noticePopup);

            return handleSend({list, total});
        } catch (error) {
            return handleError("[Service] noticePopupList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }

    async noticePopupUpsert(NoticePopupUpsertDto: NoticePopupUpsertDto, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticePopupUpsert(NoticePopupUpsertDto, token);
            return handleSend([], "등록됐습니다.");
        } catch (error) {
            return handleError("[Service] noticePopupUpsert", error, "오류가 발생했습니다.");
        }
    }

    async noticePopupDelete(body: any, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticePopupDelete(body, token);
            return handleSend([], "삭제됐습니다.");
        } catch (error) {
            return handleError("[Service] noticePopupDelete", error, "오류가 발생했습니다.");
        }
    }

    async noticeUserList(body: any, token: any): Promise<object> {
        try {
            let noticeUser = await this.noticeRepository.noticeUserList(body, token);
            const [list, total] = Object.values(noticeUser["normal"]);

            return handleSend({fixed: noticeUser["fixed"], list, total});
        } catch (error) {
            return handleError("[Service] noticeUserList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }

    async noticeUserUpsert(noticeUserUpsertDto: NoticeUserUpsertDto, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeUserUpsert(noticeUserUpsertDto, token);
            return handleSend([], "등록됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeUserUpsert", error, "오류가 발생했습니다.");
        }
    }

    async noticeUserDelete(body: any, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeUserDelete(body, token);
            return handleSend([], "삭제됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeUserDelete", error, "오류가 발생했습니다.");
        }
    }

    async noticeUserMessageList(body: any, token: any): Promise<object> {
        try {
            let noticeUserMessage = await this.noticeRepository.noticeUserMessageList(body, token);
            const [list, total] = Object.values(noticeUserMessage);

            return handleSend({list, total});
        } catch (error) {
            return handleError("[Service] noticeUserMessageList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }

    async noticeUserMessageUpsert(noticeUserMessageUpsertDto: NoticeUserMessageUpsertDto, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeUserMessageUpsert(noticeUserMessageUpsertDto, token);
            return handleSend([], "쪽지가 전송됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeUserMessageUpsert", error, "오류가 발생했습니다.");
        }
    }

    async noticeUserMessageDelete(body: any, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeUserMessageDelete(body, token);
            return handleSend([], "삭제됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeUserMessageDelete", error, "오류가 발생했습니다.");
        }
    }

    async noticeUserMessageTemplateList(body: any, token: any): Promise<object> {
        try {
            let noticeUserMessageTemplate = await this.noticeRepository.noticeUserMessageTemplateList(body, token);
            const [list, total] = Object.values(noticeUserMessageTemplate);

            return handleSend({list, total});
        } catch (error) {
            return handleError("[Service] noticeUserMessageTemplateList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }

    async noticeUserMessageTemplateUpsert(noticeMessageTemplateUpsertDto: NoticeMessageTemplateUpsertDto, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeUserMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token);
            return handleSend([], "등록됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeUserMessageTemplateUpsert", error, "오류가 발생했습니다.");
        }
    }

    async noticeUserMessageTemplateDelete(body: any, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeUserMessageTemplateDelete(body, token);
            return handleSend([], "삭제됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeUserMessageTemplateDelete", error, "오류가 발생했습니다.");
        }
    }

    async noticeAdminList(body: any, token: any): Promise<object> {
        try {
            let noticeAdmin = await this.noticeRepository.noticeAdminList(body, token);
            const [list, total] = Object.values(noticeAdmin["normal"]);

            return handleSend({fixed: noticeAdmin["fixed"], list, total});

        } catch (error) {
            return handleError("[Service] noticeAdminList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }

    async noticeAdminUpsert(noticeAdminUpsertDto: NoticeAdminUpsertDto, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeAdminUpsert(noticeAdminUpsertDto, token);
            return handleSend([], "쪽지가 전송됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeAdminUpsert", error, "오류가 발생했습니다.");
        }
    }

    async noticeAdminDelete(body: any, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeAdminDelete(body, token);
            return handleSend([], "삭제됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeAdminDelete", error, "오류가 발생했습니다.");
        }
    }

    async noticeAdminMessageList(body: any, token: any): Promise<object> {
        try {
            let noticeUserMessage = await this.noticeRepository.noticeAdminMessageList(body, token);
            const [list, total] = Object.values(noticeUserMessage);

            return handleSend({list, total});
        } catch (error) {
            return handleError("[Service] noticeAdminMessageList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }

    async noticeAdminMessageUpsert(noticeAdminMessageUpsertDto: NoticeAdminMessageUpsertDto, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeAdminMessageUpsert(noticeAdminMessageUpsertDto, token);
            return handleSend([], "쪽지가 전송됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeAdminMessageUpsert", error, "오류가 발생했습니다.");
        }
    }

    async noticeAdminMessageDelete(body: any, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeAdminMessageDelete(body, token);
            return handleSend([], "삭제됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeAdminMessageDelete", error, "오류가 발생했습니다.");
        }
    }

    async noticeAdminMessageTemplateList(body: any, token: any): Promise<object> {
        try {
            let noticeUserMessageTemplate = await this.noticeRepository.noticeAdminMessageTemplateList(body, token);
            const [list, total] = Object.values(noticeUserMessageTemplate);

            return handleSend({list, total});
        } catch (error) {
            return handleError("[Service] noticeAdminMessageTemplateList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }

    async noticeAdminMessageTemplateUpsert(noticeMessageTemplateUpsertDto: NoticeMessageTemplateUpsertDto, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeAdminMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token);
            return handleSend([], "등록됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeAdminMessageTemplateUpsert", error, "오류가 발생했습니다.");
        }
    }

    async noticeAdminMessageTemplateDelete(body: any, token: any): Promise<object> {
        try {
            await this.noticeRepository.noticeAdminMessageTemplateDelete(body, token);
            return handleSend([], "삭제됐습니다.");
        } catch (error) {
            return handleError("[Service] noticeAdminMessageTemplateDelete", error, "오류가 발생했습니다.");
        }
    }
}