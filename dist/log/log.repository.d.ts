import { QueryRunner, Repository } from "typeorm";
import { LogAdminMoney } from './entity/log-admin-money.entity';
import { LogAdminPoint } from './entity/log-admin-point.entity';
import { LogUserMoney } from './entity/log-user-money.entity';
import { LogUserPoint } from './entity/log-user-point.entity';
import { PointLog, MoneyLog, UpdateMoneyLog, SiteMoneyLog, ThirdpartyLog } from './log.model';
import { LogSiteMoney } from './entity/log-site-money.entity';
import { LogUserThirdpartyMoney } from './entity/log-user-thirdparty-money.entity';
export declare class LogRepository {
    private readonly LogUserMoneyRepository;
    private readonly LogAdminMoneyRepository;
    constructor(LogUserMoneyRepository: Repository<LogUserMoney>, LogAdminMoneyRepository: Repository<LogAdminMoney>);
    adminMoneyLog(queryRunner: QueryRunner, logData: MoneyLog): Promise<LogAdminMoney>;
    adminMoneyLogUpdate(queryRunner: QueryRunner, updateMoneyLog: UpdateMoneyLog): Promise<LogAdminMoney>;
    adminPointLog(queryRunner: QueryRunner, logData: PointLog): Promise<LogAdminPoint>;
    userMoneyLog(queryRunner: QueryRunner, logData: MoneyLog): Promise<LogUserMoney>;
    userMoneyLogUpdate(queryRunner: QueryRunner, updateMoneyLog: UpdateMoneyLog): Promise<LogUserMoney>;
    userPointLog(queryRunner: QueryRunner, logData: PointLog): Promise<LogUserPoint>;
    siteMoneyLog(queryRunner: QueryRunner, logData: SiteMoneyLog): Promise<LogSiteMoney>;
    userThirdpartyLog(queryRunner: QueryRunner, logData: ThirdpartyLog): Promise<LogUserThirdpartyMoney>;
}
