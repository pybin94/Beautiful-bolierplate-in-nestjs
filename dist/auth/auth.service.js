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
exports.AuthService = void 0;
const log_tools_config_1 = require("../config/log.tools.config");
const auth_repository_1 = require("./auth.repository");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sign_helper_1 = require("../helper/sign.helper");
let AuthService = class AuthService {
    constructor(authRepository, jwtService, sign) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.sign = sign;
    }
    async signIn(authCredentialsDto, res, req) {
        const { identity, password } = authCredentialsDto;
        if (!identity || !password) {
            return false;
        }
        try {
            const admin = await this.authRepository.checkAdmin(authCredentialsDto, req);
            if (password === admin.password) {
                const payload = { id: admin.id, identity, nickname: admin.nickname, level: admin.level };
                const accessToken = this.jwtService.sign(payload);
                const authValue = {
                    identity: admin.identity,
                    nickname: admin.nickname,
                };
                await this.sign.in(res, accessToken);
                return authValue;
            }
            else {
                return false;
            }
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Service] signIn", error);
            return false;
        }
    }
    async signOut(res) {
        try {
            await this.sign.out(res);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] signOut", error);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_1.JwtService,
        sign_helper_1.Sign])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map