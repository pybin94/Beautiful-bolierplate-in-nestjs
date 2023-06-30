import { Injectable } from '@nestjs/common';
import { handleError, handleSend } from 'src/config/log.tools.config';
import { SiteRepository } from './site.repository';

@Injectable()
export class SiteService {
    constructor(
        private readonly siteRepository: SiteRepository,
    ) {}

    async siteInfo(body: any): Promise<object> {
        try {
            let siteInfo = await this.siteRepository.siteInfo(body);
            return handleSend(siteInfo);
        } catch (error) {
            return handleError("[Service] siteInfo", error, "사이트 정보를 가져오는 중 에러가 발생했습니다.");
        }
    }

    async siteInfoUpdate(body: any): Promise<object> {
        try {
            let siteInfoUpdate = await this.siteRepository.siteInfoUpdate(body);
            return handleSend(siteInfoUpdate, "저장이 완료됐습니다.");
        } catch (error) {
            return handleError("[Service] siteInfoUpdate", error, "사이트 정보를 저장하는 중 에러가 발생했습니다.");
        }
    }

    async siteBonusLevel(body: any): Promise<object> {
        try {
            let siteBonus = await this.siteRepository.siteBonusLevel(body);
            return handleSend(siteBonus);
        } catch (error) {
            return handleError("[Service] siteBonus", error, "사이트 정보를 가져오는 중 에러가 발생했습니다.");
        }
    }

    async siteBonusLevelUpsert(body: any): Promise<object> {
        try {
            let siteBonusUpsert = await this.siteRepository.siteBonusLevelUpsert(body);
            return handleSend(siteBonusUpsert);
        } catch (error) {
            return handleError("[Service] siteBonusUpsert", error, "사이트 정보를 저장하는 중 에러가 발생했습니다.");
        }
    }

    async enabledWhitelist(body: any, token: any): Promise<object> {
        try {
            let enabledWhitelist = await this.siteRepository.enabledWhitelist(body, token);
            return handleSend(enabledWhitelist, "사이트 접근 상태를 변경했습니다.");
        } catch (error) {
            return handleError("[Service] enabledWhitelist", error, "화이트 리스트 상태 수정중 에러가 발생했습니다.");
        }
    }

    async blacklist(body: any, token: any): Promise<object> {
        try {
            let blacklist = await this.siteRepository.blacklist(body, token);
            const [list, total] = Object.values(blacklist);
            return handleSend({list, total});
        } catch (error) {
            return handleError("[Service] blacklist", error, "블랙 리스트를 가져오는 중 에러가 발생했습니다.");
        }
    }

    async blacklistInsert(body: any, token: any): Promise<object> {
        try {
            let blacklistInsert = await this.siteRepository.blacklistInsert(body, token);
            return handleSend(blacklistInsert, "블랙 아이피를 등록했습니다.");
        } catch (error) {
            return handleError("[Service] blacklistInsert", error, "블랙 리스트 등록 중 에러가 발생했습니다.");
        }
    }

    async blacklistDelete(body: any, token: any): Promise<object> {
        try {
            let blacklistDelete = await this.siteRepository.blacklistDelete(body, token);
            return handleSend(blacklistDelete, "블랙 아이피를 삭제했습니다.");
        } catch (error) {
            return handleError("[Service] blacklistDelete", error, "블랙 리스트 삭제 중 에러가 발생했습니다.");
        }
    }

    async whitelist(body: any, token: any): Promise<object> {
        try {
            let whitelist = await this.siteRepository.whitelist(body, token);
            const [list, total] = Object.values(whitelist);
            return handleSend({list, total});
        } catch (error) {
            return handleError("[Service] whitelist", error, "화이트 리스트를 가져오는 중 에러가 발생했습니다.");
        }
    }

    async whitelistInsert(body: any, token: any): Promise<object> {
        try {
            let whitelistInsert = await this.siteRepository.whitelistInsert(body, token);
            return handleSend(whitelistInsert, "화이트 아이피를 등록했습니다")
        } catch (error) {
            return handleError("[Service] whitelistInsert", error, "화이트 리스트 등록 중 에러가 발생했습니다.");
        }
    }

    async whitelistDelete(body: any, token: any): Promise<object> {
        try {
            let whitelistDelete = await this.siteRepository.whitelistDelete(body, token);
            return handleSend(whitelistDelete, "화이트 아이피를 삭제했습니다.");
        } catch (error) {
            return handleError("[Service] whitelistDelete", error, "화이트 리스트 삭제 중 에러가 발생했습니다.");
        }
    }

}
