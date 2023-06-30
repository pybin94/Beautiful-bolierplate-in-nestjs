"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeService = void 0;
const common_1 = require("@nestjs/common");
const notice_repository_1 = require("./notice.repository");
const log_tools_config_1 = require("../config/log.tools.config");
let NoticeService = class NoticeService {
    constructor(noticeRepository) {
        this.noticeRepository = noticeRepository;
    }
    async noticePopupList(body, token) {
        try {
            let noticePopup = await this.noticeRepository.noticePopupList(body, token);
            const [list, total] = Object.values(noticePopup);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticePopupList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }
    async noticePopupUpsert(NoticePopupUpsertDto, token) {
        try {
            await this.noticeRepository.noticePopupUpsert(NoticePopupUpsertDto, token);
            return (0, log_tools_config_1.handleSend)([], "등록됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticePopupUpsert", error, "오류가 발생했습니다.");
        }
    }
    async noticePopupDelete(body, token) {
        try {
            await this.noticeRepository.noticePopupDelete(body, token);
            return (0, log_tools_config_1.handleSend)([], "삭제됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticePopupDelete", error, "오류가 발생했습니다.");
        }
    }
    async noticeUserList(body, token) {
        try {
            let noticeUser = await this.noticeRepository.noticeUserList(body, token);
            const [list, total] = Object.values(noticeUser["normal"]);
            return (0, log_tools_config_1.handleSend)({ fixed: noticeUser["fixed"], list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeUserList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }
    async noticeUserUpsert(noticeUserUpsertDto, token) {
        try {
            await this.noticeRepository.noticeUserUpsert(noticeUserUpsertDto, token);
            return (0, log_tools_config_1.handleSend)([], "등록됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeUserUpsert", error, "오류가 발생했습니다.");
        }
    }
    async noticeUserDelete(body, token) {
        try {
            await this.noticeRepository.noticeUserDelete(body, token);
            return (0, log_tools_config_1.handleSend)([], "삭제됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeUserDelete", error, "오류가 발생했습니다.");
        }
    }
    async noticeUserMessageList(body, token) {
        try {
            let noticeUserMessage = await this.noticeRepository.noticeUserMessageList(body, token);
            const [list, total] = Object.values(noticeUserMessage);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeUserMessageList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }
    async noticeUserMessageUpsert(noticeUserMessageUpsertDto, token) {
        try {
            await this.noticeRepository.noticeUserMessageUpsert(noticeUserMessageUpsertDto, token);
            return (0, log_tools_config_1.handleSend)([], "쪽지가 전송됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeUserMessageUpsert", error, "오류가 발생했습니다.");
        }
    }
    async noticeUserMessageDelete(body, token) {
        try {
            await this.noticeRepository.noticeUserMessageDelete(body, token);
            return (0, log_tools_config_1.handleSend)([], "삭제됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeUserMessageDelete", error, "오류가 발생했습니다.");
        }
    }
    async noticeUserMessageTemplateList(body, token) {
        try {
            let noticeUserMessageTemplate = await this.noticeRepository.noticeUserMessageTemplateList(body, token);
            const [list, total] = Object.values(noticeUserMessageTemplate);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeUserMessageTemplateList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }
    async noticeUserMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token) {
        try {
            await this.noticeRepository.noticeUserMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token);
            return (0, log_tools_config_1.handleSend)([], "등록됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeUserMessageTemplateUpsert", error, "오류가 발생했습니다.");
        }
    }
    async noticeUserMessageTemplateDelete(body, token) {
        try {
            await this.noticeRepository.noticeUserMessageTemplateDelete(body, token);
            return (0, log_tools_config_1.handleSend)([], "삭제됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeUserMessageTemplateDelete", error, "오류가 발생했습니다.");
        }
    }
    async noticeAdminList(body, token) {
        try {
            let noticeAdmin = await this.noticeRepository.noticeAdminList(body, token);
            const [list, total] = Object.values(noticeAdmin["normal"]);
            return (0, log_tools_config_1.handleSend)({ fixed: noticeAdmin["fixed"], list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeAdminList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }
    async noticeAdminUpsert(noticeAdminUpsertDto, token) {
        try {
            await this.noticeRepository.noticeAdminUpsert(noticeAdminUpsertDto, token);
            return (0, log_tools_config_1.handleSend)([], "쪽지가 전송됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeAdminUpsert", error, "오류가 발생했습니다.");
        }
    }
    async noticeAdminDelete(body, token) {
        try {
            await this.noticeRepository.noticeAdminDelete(body, token);
            return (0, log_tools_config_1.handleSend)([], "삭제됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeAdminDelete", error, "오류가 발생했습니다.");
        }
    }
    async noticeAdminMessageList(body, token) {
        try {
            let noticeUserMessage = await this.noticeRepository.noticeAdminMessageList(body, token);
            const [list, total] = Object.values(noticeUserMessage);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeAdminMessageList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }
    async noticeAdminMessageUpsert(noticeAdminMessageUpsertDto, token) {
        try {
            await this.noticeRepository.noticeAdminMessageUpsert(noticeAdminMessageUpsertDto, token);
            return (0, log_tools_config_1.handleSend)([], "쪽지가 전송됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeAdminMessageUpsert", error, "오류가 발생했습니다.");
        }
    }
    async noticeAdminMessageDelete(body, token) {
        try {
            await this.noticeRepository.noticeAdminMessageDelete(body, token);
            return (0, log_tools_config_1.handleSend)([], "삭제됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeAdminMessageDelete", error, "오류가 발생했습니다.");
        }
    }
    async noticeAdminMessageTemplateList(body, token) {
        try {
            let noticeUserMessageTemplate = await this.noticeRepository.noticeAdminMessageTemplateList(body, token);
            const [list, total] = Object.values(noticeUserMessageTemplate);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeAdminMessageTemplateList", error, "데이터 조회중 에러가 발생했습니다.");
        }
    }
    async noticeAdminMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token) {
        try {
            await this.noticeRepository.noticeAdminMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token);
            return (0, log_tools_config_1.handleSend)([], "등록됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeAdminMessageTemplateUpsert", error, "오류가 발생했습니다.");
        }
    }
    async noticeAdminMessageTemplateDelete(body, token) {
        try {
            await this.noticeRepository.noticeAdminMessageTemplateDelete(body, token);
            return (0, log_tools_config_1.handleSend)([], "삭제됐습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] noticeAdminMessageTemplateDelete", error, "오류가 발생했습니다.");
        }
    }
};
NoticeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notice_repository_1.NoticeRepository])
], NoticeService);
exports.NoticeService = NoticeService;
//# sourceMappingURL=notice.service.js.map