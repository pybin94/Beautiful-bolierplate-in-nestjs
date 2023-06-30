import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common"
import { LogAdminMoney } from "../entity/log-admin-money.entity";

export class LogAdminMoneyPipes implements PipeTransform {

    readonly LogAdminMoneyPipesOptions = [
        LogAdminMoney[1],
        LogAdminMoney[2],
        LogAdminMoney[3],
        LogAdminMoney[4],
        LogAdminMoney[5],
        LogAdminMoney[6],
    ]
    
    transform(value: any, metadata: ArgumentMetadata){
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`)
        }
        return value
    }

    private isStatusValid(status: any) {
        const index = this.LogAdminMoneyPipesOptions.indexOf(status)
        return index !== -1
    }
}
