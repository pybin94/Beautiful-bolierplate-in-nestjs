import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/gaurds/jwt-auth.gaurd';
import { ProviderService } from './provider.service';
import { Token } from 'src/user/user.decorator';

@Controller('provider')
@UseGuards(JwtAuthGuard)
export class ProviderController {
    constructor( 
        private readonly providerService: ProviderService 
    ) {}

    // Entity Api

    @Get('/providers')
    async providers(@Body() body: any, @Token(0) token: any): Promise<object> {
        const provider = await this.providerService.providers(body, token);
        return provider;
    }
    
    @Post('/thirdpartys')
    async thirdpartys(@Body() body: any, @Token(0) token: any): Promise<object> {
        const thirdParty = await this.providerService.thirdParty(body, token);
        return thirdParty;
    }

    @Get('/site')
    async getSiteProvider(@Body() body: any, @Token(0) token: any): Promise<object> {
        const provider = await this.providerService.getSiteProvider(body, token);
        return provider;
    }

    @Patch('/site')
    async upsertSiteProvider(@Body() body: any, @Token(0) token: any): Promise<object> {
        const provider = await this.providerService.upsertSiteProvider(body, token);
        return provider;
    }

    @Delete('/site')
    async deleteSiteProvider(@Body() body: any, @Token(0) token: any): Promise<object> {
        const provider = await this.providerService.deleteSiteProvider(body, token);
        return provider;
    }

    @Post('/site/thirdpartys')
    async getSiteThirdpartys(@Body() body: any, @Token(1) token: any): Promise<object> {
        const thirdParty = await this.providerService.getSiteThirdpartys(body, token);
        return thirdParty;
    }

    @Patch('/site/thirdpartys')
    async upsertSiteThirdpartys(@Body() body: any, @Token(1) token: any): Promise<object> {
        const thirdParty = await this.providerService.upsertSiteThirdpartys(body, token);
        return thirdParty;
    }

    @Delete('/site/thirdpartys')
    async deleteSiteThirdpartys(@Body() body: any, @Token(0) token: any): Promise<object> {
        const thirdParty = await this.providerService.deleteSiteThirdpartys(body, token);
        return thirdParty;
    }

    // Provider Api

    @Get('/user/create')
    async createUser(@Body() body: any, @Token() token: any): Promise<object> {
        const thirdParty = await this.providerService.createUser(body);
        return thirdParty;
    }

    @Post('/gamelists')
    async gamelists(@Body() body: any, @Token() token: any): Promise<object> {
        const gamelists = await this.providerService.gamelists(body, token);
        return gamelists;
    }

    @Get('/balance/partner')
    async partnerBalance(@Body() body: any, @Token() token: any): Promise<object> {
        const gamelists = await this.providerService.partnerBalance();
        return gamelists;
    }

    @Get('/balance/user')
    async userBalance(@Body() body: any, @Token() token: any): Promise<object> {
        const gamelists = await this.providerService.userBalance(token);
        return gamelists;
    }

    @Get('/balance/withdraw')
    async withdrawAllBalance(@Body() body: any, @Token() token: any): Promise<object> {
        const gamelists = await this.providerService.withdrawAllBalance(body);
        return gamelists;
    }
}
