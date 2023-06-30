import { handleError, handleSend } from 'src/config/log.tools.config';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { AdminRepository } from 'src/admin/admin.repository';
import { LogRepository } from 'src/log/log.repository';
import { SiteRepository } from 'src/site/site.repository';
import { Request } from 'express';
import { ProviderService } from 'src/provider/provider.service';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly siteRepository: SiteRepository,
        private readonly adminRepository: AdminRepository,
        private readonly logRepository: LogRepository,
        private readonly providerService: ProviderService,
        private readonly datasource: DataSource,
    ) {}

    async checkUserIdentity(body: any): Promise<object> {
        try{
            const duplicateCheckIdentity = await this.userRepository.duplicateCheck(body, parseInt(process.env.SITE_ID), "identity")
            if (duplicateCheckIdentity.count > 0 ) {
                return handleError("[Service] createUser", [], "다른 아이디를 사용해주세요.");
            }
            return handleSend(duplicateCheckIdentity, "사용 가능한 아이디입니다.")
        } catch (error) {
            return handleError("[Service] checkAdminIdentity", error, "중복확인 오류")
        }
    }

    async createUser(body: any, token: any, req: Request): Promise<object> {
        let queryRunner: QueryRunner;

        try {
            await this.userRateValidator(body, token)
            
            queryRunner = this.datasource.createQueryRunner()
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const duplicateCheckIdentity = await this.userRepository.duplicateCheck(body, parseInt(process.env.SITE_ID), "identity")
            if (duplicateCheckIdentity.count > 0 ) {
                return handleError("[Service] createUser", [], "다른 아이디를 사용해주세요.");
            }

            body.topId = token.id
            body.siteId = process.env.SITE_ID
            body.joinIp = req.ip

            const createUser = await this.userRepository.createUser(body, queryRunner);
            body.userId = createUser["id"]

            await this.userRepository.createUserCommitionRate(body, queryRunner);
            await queryRunner.commitTransaction()

            return handleSend()
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return handleError("[Service] createUser", error, error)
        } finally {
            await queryRunner.release();
        }
    }

    async users(body: any, token: any): Promise<object> {
        try {
            let users = await this.userRepository.users(body, token)
            const [list, total] = Object.values(users);

            return handleSend({list, total});
        } catch (error) {
            return handleError("[Service] users", error, "데이터 조회중 에러가 발생했습니다.")
        }
    }

    async updateUser(body: any, token: any): Promise<object> {
        try {
            await this.userRateValidator(body, token);
            await this.userRepository.updateUser(body);
            return handleSend([], "저장을 완료했습니다."); 

        } catch (error) {
            return handleError("[Service] updateUser", error, error)
        }
    }

    async updateUserPassword(body: any): Promise<object> {
        try {
            const updateUserPassword = await this.userRepository.updateUserPassword(body)
            return handleSend(updateUserPassword, "비밀번호가 변경됐습니다."); 
        } catch (error) {
            return handleError("[Service] updateUserPassword", error)
        }
    }

    async deleteUser(body: any): Promise<object> {
        try{
            const deleteUser =  await this.userRepository.deleteUser(body)
            return handleSend(deleteUser, "플레이어를 삭제했습니다."); 
        } catch (error) {
            return handleError("[Service] deleteUser", error)
        }
    }

    async userTransaction(body: any, token: any): Promise<object> {
        const queryRunner = this.datasource.createQueryRunner()
        let { paymentType, amount, logId, status, memo } = body;

        let message: string;
        let logData: any;
        let paymentTypeTitle: string;
        
        if(!status) {
            return handleError("[Service] adminTransaction", [], "상태를 설정해주세요.")
        }
        status = parseInt(status)
        
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            
            switch (status) {
                case 0:
                    message = " 신청을 취소";
                    logData = await this.logRepository.userMoneyLogUpdate(queryRunner, {
                        status,
                        logId,
                        memo,
                    });
                    await this.userRepository.userTransaction(queryRunner, {
                        paymentType: logData["transactionType"], 
                        status,
                        targetId: logData["toId"]["id"],
                        amount: logData["money"]
                    })
                    break
               
                // case 1: 신청은 플레이어 페이지
                case 2:
                    message = " 신청을 대기";
                    logData = await this.logRepository.userMoneyLogUpdate(queryRunner, {
                        status,
                        logId,
                        memo,
                    });
                    break

                case 3:
                    message = " 신청을 완료";
                    // 로그 데이터 변경
                    logData = await this.logRepository.userMoneyLogUpdate(queryRunner, {
                        status,
                        logId,
                        memo,
                    });
                    // 사이트 머니 차감
                    let siteData = await this.siteRepository.sitePayment(queryRunner, logData["transactionType"], logData["money"])

                    // 플레이어 지급
                    await this.userRepository.userTransaction(queryRunner, {
                        paymentType: logData["transactionType"], 
                        status: 3,
                        targetId: logData["toId"]["id"],
                        logId,
                        amount: logData["money"]
                    })
                    await this.logRepository.siteMoneyLog(queryRunner, {
                        toUserId: logData["toId"]["id"],
                        money: Number(logData["money"]),
                        postBalance: Number(siteData["balance"]),
                        type: 1,
                        transactionType: logData["transactionType"],
                        memo,
                    })
                    break
            } 
            await queryRunner.commitTransaction()

            paymentType
            ? paymentTypeTitle = paymentType == 1 ? "입금" : "출금"
            : paymentTypeTitle = logData["transactionType"] == 1 ? "입금" : "출금";

            return handleSend([], `${paymentTypeTitle}${message}했습니다.`);

        } catch (error) {
            await queryRunner.rollbackTransaction();
            return handleError("[Service] userTransaction", error)
        } finally {
            await queryRunner.release();
        }
    }
    
    async userPayment(body: any, token: any): Promise<object> {
        const queryRunner = this.datasource.createQueryRunner()
        let { paymentType, targetId, amount, pointDetail, memo } = body;

        if (!amount) {
            return handleError("[Service] userPayment", [], "금액을 입력해주세요.")
        }

        let title: string;
        let removeAmount: any;
        let addAmount: any;

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            switch (paymentType) {
                case 0: // 플레이어 머니 지급
                    title = "플레이어에게 머니를 성공적으로 지급했습니다.";
                    if(token.level == 1) {
                        removeAmount = await this.siteRepository.sitePayment(queryRunner, 1, amount)
                        await this.logRepository.siteMoneyLog(queryRunner, {
                            toUserId: targetId,
                            money: amount,
                            postBalance: removeAmount.balance,
                            code: 37,
                            type: 1,
                            transactionType: 2,
                            memo,
                        })
                    } else {
                        removeAmount = await this.adminRepository.adminPayment(queryRunner, paymentType + 1, token.id, amount);
                        await this.logRepository.adminMoneyLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toUserId: targetId,
                            money: amount,
                            postBalance: removeAmount.balance,
                            status: 3,
                            transactionType: 7,
                            memo,
                        });
                    }

                    addAmount = await this.userRepository.userPayment(queryRunner, paymentType, targetId, amount);

                    if(token.level == 1 || token.id == addAmount["user"].topId.id) {
                        await this.logRepository.userMoneyLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toId: targetId,
                            money: amount,
                            postBalance: addAmount["user"].balance,
                            status: 3,
                            transactionType: 3,
                            memo,
                        });
                    } else {
                        await queryRunner.rollbackTransaction();
                        return handleError("[Service] userPayment(1)", [], "권한이 없습니다.")
                    }
                    break;

                case 1: // 플레이어 머니 회수
                    title = "플레이어에게 머니를 성공적으로 회수했습니다.";

                    removeAmount = await this.userRepository.userPayment(queryRunner, paymentType, targetId, amount);

                    if(token.level == 1 || token.id == removeAmount["user"].topId.id) {
                        let providerBalance = await this.providerService.withdrawAllBalance(body)
                        if(parseInt(providerBalance["totalBalance"]) > 0) {
                            await this.logRepository.userThirdpartyLog(queryRunner, {
                                userId: body["targetId"],
                                providerThirdpartyId: null,
                                providerThirdpartyGameName: null,
                                userBalance: removeAmount["beforeBalance"],
                                providerBalance: providerBalance["totalBalance"],
                                totalBalance: parseInt(removeAmount["beforeBalance"]) + parseInt(providerBalance["totalBalance"]),
                                type: 2,
                            })
                        }

                        await this.logRepository.userMoneyLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toId: targetId,
                            money: amount,
                            postBalance: removeAmount["user"].balance,
                            status: 3,
                            transactionType: 4,
                            memo,
                        })

                        if (token.level == 1) {
                            addAmount = await this.siteRepository.sitePayment(queryRunner, 0, amount)
                            await this.logRepository.siteMoneyLog(queryRunner, {
                                toUserId: targetId,
                                money: amount,
                                postBalance: addAmount.balance,
                                code: 38,
                                type: 1,
                                transactionType: 1,
                                memo,
                            })
                        } else {
                            addAmount = await this.adminRepository.adminPayment(queryRunner, paymentType - 1, token.id, amount);
                            await this.logRepository.adminMoneyLog(queryRunner, {
                                fromId: token.level == 1 ? null : token.id,
                                toUserId: targetId,
                                money: amount,
                                postBalance: addAmount.balance,
                                status: 3,
                                transactionType: 8,
                                memo,
                            })
                        }

                    } else {
                        await queryRunner.rollbackTransaction();
                        return handleError("[Service] userPayment(2)", [], "권한이 없습니다.")
                    }
                    break;

                case 2: // 플레이어 포인트 지급
                    title = "플레이어에게 포인트를 성공적으로 회수했습니다.";
                    if (token.level !== 1) { 
                        removeAmount = await this.adminRepository.adminPayment(queryRunner, paymentType + 1, token.id, amount);

                        await this.logRepository.adminPointLog(queryRunner, {
                            fromId: token.id,
                            toUserId: targetId,
                            point: amount,
                            postPoint: removeAmount.point,
                            type: pointDetail,
                            transactionType: 5,
                            memo,
                        })
                    }

                    addAmount = await this.userRepository.userPayment(queryRunner, paymentType, targetId, amount);
                    if(token.level == 1 || token.id == addAmount["user"].topId.id) {
                        await this.logRepository.userPointLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toId: targetId,
                            point: amount,
                            postPoint: addAmount["user"].point,
                            type: pointDetail,
                            transactionType: 1,
                            memo,
                        })
                    } else {
                        await queryRunner.rollbackTransaction();
                        return handleError("[Service] userPayment(3)", [], "권한이 없습니다.")
                    }
                    break;
                case 3: // 플레이어 포인트 회수
                    title = "플레이어에게 포인트를 성공적으로 회수했습니다.";
                    removeAmount = await this.userRepository.userPayment(queryRunner, paymentType, targetId, amount);

                    if(token.level == 1 || token.id == removeAmount["user"].topId.id) {
                        await this.logRepository.userPointLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toId: targetId,
                            point: amount,
                            postPoint: removeAmount["user"].point,
                            type: 3,
                            transactionType: 2,
                            memo,
                        })
                    } else {
                        await queryRunner.rollbackTransaction();
                        return handleError("[Service] userPayment(4)", [], "권한이 없습니다.")
                    }

                    if (token.level !== 1) { 
                        addAmount = await this.adminRepository.adminPayment(queryRunner, paymentType - 1, token.id, amount);
                        await this.logRepository.adminPointLog(queryRunner, {
                            fromId: token.id,
                            toUserId: targetId,
                            point: amount,
                            postPoint: addAmount.point,
                            type: 3,
                            transactionType: 6,
                            memo,
                        })
                    }
                    break;
            }

            await queryRunner.commitTransaction()
            return handleSend([], title);

        } catch (error) {
            await queryRunner.rollbackTransaction();
            return handleError("[Service] userPayment error", error, error)
        } finally {
            await queryRunner.release();
        }
    }

    async userRateValidator (body: any, token: any) {
        if(token.level <= 1){
            const siteInfo = await this.siteRepository.siteInfo(body);
            if(siteInfo["casinoRollingRateMax"] < body.casinoRollingRate) 
                throw "카지노 롤링이 사이트 설정 요율보다 큽니다.";
            if(siteInfo["casinoLosingRateMax"] < body.casinoLosingRate) 
                throw "카지노 루징이 사이트 설정 요율보다 큽니다.";
            if(siteInfo["slotRollingRateMax"] < body.slotRollingRate) 
                throw "카지노 롤링이 사이트 설정 요율보다 큽니다.";
            if(siteInfo["slotLosingRateMax"] < body.slotLosingRate) 
                throw "카지노 루징이 사이트 설정 요율보다 큽니다.";
            if(siteInfo["minigameRollingRateMax"] < body.minigameRollingRate) 
                throw "카지노 롤링이 사이트 설정 요율보다 큽니다.";
            if(siteInfo["minigameLosingRateMax"] < body.minigameLosingRate) 
                throw "카지노 루징이 사이트 설정 요율보다 큽니다.";
        }

        if(token.level > 1){
            const myInfo = await this.adminRepository.admin(body, token);
            if(myInfo["adminCommissionRate"]["casinoRollingRate"] < body.casinoRollingRate) 
                throw "카지노 롤링이 상위요율보다 큽니다.";
            if(myInfo["adminCommissionRate"]["casinoLosingRate"] < body.casinoLosingRate) 
                throw "카지노 루징이 상위요율보다 큽니다.";
            if(myInfo["adminCommissionRate"]["slotRollingRate"] < body.slotRollingRate) 
                throw "카지노 롤링이 상위요율보다 큽니다.";
            if(myInfo["adminCommissionRate"]["slotLosingRate"] < body.slotLosingRate) 
                throw "카지노 루징이 상위요율보다 큽니다.";
            if(myInfo["adminCommissionRate"]["minigameRollingRate"] < body.minigameRollingRate) 
                throw "카지노 롤링이 상위요율보다 큽니다.";
            if(myInfo["adminCommissionRate"]["minigameLosingRate"] < body.minigameLosingRate) 
                throw "카지노 루징이 상위요율보다 큽니다.";
        }
    }
}