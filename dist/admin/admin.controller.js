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
exports.AdminController = void 0;
const admin_entity_1 = require("./entity/admin.entity");
const user_decorator_1 = require("./../user/user.decorator");
const jwt_auth_gaurd_1 = require("./../gaurds/jwt-auth.gaurd");
const admin_service_1 = require("./admin.service");
const common_1 = require("@nestjs/common");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async admin(body, token) {
        const adminResult = await this.adminService.admin(body, token);
        return adminResult;
    }
    async adminTree(body, token) {
        const adminTreeResult = await this.adminService.adminTree(body, token);
        return adminTreeResult;
    }
    async checkAdminIdentity(body) {
        const checkAdminIdentityResult = await this.adminService.checkAdminIdentity(body);
        return checkAdminIdentityResult;
    }
    async checkAdminCode(body) {
        const checkAdminCodeResult = await this.adminService.checkAdminCode(body);
        return checkAdminCodeResult;
    }
    async createAdmin(body, token, req) {
        const createAdminResult = await this.adminService.createAdmin(body, token, req);
        return createAdminResult;
    }
    async admins(body, token) {
        const adminsResult = await this.adminService.admins(body, token);
        return adminsResult;
    }
    async updateAdmin(body, token) {
        const updateAdminResult = await this.adminService.updateAdmin(body, token);
        return updateAdminResult;
    }
    async updateAdminPassword(body, token) {
        const updateAdminResult = await this.adminService.updateAdminPassword(body, token);
        return updateAdminResult;
    }
    async deleteAdmin(body) {
        const deleteAdminResult = await this.adminService.deleteAdmin(body);
        return deleteAdminResult;
    }
    async adminTop(body, token) {
        const adminTopResult = await this.adminService.adminTop(body, token);
        return adminTopResult;
    }
    async transaction(body, token) {
        const adminPaymentResult = await this.adminService.adminTransaction(body, token);
        return adminPaymentResult;
    }
    async payment(body, token) {
        const adminPaymentResult = await this.adminService.adminPayment(body, token);
        return adminPaymentResult;
    }
};
__decorate([
    (0, common_1.Post)("/"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "admin", null);
__decorate([
    (0, common_1.Get)('/tree'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminTree", null);
__decorate([
    (0, common_1.Post)('/check/identity'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "checkAdminIdentity", null);
__decorate([
    (0, common_1.Post)('/check/code'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "checkAdminCode", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Post)('/admins'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "admins", null);
__decorate([
    (0, common_1.Patch)('/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Patch)('/update/password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_entity_1.Admin]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdminPassword", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteAdmin", null);
__decorate([
    (0, common_1.Post)('/top'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminTop", null);
__decorate([
    (0, common_1.Post)('/transaction'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "transaction", null);
__decorate([
    (0, common_1.Post)('/payment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.Token)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "payment", null);
AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_gaurd_1.JwtAuthGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map