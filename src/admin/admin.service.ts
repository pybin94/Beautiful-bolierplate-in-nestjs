import { SiteRepository } from './../site/site.repository';
import { Admin } from './entity/admin.entity';
import { AdminRepository } from './admin.repository';
import { Injectable } from '@nestjs/common';
import { handleError, handleSend } from 'src/config/log.tools.config';
import { DataSource, QueryRunner } from 'typeorm';
import { LogRepository } from 'src/log/log.repository';
import { Request } from 'express';

@Injectable()
export class AdminService {
    constructor(
        private readonly adminRepository: AdminRepository,
        private readonly siteRepository: SiteRepository,
        private readonly logRepository: LogRepository,
        private readonly datasource: DataSource,
    ) {}

    async admin(body: any, token: any): Promise<object> {
        try{
            const admin = await this.adminRepository.admin(body, token);
            return handleSend(admin)
        } catch (error) {
            return handleError("[Service] admin", error)
        }
    }

    async adminTree(body: any, token: any): Promise<object> {
        try{
            const adminTree = await this.adminRepository.adminTree(body, token);
            return handleSend(adminTree)
        } catch (error) {
            return handleError("[Service] adminTree", error)
        }
    }

    async checkAdminIdentity(body: any): Promise<object> {
        try{
            const duplicateCheck = await this.adminRepository.duplicateCheck(body, "identity");
            if (duplicateCheck.count > 0) {
                return handleError("[Service] checkAdminIdentity", [], "다른 아이디를 사용해주세요.");
            }
            return handleSend(duplicateCheck, "사용 가능한 아이디입니다.")
        } catch (error) {
            return handleError("[Service] checkAdminIdentity", error, "중복확인 오류")
        }
    }

    async checkAdminCode(body: any): Promise<object> {
        try{
            const duplicateCheck = await this.adminRepository.duplicateCheck(body, "code");
            if (duplicateCheck.count > 0) {
                return handleError("[Service] checkAdminCode", [], "다른 가입코드를 사용해주세요.");
            }
            return handleSend(duplicateCheck, "사용 가능한 가입코드입니다.")
        } catch (error) {
            return handleError("[Service] checkAdminCode", error, "중복확인 오류")
        }
    }

    async createAdmin(body: any, token: any, req: Request): Promise<object> {
        let queryRunner: QueryRunner;
        try {
            await this.adminRateValidator(body, token);
            queryRunner = this.datasource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const duplicateCheckIdentity = await this.adminRepository.duplicateCheck(body, "identity");
            if (duplicateCheckIdentity.count > 0 ) {
                return handleError("[Service] createAdmin", [], "플레이어 아이디가 존재합니다.");
            };

            body.topId = token.id;
            body.level = token.level+1;
            body.siteId = parseInt(process.env.SITE_ID);
            body.joinIp = req.ip
            const createAdmin = await this.adminRepository.createAdmin(body, queryRunner);
            body.adminId = createAdmin["id"];

            await this.adminRepository.createAdminCommitionRate(body, queryRunner);
            await queryRunner.commitTransaction();
            
            return handleSend();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return handleError("[Service] createAdmin", error, error);
        } finally {
            await queryRunner.release();
        }
    }

    async admins(body: any, token: any): Promise<object> {
        try {
            let admins = await this.adminRepository.admins(body, token);
            const [list, total] = Object.values(admins);
            return handleSend({list, total})
        } catch (error) {
            return handleError("[Service] admins", error)
        }
    }

    async updateAdmin(body: any, token: any): Promise<object> {
        try {
            await this.adminRateValidator(body, token)
            await this.adminRepository.updateAdmin(body)
            return handleSend([], "저장을 완료했습니다."); 
        } catch (error) {
            return handleError("[Service] updateUser", error,  error)
        }
    }

