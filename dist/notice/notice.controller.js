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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeController = void 0;
const common_1 = require("@nestjs/common");
const notice_service_1 = require("./notice.service");
const jwt_auth_gaurd_1 = require("../gaurds/jwt-auth.gaurd");
const user_decorator_1 = require("../user/user.decorator");
const notice_admin_upsert_dto_1 = require("./dto/notice-admin-upsert.dto");
const notice_user_upsert_dto_1 = require("./dto/notice-user-upsert.dto");
const notice_popup_upsert_dto_1 = require("./dto/notice-popup-upsert.dto");
const notice_user_message_upsert_dto_1 = require("./dto/notice-user-message-upsert.dto");
const notice_message_template_upsert_dto_1 = require("./dto/notice-message-template-upsert.dto");
const notice_admin_message_upsert_dto_1 = require("./dto/notice-admin-message-upsert.dto");
let NoticeController = class NoticeController {
    constructor(noticeService) {
        this.noticeService = noticeService;
    }
    async noticePopupList(body, token) {
        const noticePopupListResult = await this.noticeService.noticePopupList(body, token);
        return noticePopupListResult;
    }
    async noticePopupUpsert(noticePopupUpsertDto, token) {
        const noticePopupUpsertResult = await this.noticeService.noticePopupUpsert(noticePopupUpsertDto, token);
        return noticePopupUpsertResult;
    }
    async noticePopupDelete(body, token) {
        const noticePopupDeleteResult = await this.noticeService.noticePopupDelete(body, token);
        return noticePopupDeleteResult;
    }
    async noticeUserList(body, token) {
        const noticeUserListResult = await this.noticeService.noticeUserList(body, token);
        return noticeUserListResult;
    }
    async noticeUserUpsert(NoticeUserUpsertDto, token) {
        const noticeUserUpsertResult = await this.noticeService.noticeUserUpsert(NoticeUserUpsertDto, token);
        return noticeUserUpsertResult;
    }
    async noticeUserDelete(body, token) {
        const noticeUserDeleteResult = await this.noticeService.noticeUserDelete(body, token);
        return noticeUserDeleteResult;
    }
    async noticeUserMessageList(body, token) {
        const noticeUserMessageListResult = await this.noticeService.noticeUserMessageList(body, token);
        return noticeUserMessageListResult;
    }
    async noticeUserMessageUpsert(noticeUserMessageUpsertDto, token) {
        const noticeUserMessageUpsertResult = await this.noticeService.noticeUserMessageUpsert(noticeUserMessageUpsertDto, token);
        return noticeUserMessageUpsertResult;
    }
    async noticeUserMessageDelete(body, token) {
        const noticeUserMessageDeleteResult = await this.noticeService.noticeUserMessageDelete(body, token);
        return noticeUserMessageDeleteResult;
    }
    async noticeUserMessageTemplateList(body, token) {
        const noticeUserMessageTemplateListResult = await this.noticeService.noticeUserMessageTemplateList(body, token);
        return noticeUserMessageTemplateListResult;
    }
    async noticeUserMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token) {
        const noticeUserMessageTemplateUpsertResult = await this.noticeService.noticeUserMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token);
        return noticeUserMessageTemplateUpsertResult;
    }
    async noticeUserMessageTemplateDelete(body, token) {
        const noticeUserMessageTemplateDeleteResult = await this.noticeService.noticeUserMessageTemplateDelete(body, token);
        return noticeUserMessageTemplateDeleteResult;
    }
    async noticeAdminList(body, token) {
        const noticeAdminListResult = await this.noticeService.noticeAdminList(body, token);
        return noticeAdminListResult;
    }
    async noticeAdminUpsert(noticeAdminUpsertDto, token) {
        const noticeAdminUpsertResult = await this.noticeService.noticeAdminUpsert(noticeAdminUpsertDto, token);
        return noticeAdminUpsertResult;
    }
    async noticeAdminDelete(body, token) {
        const noticeAdminDeleteResult = await this.noticeService.noticeAdminDelete(body, token);
        return noticeAdminDeleteResult;
    }
    async noticeAdminMessageList(body, token) {
        const noticeUserMessageListResult = await this.noticeService.noticeAdminMessageList(body, token);
        return noticeUserMessageListResult;
    }
    async noticeAdminMessageUpsert(noticeAdminMessageUpsertDto, token) {
        const noticeUserMessageUpsertResult = await this.noticeService.noticeAdminMessageUpsert(noticeAdminMessageUpsertDto, token);
        return noticeUserMessageUpsertResult;
    }
    async noticeAdminMessageDelete(body, token) {
        const noticeUserMessageDeleteResult = await this.noticeService.noticeAdminMessageDelete(body, token);
        return noticeUserMessageDeleteResult;
    }
    async noticeAdminMessageTemplateList(body, token) {
        const noticeUserMessageTemplateListResult = await this.noticeService.noticeAdminMessageTemplateList(body, token);
        return noticeUserMessageTemplateListResult;
    }
    async noticeAdminMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token) {
        const noticeUserMessageTemplateUpsertResult = await this.noticeService.noticeAdminMessageTemplateUpsert(noticeMessageTemplateUpsertDto, token);
        return noticeUserMessageTemplateUpsertResult;
    }
    async noticeAdminMessageTemplateDelete(body, token) {
        const noticeUserMessageTemplateDeleteResult = await this.noticeService.noticeAdminMessageTemplateDelete(body, token);
        return noticeUserMessageTemplateDeleteResult;
    }
};
__decorate([
    (0, common_1.Post)('/popup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticePopupList", null);
__decorate([
    (0, common_1.Patch)('/popup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_popup_upsert_dto_1.NoticePopupUpsertDto, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticePopupUpsert", null);
__decorate([
    (0, common_1.Delete)('/popup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticePopupDelete", null);
__decorate([
    (0, common_1.Post)('/user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeUserList", null);
__decorate([
    (0, common_1.Patch)('/user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_user_upsert_dto_1.NoticeUserUpsertDto, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeUserUpsert", null);
__decorate([
    (0, common_1.Delete)('/user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeUserDelete", null);
__decorate([
    (0, common_1.Post)('/user/message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeUserMessageList", null);
__decorate([
    (0, common_1.Patch)('/user/message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_user_message_upsert_dto_1.NoticeUserMessageUpsertDto, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeUserMessageUpsert", null);
__decorate([
    (0, common_1.Delete)('/user/message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeUserMessageDelete", null);
__decorate([
    (0, common_1.Post)('/user/message/template'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeUserMessageTemplateList", null);
__decorate([
    (0, common_1.Patch)('/user/message/template'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_message_template_upsert_dto_1.NoticeMessageTemplateUpsertDto, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeUserMessageTemplateUpsert", null);
__decorate([
    (0, common_1.Delete)('/user/message/template'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeUserMessageTemplateDelete", null);
__decorate([
    (0, common_1.Post)('/admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeAdminList", null);
__decorate([
    (0, common_1.Patch)('/admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_admin_upsert_dto_1.NoticeAdminUpsertDto, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeAdminUpsert", null);
__decorate([
    (0, common_1.Delete)('/admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeAdminDelete", null);
__decorate([
    (0, common_1.Post)('/admin/message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeAdminMessageList", null);
__decorate([
    (0, common_1.Patch)('/admin/message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_admin_message_upsert_dto_1.NoticeAdminMessageUpsertDto, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeAdminMessageUpsert", null);
__decorate([
    (0, common_1.Delete)('/admin/message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeAdminMessageDelete", null);
__decorate([
    (0, common_1.Post)('/admin/message/template'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeAdminMessageTemplateList", null);
__decorate([
    (0, common_1.Patch)('/admin/message/template'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_message_template_upsert_dto_1.NoticeMessageTemplateUpsertDto, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeAdminMessageTemplateUpsert", null);
__decorate([
    (0, common_1.Delete)('/admin/message/template'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "noticeAdminMessageTemplateDelete", null);
NoticeController = __decorate([
    (0, common_1.Controller)('notice'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    __metadata("design:paramtypes", [notice_service_1.NoticeService])
], NoticeController);
exports.NoticeController = NoticeController;
//# sourceMappingURL=notice.controller.js.map