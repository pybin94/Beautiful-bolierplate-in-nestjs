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
exports.HistoryController = void 0;
const jwt_auth_gaurd_1 = require("../gaurds/jwt-auth.gaurd");
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../user/user.decorator");
const history_service_1 = require("./history.service");
let HistoryController = class HistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    async userMoneyTransaction(body, token) {
        const userMoneyTransactionResult = await this.historyService.userMoneyTransaction(body, token);
        return userMoneyTransactionResult;
    }
    async userPointTransaction(body, token) {
        const userPointTransactionResult = await this.historyService.userPointTransaction(body, token);
        return userPointTransactionResult;
    }
    async adminMoneyTransaction(body, token) {
        const adminMoneyTransactionResult = await this.historyService.adminMoneyTransaction(body, token);
        return adminMoneyTransactionResult;
    }
    async adminPointTransaction(body, token) {
        const adminPointTransactionResult = await this.historyService.adminPointTransaction(body, token);
        return adminPointTransactionResult;
    }
    async siteMoneyTransaction(body, token) {
        const siteMoneyTransactionResult = await this.historyService.siteMoneyTransaction(body);
        return siteMoneyTransactionResult;
    }
    async userThirdpartyTransaction(body, token) {
        const userThirdpartyTransactionResult = await this.historyService.userThirdpartyTransaction(body);
        return userThirdpartyTransactionResult;
    }
};
__decorate([
    (0, common_1.Post)('/money/user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "userMoneyTransaction", null);
__decorate([
    (0, common_1.Post)('/point/user'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "userPointTransaction", null);
__decorate([
    (0, common_1.Post)('/money/admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "adminMoneyTransaction", null);
__decorate([
    (0, common_1.Post)('/point/admin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "adminPointTransaction", null);
__decorate([
    (0, common_1.Post)('/money/site'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "siteMoneyTransaction", null);
__decorate([
    (0, common_1.Post)('/thirdparty'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)(1)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "userThirdpartyTransaction", null);
HistoryController = __decorate([
    (0, common_1.Controller)('history'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    __metadata("design:paramtypes", [history_service_1.HistoryService])
], HistoryController);
exports.HistoryController = HistoryController;
//# sourceMappingURL=history.controller.js.map