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
exports.AuthController = void 0;
const log_tools_config_1 = require("../config/log.tools.config");
const auth_credential_dto_1 = require("./dto/auth-credential.dto");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(authCredentialsDto, res, req) {
        try {
            const signinResult = await this.authService.signIn(authCredentialsDto, res, req);
            if (authCredentialsDto.captcha == false)
                return (0, log_tools_config_1.handleError)("Slide Me를 밀어주세요.", []);
            let returnStatus;
            signinResult
                ? returnStatus = { status: 1, data: signinResult, message: "Login successful" }
                : returnStatus = { status: 0, message: "Login fail" };
            return returnStatus;
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("/signin", error);
        }
    }
    async signOut(res) {
        try {
            await this.authService.signOut(res);
            return { ststue: 1, message: "Logout successful" };
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("/signout", error);
        }
    }
};
__decorate([
    (0, common_1.Post)('/signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credential_dto_1.AuthCredentialsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)('/signout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map