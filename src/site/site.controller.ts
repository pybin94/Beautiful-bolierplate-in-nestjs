import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { SiteService } from './site.service';
import { Token } from 'src/user/user.decorator';
import { JwtAuthGuard } from 'src/gaurds/jwt-auth.gaurd';

@Controller('site')
@UseGuards(JwtAuthGuard)
export class SiteController {
    constructor( 
        private readonly siteService: SiteService
    ) {}

    @Get()
    async siteInfo(@Body() body: any, @Token(1) token: any): Promise<object> {
        const siteInfoResult = await this.siteService.siteInfo(body);
        return siteInfoResult;
    }

    @Patch()
    async siteInfoUpdate(@Body() body: any, @Token(1) token: any): Promise<object> {
        const siteInfoUpdateResult = await this.siteService.siteInfoUpdate(body);
        return siteInfoUpdateResult;
    }

    @Get("/bonus")
    async siteBonusLevel(@Body() body: any, @Token(1) token: any): Promise<object> {
        const siteBonusResult = await this.siteService.siteBonusLevel(body);
        return siteBonusResult;
    }

    @Patch("/bonus")
    async siteBonusLevelUpsert(@Body() body: any, @Token(1) token: any): Promise<object> {
        const siteBonusUpsertResult = await this.siteService.siteBonusLevelUpsert(body);
        return siteBonusUpsertResult;
    }

    @Patch("enabled-whitelist")
    async enabledWhitelist(@Body() body: any, @Token(1) token: any): Promise<object> {
        const enabledWhitelistResult = await this.siteService.enabledWhitelist(body, token);
        return enabledWhitelistResult;
    }

    @Post("blacklist")
    async blacklist(@Body() body: any, @Token() token: any): Promise<object> {
        const blacklistResult = await this.siteService.blacklist(body, token);
        return blacklistResult;
    }

    @Patch("blacklist")
    async blacklistInsert(@Body() body: any, @Token(1) token: any): Promise<object> {
        const blacklistInsertResult = await this.siteService.blacklistInsert(body, token);
        return blacklistInsertResult;
    }

    @Delete("blacklist")
    async blacklistDelete(@Body() body: any, @Token(1) token: any): Promise<object> {
        const blacklistDeleteResult = await this.siteService.blacklistDelete(body, token);
        return blacklistDeleteResult;
    }

    @Post("whitelist")
    async whitelist(@Body() body: any, @Token() token: any): Promise<object> {
        const whitelistResult = await this.siteService.whitelist(body, token);
        return whitelistResult;
    }

    @Patch("whitelist")
    async whitelistInsert(@Body() body: any, @Token(1) token: any): Promise<object> {
        const whitelistInsertResult = await this.siteService.whitelistInsert(body, token);
        return whitelistInsertResult;
    }

    @Delete("whitelist")
    async whitelistDelete(@Body() body: any, @Token(1) token: any): Promise<object> {
        const whitelistDeleteResult = await this.siteService.whitelistDelete(body, token);
        return whitelistDeleteResult;
    }
}