    async updateAdminPassword(body: any, token: Admin): Promise<object> {
        const updateAdminPassword =  await this.adminRepository.updateAdminPassword(body, token);
        return handleSend(updateAdminPassword, "비밀번호가 변경됐습니다."); 
    }

    async deleteAdmin(body: any): Promise<object> {
        try {
            const deleteAdmin = await this.adminRepository.deleteAdmin(body);
            return handleSend(deleteAdmin, "에이전트를 삭제했습니다."); 
        } catch (error) {
            return handleError("[Repository] deleteAdmin", error, error)
        }
    }

    async adminTop(body: any, token: any): Promise<object> {
        try {
            const daminTop = await this.adminRepository.adminTop(body);
            return handleSend(daminTop, "데이터를 성공적으로 가져왔습니다."); 
        } catch (error) {
            return handleError("[Repository] deleteAdmin", error)
        }
    }

    async adminTransaction(body: any, token: any): Promise<object> {
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
                    logData = await this.logRepository.adminMoneyLogUpdate(queryRunner, {
                        status,
                        logId,
                        memo,
                    });
                    await this.adminRepository.adminTransaction(queryRunner, {
                        paymentType: logData["transactionType"], 
                        status,
                        targetId: logData["toAdminId"]["id"],
                        amount: logData["money"]
                    })
                    break
                case 1:
                    if (!amount) {
                        return handleError("[Service] adminTransaction", [], "금액을 입력해주세요.")
                    }
                    message = "을 신청";

                    let target: any = await this.adminRepository.adminTransaction(queryRunner, {
                        paymentType, 
                        status,
                        targetId: token.id,
                        amount,
                    })

                    await this.logRepository.adminMoneyLog(queryRunner, {
                        fromId: token.level == 1 ? null : token.id,
                        toAdminId: token.id,
                        money: amount,
                        postBalance: target.balance,
                        status,
                        transactionType: paymentType,
                    });
                    break
                case 2:
                    message = " 신청을 대기";
                    logData = await this.logRepository.adminMoneyLogUpdate(queryRunner, {
                        status,
                        logId,
                        memo,
                    });
                    break
                case 3:
                    message = " 신청을 완료";

                    // 로그 데이터 변경
                    logData = await this.logRepository.adminMoneyLogUpdate(queryRunner, {
                        status,
                        logId,
                        memo,
                    });
                    // 사이트 머니 차감
                    let siteData = await this.siteRepository.sitePayment(queryRunner, logData["transactionType"], logData["money"])

                    // 에이전트 지급
                    await this.adminRepository.adminTransaction(queryRunner, {
                        paymentType: logData["transactionType"], 
                        status: 3,
                        targetId: logData["toAdminId"]["id"],
                        logId,
                        amount: logData["money"]
                    })
                    await this.logRepository.siteMoneyLog(queryRunner, {
                        toAdminId: logData["toAdminId"]["id"],
                        money: Number(logData["money"]),
                        postBalance: 
                            logData["transactionType"] == 1 
                            ? Number(siteData["balance"]) 
                            : Number(siteData["balance"]) + Number(logData["money"]),
                        type: 2,
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
            return handleError("[Service] adminTransaction", error, error)
        } finally {
            await queryRunner.release();
        }
    }
    
    async adminPayment(body: any, token: any): Promise<object> {
        const queryRunner = this.datasource.createQueryRunner()
        let { paymentType, targetId, amount, pointDetail, memo } = body;

        if (!amount) {
            return handleError("[Service] adminPayment", [], "금액을 입력해주세요.")
        }

        let title: string;
        let removeAmount: any;
        let addAmount: any;

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            switch (paymentType) {
                case 0: // 에이전트 머니 지급머니
                    title = "에이전트에게 머니를 성공적으로 지급했습니다.";
                    if(token.level == 1) {
                        removeAmount = await this.siteRepository.sitePayment(queryRunner, 1, amount)
                        await this.logRepository.siteMoneyLog(queryRunner, {
                            toAdminId: targetId,
                            money: amount,
                            postBalance: removeAmount.balance,
                            code: 35,
                            type: 2,
                            transactionType: 2,
                            memo,
                        })
                    } else {
                        removeAmount = await this.adminRepository.adminPayment(queryRunner, paymentType + 1, token.id, amount);
                        await this.logRepository.adminMoneyLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toAdminId: targetId,
                            money: amount,
                            postBalance: removeAmount.balance,
                            status: 3,
                            transactionType: 5,
                            memo,
                        });
                    }
                    
                    addAmount = await this.adminRepository.adminPayment(queryRunner, paymentType, targetId, amount);
                    if(token.level == 1 || token.level < addAmount.level) {
                        await this.logRepository.adminMoneyLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toAdminId: targetId,
                            money: amount,
                            postBalance: addAmount.balance,
                            status: 3,
                            transactionType: 3,
                            memo,
                        });

                    } else {
                        await queryRunner.rollbackTransaction();
                        return handleError("[Service] adminPayment(0)", [], "권한이 없습니다.")
                    }
                    break;

                case 1: // 에이전트 머니 회수
                    title = "에이전트에게 머니를 성공적으로 회수했습니다.";
                    removeAmount = await this.adminRepository.adminPayment(queryRunner, paymentType, targetId, amount);

                    if(token.level == 1 || token.level < removeAmount.level) {
                        await this.logRepository.adminMoneyLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toAdminId: targetId,
                            money: amount,
                            postBalance: removeAmount.balance,
                            status: 3,
                            transactionType: 4,
                            memo,
                        })
                    } else {
                        await queryRunner.rollbackTransaction();
                        return handleError("[Service] adminPayment(1)", [], "권한이 없습니다.")
                    }

                    if (token.level == 1) {
                        addAmount = await this.siteRepository.sitePayment(queryRunner, 0, amount)                
                        await this.logRepository.siteMoneyLog(queryRunner, {
                            toAdminId: targetId,
                            money: amount,
                            postBalance: addAmount.balance,
                            code: 36,
                            type: 2,
                            transactionType: 1,
                            memo,
                        })
                    } else {
                        addAmount = await this.adminRepository.adminPayment(queryRunner, paymentType - 1, token.id, amount);
                        await this.logRepository.adminMoneyLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toAdminId: targetId,
                            money: amount,
                            postBalance: addAmount.balance,
                            status: 3,
                            transactionType: 6,
                            memo,
                        })
                    }
                    break;

                case 2: // 에이전트 포인트 지급
                    title = "에이전트에게 포인트를 성공적으로 지급했습니다.";
                    if (token.level !== 1) { 
                        removeAmount = await this.adminRepository.adminPayment(queryRunner, paymentType + 1, token.id, amount);
   
                        await this.logRepository.adminPointLog(queryRunner, {
                            fromId: token.id,
                            toAdminId: targetId,
                            point: amount,
                            postPoint: removeAmount.point,
                            type: pointDetail,
                            transactionType: 3,
                            memo,
                        })
                    };

                    addAmount = await this.adminRepository.adminPayment(queryRunner, paymentType, targetId, amount);

                    if(token.level == 1 || token.level < addAmount.level) {
                        await this.logRepository.adminPointLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toAdminId: targetId,
                            point: amount,
                            postPoint: addAmount.point,
                            type: pointDetail,
                            transactionType: 1,
                            memo,
                        })
                    } else {
                        await queryRunner.rollbackTransaction();
                        return handleError("[Service] adminPayment(2)", [], "권한이 없습니다.")
                    }
        
                    break;

                case 3: // 에이전트 포인트 회수
                    title = "에이전트에게 포인트를 성공적으로 회수했습니다.";
                    removeAmount = await this.adminRepository.adminPayment(queryRunner, paymentType, targetId, amount);

                    if(token.level == 1 || token.level < removeAmount.level) {
                        await this.logRepository.adminPointLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toAdminId: targetId,
                            point: amount,
                            postPoint: removeAmount.point,
                            type: 3,
                            transactionType: 2,
                            memo,
                        })
                    } else {
                        await queryRunner.rollbackTransaction();
                        return handleError("[Service] adminPayment(3)", [], "권한이 없습니다.")
                    }

                    if (token.level !== 1) { 
                        addAmount = await this.adminRepository.adminPayment(queryRunner, paymentType -1, token.id, amount);
                        await this.logRepository.adminPointLog(queryRunner, {
                            fromId: token.id,
                            toAdminId: targetId,
                            point: amount,
                            postPoint: addAmount.point,
                            type: 3,
                            transactionType: 4,
                            memo,
                        })
                    }
                    break;

                case 4: // 에이전트 포인트 전환
                    title = "포인트를 성공적으로 전환했습니다.";
                    let convertPoint: any;  // 포인트 전환
                    
                    removeAmount = await this.siteRepository.sitePayment(queryRunner, 1, amount);

                    await this.logRepository.siteMoneyLog(queryRunner, {
                        toAdminId: token.id,
                        money: Number(amount),
                        postBalance: Number(removeAmount.balance),
                        code: 39,
                        type: 2,
                        transactionType: 2,
                        memo,
                    })

                    convertPoint = await this.adminRepository.adminPayment(queryRunner, 4, token.id, amount);
                    await this.logRepository.adminPointLog(queryRunner, {
                        fromId: token.id,
                        toAdminId: token.id,
                        point: amount,
                        postPoint: convertPoint.point,
                        type: 3,
                        transactionType: 7,
                        memo,
                    })

                    await this.logRepository.adminMoneyLog(queryRunner, {
                        fromId: null,
                        toAdminId: token.id,
                        money: amount,
                        postBalance: convertPoint.balance,
                        status: 3,
                        transactionType: 5,
                        memo,
                    })
                    break;
            }

            await queryRunner.commitTransaction()
            return handleSend([], title);

        } catch (error) {
            await queryRunner.rollbackTransaction();
            return handleError("[Service] adminPayment", error)
        } finally {
            await queryRunner.release();
        }
    }

    async adminRateValidator(body: any, token: any){
        if(token.level <= 1){
            const siteInfo = await this.siteRepository.siteInfo(body);
            if(siteInfo["casinoRollingRateMax"] < body.casinoRollingRate) 
                throw "카지노 롤링이 사이트 설정 요율보다 큽니다.";
            if(siteInfo["casinoLosingRateMax"] < body.casinoLosingRate) 
                throw "카지노 루징이 사이트 설정 요율보다 큽니다."; 
            if(siteInfo["casinoOmittingRateMax"] < body.casinoOmittingRate) 
                throw "카지노 누락이 사이트 설정 요율보다 큽니다."; 
            if(siteInfo["slotRollingRateMax"] < body.slotRollingRate) 
                throw "카지노 롤링이 사이트 설정 요율보다 큽니다."; 
            if(siteInfo["slotLosingRateMax"] < body.slotLosingRate) 
                throw "카지노 루징이 사이트 설정 요율보다 큽니다."; 
            if(siteInfo["slotOmittingRateMax"] < body.slotOmittingRate) 
                throw "카지노 누락이 사이트 설정 요율보다 큽니다."; 
            if(siteInfo["minigameRollingRateMax"] < body.minigameRollingRate) 
                throw "카지노 롤링이 사이트 설정 요율보다 큽니다."; 
            if(siteInfo["minigameLosingRateMax"] < body.minigameLosingRate) 
                throw "카지노 루징이 사이트 설정 요율보다 큽니다."; 
            if(siteInfo["minigameOmittingRateMax"] < body.minigameOmittingRate) 
                throw "카지노 누락이 사이트 설정 요율보다 큽니다."; 
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
