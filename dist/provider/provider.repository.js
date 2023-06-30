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
exports.ProviderRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const provider_entity_1 = require("./entity/provider.entity");
const provider_thirdparty_entity_1 = require("./entity/provider-thirdparty.entity");
const provider_thirdparty_site_entity_1 = require("./entity/provider-thirdparty-site.entity");
const site_provider_entity_1 = require("../site/entity/site-provider.entity");
let ProviderRepository = class ProviderRepository {
    constructor(providerRepository, providerThirdpartyRepository, providerThirdpartySiteRepository, siteProviderRepository) {
        this.providerRepository = providerRepository;
        this.providerThirdpartyRepository = providerThirdpartyRepository;
        this.providerThirdpartySiteRepository = providerThirdpartySiteRepository;
        this.siteProviderRepository = siteProviderRepository;
    }
    ;
    async providers(body) {
        const provider = await this.providerRepository
            .createQueryBuilder("providerSite")
            .getMany();
        return provider;
    }
    async getSiteProvider() {
        const provider = await this.siteProviderRepository
            .createQueryBuilder("providerSite")
            .leftJoinAndSelect("providerSite.providerId", "provider")
            .orderBy("provider.id")
            .getMany();
        return provider;
    }
    async upsertSiteProvider(body) {
        let { id, providerId, identity, password, prefix, token } = body;
        if (id) {
            const existingSiteProvider = await this.siteProviderRepository.findOne({ where: { id } });
            existingSiteProvider.identity = identity;
            existingSiteProvider.password = password;
            existingSiteProvider.prefix = prefix;
            existingSiteProvider.token = token;
            await this.siteProviderRepository.save(existingSiteProvider);
        }
        else {
            await this.siteProviderRepository
                .createQueryBuilder()
                .insert()
                .values({
                siteId: parseInt(process.env.SITE_ID),
                providerId,
                identity,
                password,
                prefix,
                token,
            })
                .execute();
        }
        return;
    }
    async deleteSiteProvider(body) {
        let { id } = body;
        await this.siteProviderRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
        return;
    }
    async thirdpartys(body) {
        let { providerId, type } = body;
        const queryBuilder = this.providerThirdpartyRepository
            .createQueryBuilder("providerThirdparty")
            .leftJoinAndSelect("providerThirdparty.providerId", "provider")
            .where('provider.id = :id', { id: providerId });
        if (type)
            queryBuilder.andWhere('providerThirdparty.type = :type', { type });
        const siteThirdpartys = await queryBuilder.getMany();
        return siteThirdpartys;
    }
    async getSiteThirdpartys(body) {
        let { limit, offset, type } = body;
        const queryBuilder = this.providerThirdpartySiteRepository
            .createQueryBuilder("providerThirdpartySite")
            .leftJoinAndSelect("providerThirdpartySite.providerThirdpartyId", "providerThirdparty")
            .leftJoinAndSelect("providerThirdparty.providerId", "provider");
        if (type)
            queryBuilder.where('providerThirdparty.type = :type', { type });
        const matchingValues = await queryBuilder.getMany();
        return matchingValues;
    }
    async upsertSiteThirdpartys(body) {
        let { thirdpartyStatus, thirdPartys } = body;
        if (thirdpartyStatus) {
            thirdpartyStatus.forEach(async (item) => {
                const existingThridparty = await this.providerThirdpartySiteRepository.findOne({ where: { id: item["id"] } });
                existingThridparty.status = item["status"];
                await this.providerThirdpartySiteRepository.save(existingThridparty);
            });
        }
        else {
            thirdPartys.forEach(async (item) => {
                await this.providerThirdpartySiteRepository
                    .createQueryBuilder()
                    .insert()
                    .values({
                    siteId: parseInt(process.env.SITE_ID),
                    providerThirdpartyId: item,
                })
                    .execute();
            });
        }
        return;
    }
    async deleteSiteThirdpartys(body) {
        let { id } = body;
        await this.providerThirdpartySiteRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
        return;
    }
};
ProviderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(provider_entity_1.Provider)),
    __param(1, (0, typeorm_1.InjectRepository)(provider_thirdparty_entity_1.ProviderThirdparty)),
    __param(2, (0, typeorm_1.InjectRepository)(provider_thirdparty_site_entity_1.ProviderThirdpartySite)),
    __param(3, (0, typeorm_1.InjectRepository)(site_provider_entity_1.SiteProvider)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProviderRepository);
exports.ProviderRepository = ProviderRepository;
//# sourceMappingURL=provider.repository.js.map