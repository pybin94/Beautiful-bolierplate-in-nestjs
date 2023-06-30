import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { Provider } from './entity/provider.entity';
import { ProviderThirdparty } from './entity/provider-thirdparty.entity';
import { ProviderThirdpartySite } from './entity/provider-thirdparty-site.entity';
import { SiteProvider } from 'src/site/entity/site-provider.entity';

@Injectable()
export class ProviderRepository {
    constructor(
        @InjectRepository(Provider)
        private readonly providerRepository: Repository<Provider>,
        @InjectRepository(ProviderThirdparty)
        private readonly providerThirdpartyRepository: Repository<ProviderThirdparty>,
        @InjectRepository(ProviderThirdpartySite)
        private readonly providerThirdpartySiteRepository: Repository<ProviderThirdpartySite>,
        @InjectRepository(SiteProvider)
        private readonly siteProviderRepository: Repository<SiteProvider>,
    ) {};

    async providers(body: any): Promise<any> {
        const provider = await this.providerRepository
            .createQueryBuilder("providerSite")
            .getMany();

        return provider;
    }

    async getSiteProvider(): Promise<any> {
        const provider = await this.siteProviderRepository
            .createQueryBuilder("providerSite")
            .leftJoinAndSelect("providerSite.providerId", "provider")
            .orderBy("provider.id")
            .getMany()

        return provider;
    }

    async upsertSiteProvider(body: any): Promise<any> {
        let {id, providerId, identity, password, prefix, token} = body;
        if (id) {
            const existingSiteProvider = await this.siteProviderRepository.findOne({where: {id}});
            existingSiteProvider.identity = identity;
            existingSiteProvider.password = password;
            existingSiteProvider.prefix = prefix;
            existingSiteProvider.token = token;

            await this.siteProviderRepository.save(existingSiteProvider);
        } else {
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
            .execute()
        }
        return;
    }

    async deleteSiteProvider(body: any): Promise<any> {
        let { id } = body;
        await this.siteProviderRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();

        return;
    }

    async thirdpartys(body: any): Promise<any> {
        let { providerId, type } = body;

        const queryBuilder = this.providerThirdpartyRepository
            .createQueryBuilder("providerThirdparty")
            .leftJoinAndSelect("providerThirdparty.providerId", "provider")
            .where('provider.id = :id', {id: providerId})

        if(type) queryBuilder.andWhere('providerThirdparty.type = :type', {type});

        const siteThirdpartys = await queryBuilder.getMany();
        return siteThirdpartys;
    }

    async getSiteThirdpartys(body: any): Promise<any> {
        let { limit, offset, type } = body;

        const queryBuilder = this.providerThirdpartySiteRepository
            .createQueryBuilder("providerThirdpartySite")
            .leftJoinAndSelect("providerThirdpartySite.providerThirdpartyId", "providerThirdparty")
            .leftJoinAndSelect("providerThirdparty.providerId", "provider")


        if(type) queryBuilder.where('providerThirdparty.type = :type', {type});

        const matchingValues = await queryBuilder.getMany();
        return matchingValues;
    }

    async upsertSiteThirdpartys(body: any): Promise<any> {
        let { thirdpartyStatus, thirdPartys } = body;
        if(thirdpartyStatus) {
            thirdpartyStatus.forEach(async (item: any)=>{
                const existingThridparty = await this.providerThirdpartySiteRepository.findOne({where: {id: item["id"]}});
                existingThridparty.status = item["status"];
    
                await this.providerThirdpartySiteRepository.save(existingThridparty);
            })

        } else {
            thirdPartys.forEach(async (item: number)=>{
                await this.providerThirdpartySiteRepository
                .createQueryBuilder()
                .insert()
                .values({
                    siteId: parseInt(process.env.SITE_ID),
                    providerThirdpartyId: item,
                })
                .execute();
            })
        }
        return;
    }

    async deleteSiteThirdpartys(body: any): Promise<any> {
        let { id } = body;
        await this.providerThirdpartySiteRepository.createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
            
        return;
    }
}