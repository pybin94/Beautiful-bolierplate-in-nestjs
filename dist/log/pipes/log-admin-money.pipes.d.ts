import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class LogAdminMoneyPipes implements PipeTransform {
    readonly LogAdminMoneyPipesOptions: any[];
    transform(value: any, metadata: ArgumentMetadata): any;
    private isStatusValid;
}
