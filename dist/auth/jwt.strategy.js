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
exports.JwtStrategy = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_2 = require("@nestjs/typeorm");
const passport_jwt_1 = require("passport-jwt");
const admin_entity_1 = require("../admin/entity/admin.entity");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(repository) {
        super({
            secretOrKey: process.env.JWT_SECRET_KEY,
            ignoreExpiration: false,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()
        });
        this.repository = repository;
    }
    async validate(payload) {
        const admin = await this.repository.findOne(payload);
        if (!admin) {
            throw new common_1.UnauthorizedException();
        }
        return admin;
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map