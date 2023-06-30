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
exports.LogAdminSignin = void 0;
const typeorm_1 = require("typeorm");
const site_entity_1 = require("../../site/entity/site.entity");
const admin_entity_1 = require("../../admin/entity/admin.entity");
let LogAdminSignin = class LogAdminSignin {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LogAdminSignin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => site_entity_1.Site, site => site.id),
    (0, typeorm_1.JoinColumn)({ name: "site_id" }),
    __metadata("design:type", Number)
], LogAdminSignin.prototype, "siteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => admin_entity_1.Admin, admin => admin.id),
    (0, typeorm_1.JoinColumn)({ name: "admin_id" }),
    __metadata("design:type", Number)
], LogAdminSignin.prototype, "adminId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 45 }),
    __metadata("design:type", String)
], LogAdminSignin.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LogAdminSignin.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LogAdminSignin.prototype, "createdAt", void 0);
LogAdminSignin = __decorate([
    (0, typeorm_1.Entity)({ name: 'log_admin_signin' }),
    (0, typeorm_1.Unique)(['id'])
], LogAdminSignin);
exports.LogAdminSignin = LogAdminSignin;
//# sourceMappingURL=log-admin-signin.entity.js.map