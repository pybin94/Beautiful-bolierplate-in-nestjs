import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Brackets, QueryRunner, Repository } from "typeorm";
import { User } from './entity/user.entity';
import { UserCommissionRate } from './entity/user-commission-rate.entity';
import { LogUserMoney } from 'src/log/entity/log-user-money.entity';
import { Site } from 'src/site/entity/site.entity';
import { AdminRepository } from 'src/admin/admin.repository';
import { TransactionData } from 'src/admin/admin.model';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Site)
        private readonly siteRepository: Repository<Site>,

        @InjectRepository(UserCommissionRate)
        private readonly userCommissionRateRepository: Repository<UserCommissionRate>,

        @InjectRepository(LogUserMoney)
        private readonly logUserMoneyRepository: Repository<LogUserMoney>,

        private readonly adminRepository: AdminRepository,
    ) {};

    async duplicateCheck(body: any, siteId: number, checkColumn: string): Promise<{ count: number }> {
        let setWhere: object;
        if(checkColumn == "identity" && body[checkColumn]) {
            setWhere = {identity: body[checkColumn]}
        } else if (checkColumn == "code" && body[checkColumn]){
            setWhere = {code: body[checkColumn]}
        } else {
            return {count: 1}
        }
        const duplicateCheck = await this.userRepository.createQueryBuilder()
            .select('COUNT(*)', 'count')
            .where('user.site_id = :siteId', { siteId })
            .andWhere(setWhere)
            .getRawOne();

        return duplicateCheck
    }           

    async createUser(body: any, queryRunner: QueryRunner): Promise<object> {
        const user = this.userRepository.create(body);
        const userSave = await queryRunner.manager.save(user);
        return userSave;
    }

    async createUserCommitionRate(body: any, queryRunner: QueryRunner): Promise<void> {
        const userCommissionRate = this.userCommissionRateRepository.create(body);
        await queryRunner.manager.save(userCommissionRate);
    }

    async users(body: any, token: any): Promise<object> {
            let { limit, offset, searchValue, status } = body;
            let users: User[] | any[];
            let topIds = [];

            const admins = await this.adminRepository.admins({}, token)
            admins[0].forEach((item: object, index: number)=>{
                topIds = [...topIds, item["id"]]
            })

            if(!limit) {
                limit = 0
                offset = 0
            }

            const queryBuilder = this.userRepository.createQueryBuilder("user")
                .leftJoinAndSelect('user.topId', "admin")
                .leftJoinAndSelect(
                    'user.userCommissionRate',
                    'user_commission_rate',
                    'user.id = user_commission_rate.userId'
                )
                .leftJoinAndSelect(
                    'admin.adminCommissionRate',
                    'admin_commission_rate',
                    'admin.id = admin_commission_rate.adminId'
                )
                .where('user.top_id IN (:...ids)', { ids: [token.id, ...topIds]})
                .orderBy('user.createdAt', 'DESC')
                .skip(offset)
                .take(limit)
            
            if(status == true) {
                queryBuilder.andWhere('user.status <> 0')
            } else if (!status){
                queryBuilder.andWhere('user.status = 0')
            } else {
                queryBuilder.andWhere('user.status = :status', {status});
            }

            
            if(searchValue) {
                queryBuilder.andWhere(new Brackets(qb => {
                    qb.where("user.identity LIKE :identity", { identity: `%${searchValue}%` })
                        .orWhere("user.nickname LIKE :nickname", { nickname: `%${searchValue}%` })
                        .orWhere("admin.identity LIKE :identity", { identity: `%${searchValue}%` })
                }));
            }

            users = await queryBuilder.getManyAndCount();
            return users;
    }

    async updateUser(body: any): Promise<void> {
        let {id, bank, accountHolder, accountNumber, phoneNumber, bonusLevel, bettingLimitLevel, status, memo, casinoRollingRate, casinoLosingRate, slotRollingRate, slotLosingRate, minigameRollingRate, minigameLosingRate} = body;

        const queryBuilder = this.userRepository.createQueryBuilder("user")
            .update()
            .set({bank, accountHolder, accountNumber, phoneNumber, bonusLevel, bettingLimitLevel, memo})
            .where("user.id = :id", {id})

        if(status !== undefined){
            queryBuilder.set({status})
        }

        await queryBuilder.execute();

        await this.userCommissionRateRepository.createQueryBuilder()
            .update()
            .set({casinoRollingRate, casinoLosingRate, slotRollingRate, slotLosingRate, minigameRollingRate, minigameLosingRate})
            .where({userId: id})
            .execute();
    }

    async updateUserPassword(body: any): Promise<object> {

        let {id, password, passwordConfirm} = body;
        
        if (password !== passwordConfirm) {
            throw "비밀번호가 일치하지 않습니다."
        }

        const updateUser = await this.userRepository.createQueryBuilder("user")
            .update()
            .set({password})
            .where("id = :id", {id})
            .execute();

        return updateUser;
    }

    async deleteUser(body: any): Promise<object> {
        let { id } = body;
        const deleteUser = await this.userRepository.createQueryBuilder("user")
        .softDelete()
        // .restore()   // soft deleted된 플레이어 복구
        .where("id = :id", { id })
        .execute()

        return deleteUser;
    }

    async userTransaction(queryRunner: QueryRunner, transactionData: TransactionData ): Promise<object> {
        let target: any;
        switch (transactionData.status) {
            // paymentType - 입금(1), 출금(2)
            case 0: // 취소
                if(transactionData.paymentType == 1) {
                    target = await this.logUserMoneyRepository.findOne({where:{ id: transactionData.logId }});
                    target.status = transactionData.status

                } else if (transactionData.paymentType == 2) {
                    // 플레이어 머니 복구
                    target = await this.userRepository.findOne({where:{ id: transactionData.targetId }});
                    target.balance = Number(target.balance) + Number(transactionData["amount"]);
                }
                break;
                
            case 1: // 신청
                if(transactionData.paymentType == 2) {  
                    // 플레이어 머니 차감
                    target = await this.userRepository.findOne({where:{ id: transactionData.targetId }});
                    if (Number(target.balance) - Number(transactionData.amount) < 0) {
                        throw "보유 금액이 부족합니다.";
                    }
                    target.balance = Number(target.balance) - Number(transactionData.amount)
                }
                break;

            case 2: // 대기
                target = await this.logUserMoneyRepository.findOne({where:{ id: transactionData.logId }});
                target.status = transactionData.status
                break;

            case 3: // 완료
                if(transactionData.paymentType == 1) {   
                    // 플레이어 지급
                    target = await this.userRepository.findOne({where:{ id: transactionData.targetId }});
                    target.balance = Number(target.balance) + Number(transactionData["amount"]);

                } else if (transactionData.paymentType == 2) {
                    // 사이트 머니 증가
                    target = await this.siteRepository.findOne({where:{ id: parseInt(process.env.SITE_ID) }});
                    target.balance = Number(target.balance) + Number(transactionData["amount"]);
                }
                break;
        }
        if(target) {
            return await queryRunner.manager.save(target);
        } else {
            return [];
        }
    }

    async userPayment(queryRunner: QueryRunner, paymentType: number, targetId: number, amount: number): Promise<object> {
        const target = await this.userRepository.findOne({where:{ id: targetId }, relations: ['topId']});
        let beforeBalance = target["balance"]
        switch (paymentType) {
            case 0: // 머니 지급
                target.balance = Number(target.balance) + amount
                break;
            case 1: // 머니 회수
                if (Number(target.balance) - amount < 0) {
                    throw "지급 또는 회수할 금액이 부족합니다.";
                }
                target.balance = Number(target.balance) - amount
                break;
            case 2: // 포인트 지급
                target.point = Number(target.point) + amount
                break;
            case 3: // 포인트 회수
                if (Number(target.point) - amount < 0) {
                    throw "지급 또는 회수할 포인트가 부족합니다.";
                }
                target.point = Number(target.point) - amount
                break;
        }
        let user = await queryRunner.manager.save(target)
        return {user, beforeBalance};
    }
}