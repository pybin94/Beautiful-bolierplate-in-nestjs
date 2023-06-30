import { JwtAuthGuard } from '../gaurds/jwt-auth.gaurd';
import { Controller, UseGuards, Post, Body, Patch, Delete } from '@nestjs/common';
import { Token } from 'src/user/user.decorator';
import { HistoryService } from './history.service';

@Controller('history')
@UseGuards(JwtAuthGuard)
export class HistoryController {
    constructor( 
        private readonly historyService: HistoryService
    ) {}

    @Post('/money/user')
    async userMoneyTransaction(@Body() body: any, @Token() token: any): Promise<object> {
        const userMoneyTransactionResult = await this.historyService.userMoneyTransaction(body, token);
        return userMoneyTransactionResult;
    }

    @Post('/point/user')
    async userPointTransaction(@Body() body: any, @Token() token: any): Promise<object> {
        const userPointTransactionResult = await this.historyService.userPointTransaction(body, token);
        return userPointTransactionResult;
    }

    @Post('/money/admin')
    async adminMoneyTransaction(@Body() body: any, @Token() token: any): Promise<object> {
        const adminMoneyTransactionResult = await this.historyService.adminMoneyTransaction(body, token);
        return adminMoneyTransactionResult;
    }

    @Post('/point/admin')
    async adminPointTransaction(@Body() body: any, @Token() token: any): Promise<object> {
        const adminPointTransactionResult = await this.historyService.adminPointTransaction(body, token);
        return adminPointTransactionResult;
    }

    @Post('/money/site')
    async siteMoneyTransaction(@Body() body: any, @Token(1) token: any): Promise<object> {
        const siteMoneyTransactionResult = await this.historyService.siteMoneyTransaction(body);
        return siteMoneyTransactionResult;
    }

    @Post('/thirdparty')
    async userThirdpartyTransaction(@Body() body: any, @Token(1) token: any): Promise<object> {
        const userThirdpartyTransactionResult = await this.historyService.userThirdpartyTransaction(body);
        return userThirdpartyTransactionResult;
    }
}