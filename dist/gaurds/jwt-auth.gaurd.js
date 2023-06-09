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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(ctx) {
        const request = ctx.switchToHttp().getRequest();
        const token = request.cookies['adminJwt'];
        try {
            if (!token)
                throw Error;
            const decoded = await this.jwtService.verifyAsync(token);
            request.token = decoded;
            return true;
        }
        catch (error) {
            const response = ctx.switchToHttp().getResponse();
            await response.cookie("adminJwt", null, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                domain: process.env.CLIENT_DOMAIN && "localhost",
                path: '/',
                maxAge: 0
            });
            await response.cookie("adminInfo", null, {
                sameSite: "none",
                secure: true,
                domain: process.env.CLIENT_DOMAIN && "localhost",
                path: '/',
                maxAge: 0
            });
            throw new common_1.UnauthorizedException('Unauthorized', '-2');
        }
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth.gaurd.js.map