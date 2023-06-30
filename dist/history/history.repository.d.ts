import { AdminRepository } from 'src/admin/admin.repository';
import { LogAdminMoney } from 'src/log/entity/log-admin-money.entity';
import { LogAdminPoint } from 'src/log/entity/log-admin-point.entity';
import { LogSiteMoney } from 'src/log/entity/log-site-money.entity';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';
import { LogUserPoint } from 'src/log/entity/log-user-point.entity';
import { LogUserThirdpartyMoney } from 'src/log/entity/log-user-thirdparty-money.entity';
import { UserRepository } from 'src/user/user.repository';
import { Repository } from 'typeorm';
export declare class HistoryRepository {
    private readonly logUserMoneyRepository;
    private readonly logUserPointRepository;
    private readonly logAdminMoneyRepository;
    private readonly logAdminPointRepository;
    private readonly logSiteMoneyRepository;
    private readonly logUserThirdpartyMoney;
    private readonly adminRepository;
    private readonly userRepository;
    constructor(logUserMoneyRepository: Repository<LogUserMoney>, logUserPointRepository: Repository<LogUserPoint>, logAdminMoneyRepository: Repository<LogAdminMoney>, logAdminPointRepository: Repository<LogAdminPoint>, logSiteMoneyRepository: Repository<LogSiteMoney>, logUserThirdpartyMoney: Repository<LogUserThirdpartyMoney>, adminRepository: AdminRepository, userRepository: UserRepository);
    userMoneyTransaction(body: any, token: any): Promise<object>;
    userPointTransaction(body: any, token: any): Promise<object>;
    adminMoneyTransaction(body: any, token: any): Promise<object>;
    adminPointTransaction(body: any, token: any): Promise<object>;
    siteMoneyTransaction(body: any): Promise<object>;
    userThirdpartyTransaction(body: any): Promise<object>;
}
