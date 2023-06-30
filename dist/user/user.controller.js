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
exports.UserController = void 0;
const jwt_auth_gaurd_1 = require("../gaurds/jwt-auth.gaurd");
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("./user.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async checkAdminIdentity(body) {
        const checkAdminIdentityResult = await this.userService.checkUserIdentity(body);
        return checkAdminIdentityResult;
    }
    async createUser(body, token, req) {
        const createUserResult = await this.userService.createUser(body, token, req);
        return createUserResult;
    }
    async users(body, token) {
        const usersResult = await this.userService.users(body, token);
        return usersResult;
    }
    async updateUser(body, token) {
        const updateResult = await this.userService.updateUser(body, token);
        return updateResult;
    }
    async updateUserPassword(body) {
        const updateResult = await this.userService.updateUserPassword(body);
        return updateResult;
    }
    async deleteUser(body) {
        const deleteResult = await this.userService.deleteUser(body);
        return deleteResult;
    }
    async transaction(body, token) {
        const adminPaymentResult = await this.userService.userTransaction(body, token);
        return adminPaymentResult;
    }
    async payment(body, token) {
        const adminPaymentResult = await this.userService.userPayment(body, token);
        return adminPaymentResult;
    }
};
__decorate([
    (0, common_1.Post)('/check/identity'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkAdminIdentity", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/users'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "users", null);
__decorate([
    (0, common_1.Patch)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Patch)('/update/password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserPassword", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('/transaction'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "transaction", null);
__decorate([
    (0, common_1.Post)('/payment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "payment", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map