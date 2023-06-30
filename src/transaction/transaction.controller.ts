import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/gaurds/jwt-auth.gaurd';
import { Token } from 'src/user/user.decorator';
import { TransactionService } from './transaction.service';

@Controller('transaction')
@UseGuards(JwtAuthGuard)
export class TransactionController {
    constructor( 
        private readonly transactionService: TransactionService
    ) {}

    @Post('/user/deposit')
    async userDeposit(@Body() body: any, @Token() token: any): Promise<object> {
        const createAdminResult = await this.transactionService.userDeposit(body);
        return createAdminResult;
    }

    @Post('/user/withdrawal')
    async userWithdraw(@Body() body: any, @Token() token: any): Promise<object> {
        const createAdminResult = await this.transactionService.userWithdrawal(body);
        return createAdminResult;
    }

    @Post('/user/History')
    async user(@Body() body: any, @Token() token: any): Promise<object> {
        const createAdminResult = await this.transactionService.userHistory(body);
        return createAdminResult;
    }

    @Post('/admin/deposit')
    async adminDeposit(@Body() body: any, @Token() token: any): Promise<object> {
        const createAdminResult = await this.transactionService.adminDeposit(body);
        return createAdminResult;
    }

    @Get('/admin/deposit/alert')
    async adminDepositAlert(@Body() body: any, @Token() token: any): Promise<object> {
        const createAdminResult = await this.transactionService.adminDepositAlert(body);
        return createAdminResult;
    }

    @Post('/admin/withdrawal')
    async adminWithdrawal(@Body() body: any, @Token() token: any): Promise<object> {
        const createAdminResult = await this.transactionService.adminWithdrawal(body);
        return createAdminResult;
    }

    @Get('/admin/withdrawal/alert')
    async adminWithdrawalAlert(@Body() body: any, @Token() token: any): Promise<object> {
        const createAdminResult = await this.transactionService.adminWithdrawalAlert(body);
        return createAdminResult;
    }

    @Post('/admin/history')
    async admin(@Body() body: any, @Token() token: any): Promise<object> {
        const createAdminResult = await this.transactionService.adminHistory(body);
        return createAdminResult;
    }
}
