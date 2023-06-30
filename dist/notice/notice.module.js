"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeModule = void 0;
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const notice_service_1 = require("./notice.service");
const notice_controller_1 = require("./notice.controller");
const notice_user_entity_1 = require("./entity/notice-user.entity");
const notice_popup_entity_1 = require("./entity/notice-popup.entity");
const notice_message_user_entity_1 = require("./entity/notice-message-user.entity");
const notice_message_admin_entity_1 = require("./entity/notice-message-admin.entity");
const notice_admin_entity_1 = require("./entity/notice-admin.entity");
const notice_repository_1 = require("./notice.repository");
const notice_message_template_user_entity_1 = require("./entity/notice-message-template-user.entity");
const notice_message_template_admin_entity_1 = require("./entity/notice-message-template-admin.entity");
let NoticeModule = class NoticeModule {
};
NoticeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                notice_popup_entity_1.NoticePopup,
                notice_user_entity_1.NoticeUser,
                notice_admin_entity_1.NoticeAdmin,
                notice_message_user_entity_1.NoticeMessageUser,
                notice_message_admin_entity_1.NoticeMessageAdmin,
                notice_message_template_user_entity_1.NoticeMessageTemplateUser,
                notice_message_template_admin_entity_1.NoticeMessageTemplateAdmin,
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY,
                signOptions: {
                    expiresIn: parseInt(process.env.JWT_EXPIRES),
                }
            }),
        ],
        controllers: [notice_controller_1.NoticeController],
        providers: [notice_service_1.NoticeService, notice_repository_1.NoticeRepository],
    })
], NoticeModule);
exports.NoticeModule = NoticeModule;
//# sourceMappingURL=notice.module.js.map