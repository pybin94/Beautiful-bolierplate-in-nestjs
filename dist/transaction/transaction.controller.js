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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_gaurd_1 = require("../gaurds/jwt-auth.gaurd");
const user_decorator_1 = require("../user/user.decorator");
const transaction_service_1 = require("./transaction.service");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async userDeposit(body, token) {
        const createAdminResult = await this.transactionService.userDeposit(body);
        return createAdminResult;
    }
    async userWithdraw(body, token) {
        const createAdminResult = await this.transactionService.userWithdrawal(body);
        return createAdminResult;
    }
    async user(body, token) {
        const createAdminResult = await this.transactionService.userHistory(body);
        return createAdminResult;
    }
    async adminDeposit(body, token) {
        const createAdminResult = await this.transactionService.adminDeposit(body);
        return createAdminResult;
    }
    async adminDepositAlert(body, token) {
        const createAdminResult = await this.transactionService.adminDepositAlert(body);
        return createAdminResult;
    }
    async adminWithdrawal(body, token) {
        const createAdminResult = await this.transactionService.adminWithdrawal(body);
        return createAdminResult;
    }
    async adminWithdrawalAlert(body, token) {
        const createAdminResult = await this.transactionService.adminWithdrawalAlert(body);
        return createAdminResult;
    }
    async admin(body, token) {
        const createAdminResult = await this.transactionService.adminHistory(body);
        return createAdminResult;
    }
};
__decorate([
    (0, common_1.Post)('/user/deposit'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "userDeposit", null);
__decorate([
    (0, common_1.Post)('/user/withdrawal'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "userWithdraw", null);
__decorate([
    (0, common_1.Post)('/user/History'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "user", null);
__decorate([
    (0, common_1.Post)('/admin/deposit'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "adminDeposit", null);
__decorate([
    (0, common_1.Get)('/admin/deposit/alert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "adminDepositAlert", null);
__decorate([
    (0, common_1.Post)('/admin/withdrawal'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "adminWithdrawal", null);
__decorate([
    (0, common_1.Get)('/admin/withdrawal/alert'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "adminWithdrawalAlert", null);
__decorate([
    (0, common_1.Post)('/admin/history'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "admin", null);
TransactionController = __decorate([
    (0, common_1.Controller)('transaction'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map