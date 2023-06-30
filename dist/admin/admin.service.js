"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const site_repository_1 = require("./../site/site.repository");
const admin_repository_1 = require("./admin.repository");
const common_1 = require("@nestjs/common");
const log_tools_config_1 = require("../config/log.tools.config");
const typeorm_1 = require("typeorm");
const log_repository_1 = require("../log/log.repository");
let AdminService = class AdminService {
    constructor(adminRepository, siteRepository, logRepository, datasource) {
        this.adminRepository = adminRepository;
        this.siteRepository = siteRepository;
        this.logRepository = logRepository;
        this.datasource = datasource;
    }
    async admin(body, token) {
        try {
            const admin = await this.adminRepository.admin(body, token);
            return (0, log_tools_config_1.handleSend)(admin);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] admin", error);
        }
    }
    async adminTree(body, token) {
        try {
            const adminTree = await this.adminRepository.adminTree(body, token);
            return (0, log_tools_config_1.handleSend)(adminTree);
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] adminTree", error);
        }
    }
    async checkAdminIdentity(body) {
        try {
            const duplicateCheck = await this.adminRepository.duplicateCheck(body, "identity");
            if (duplicateCheck.count > 0) {
                return (0, log_tools_config_1.handleError)("[Service] checkAdminIdentity", [], "다른 아이디를 사용해주세요.");
            }
            return (0, log_tools_config_1.handleSend)(duplicateCheck, "사용 가능한 아이디입니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] checkAdminIdentity", error, "중복확인 오류");
        }
    }
    async checkAdminCode(body) {
        try {
            const duplicateCheck = await this.adminRepository.duplicateCheck(body, "code");
            if (duplicateCheck.count > 0) {
                return (0, log_tools_config_1.handleError)("[Service] checkAdminCode", [], "다른 가입코드를 사용해주세요.");
            }
            return (0, log_tools_config_1.handleSend)(duplicateCheck, "사용 가능한 가입코드입니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] checkAdminCode", error, "중복확인 오류");
        }
    }
    async createAdmin(body, token, req) {
        let queryRunner;
        try {
            await this.adminRateValidator(body, token);
            queryRunner = this.datasource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const duplicateCheckIdentity = await this.adminRepository.duplicateCheck(body, "identity");
            if (duplicateCheckIdentity.count > 0) {
                return (0, log_tools_config_1.handleError)("[Service] createAdmin", [], "플레이어 아이디가 존재합니다.");
            }
            ;
            body.topId = token.id;
            body.level = token.level + 1;
            body.siteId = parseInt(process.env.SITE_ID);
            body.joinIp = req.ip;
            const createAdmin = await this.adminRepository.createAdmin(body, queryRunner);
            body.adminId = createAdmin["id"];
            await this.adminRepository.createAdminCommitionRate(body, queryRunner);
            await queryRunner.commitTransaction();
            return (0, log_tools_config_1.handleSend)();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            return (0, log_tools_config_1.handleError)("[Service] createAdmin", error, error);
        }
        finally {
            await queryRunner.release();
        }
    }
    async admins(body, token) {
        try {
            let admins = await this.adminRepository.admins(body, token);
            const [list, total] = Object.values(admins);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] admins", error);
        }
    }
    async updateAdmin(body, token) {
        try {
            await this.adminRateValidator(body, token);
            await this.adminRepository.updateAdmin(body);
            return (0, log_tools_config_1.handleSend)([], "저장을 완료했습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] updateUser", error, error);
        }
    }
    async updateAdminPassword(body, token) {
        const updateAdminPassword = await this.adminRepository.updateAdminPassword(body, token);
        return (0, log_tools_config_1.handleSend)(updateAdminPassword, "비밀번호가 변경됐습니다.");
    }
    async deleteAdmin(body) {
        try {
            const deleteAdmin = await this.adminRepository.deleteAdmin(body);
            return (0, log_tools_config_1.handleSend)(deleteAdmin, "에이전트를 삭제했습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Repository] deleteAdmin", error, error);
        }
    }
    async adminTop(body, token) {
        try {
            const daminTop = await this.adminRepository.adminTop(body);
            return (0, log_tools_config_1.handleSend)(daminTop, "데이터를 성공적으로 가져왔습니다.");
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Repository] deleteAdmin", error);
        }
    }
    async adminTransaction(body, token) {
        const queryRunner = this.datasource.createQueryRunner();
        let { paymentType, amount, logId, status, memo } = body;
        let message;
        let logData;
        let paymentTypeTitle;
        if (!status) {
            return (0, log_tools_config_1.handleError)("[Service] adminTransaction", [], "상태를 설정해주세요.");
        }
        status = parseInt(status);
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
                    });
                    break;
                case 1:
                    if (!amount) {
                        return (0, log_tools_config_1.handleError)("[Service] adminTransaction", [], "금액을 입력해주세요.");
                    }
                    message = "을 신청";
                    let target = await this.adminRepository.adminTransaction(queryRunner, {
                        paymentType,
                        status,
                        targetId: token.id,
                        amount,
                    });
                    await this.logRepository.adminMoneyLog(queryRunner, {
                        fromId: token.level == 1 ? null : token.id,
                        toAdminId: token.id,
                        money: amount,
                        postBalance: target.balance,
                        status,
                        transactionType: paymentType,
                    });
                    break;
                case 2:
                    message = " 신청을 대기";
                    logData = await this.logRepository.adminMoneyLogUpdate(queryRunner, {
                        status,
                        logId,
                        memo,
                    });
                    break;
                case 3:
                    message = " 신청을 완료";
                    logData = await this.logRepository.adminMoneyLogUpdate(queryRunner, {
                        status,
                        logId,
                        memo,
                    });
                    let siteData = await this.siteRepository.sitePayment(queryRunner, logData["transactionType"], logData["money"]);
                    await this.adminRepository.adminTransaction(queryRunner, {
                        paymentType: logData["transactionType"],
                        status: 3,
                        targetId: logData["toAdminId"]["id"],
                        logId,
                        amount: logData["money"]
                    });
                    await this.logRepository.siteMoneyLog(queryRunner, {
                        toAdminId: logData["toAdminId"]["id"],
                        money: Number(logData["money"]),
                        postBalance: logData["transactionType"] == 1
                            ? Number(siteData["balance"])
                            : Number(siteData["balance"]) + Number(logData["money"]),
                        type: 2,
                        transactionType: logData["transactionType"],
                        memo,
                    });
                    break;
            }
            await queryRunner.commitTransaction();
            paymentType
                ? paymentTypeTitle = paymentType == 1 ? "입금" : "출금"
                : paymentTypeTitle = logData["transactionType"] == 1 ? "입금" : "출금";
            return (0, log_tools_config_1.handleSend)([], `${paymentTypeTitle}${message}했습니다.`);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            return (0, log_tools_config_1.handleError)("[Service] adminTransaction", error, error);
        }
        finally {
            await queryRunner.release();
        }
    }
    async adminPayment(body, token) {
        const queryRunner = this.datasource.createQueryRunner();
        let { paymentType, targetId, amount, pointDetail, memo } = body;
        if (!amount) {
            return (0, log_tools_config_1.handleError)("[Service] adminPayment", [], "금액을 입력해주세요.");
        }
        let title;
        let removeAmount;
        let addAmount;
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            switch (paymentType) {
                case 0:
                    title = "에이전트에게 머니를 성공적으로 지급했습니다.";
                    if (token.level == 1) {
                        removeAmount = await this.siteRepository.sitePayment(queryRunner, 1, amount);
                        await this.logRepository.siteMoneyLog(queryRunner, {
                            toAdminId: targetId,
                            money: amount,
                            postBalance: removeAmount.balance,
                            code: 35,
                            type: 2,
                            transactionType: 2,
                            memo,
                        });
                    }
                    else {
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
                    if (token.level == 1 || token.level < addAmount.level) {
                        await this.logRepository.adminMoneyLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toAdminId: targetId,
                            money: amount,
                            postBalance: addAmount.balance,
                            status: 3,
                            transactionType: 3,
                            memo,
                        });
                    }
                    else {
                        await queryRunner.rollbackTransaction();
                        return (0, log_tools_config_1.handleError)("[Service] adminPayment(0)", [], "권한이 없습니다.");
                    }
                    break;
                case 1:
                    title = "에이전트에게 머니를 성공적으로 회수했습니다.";
                    removeAmount = await this.adminRepository.adminPayment(queryRunner, paymentType, targetId, amount);
                    if (token.level == 1 || token.level < removeAmount.level) {
                        await this.logRepository.adminMoneyLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toAdminId: targetId,
                            money: amount,
                            postBalance: removeAmount.balance,
                            status: 3,
                            transactionType: 4,
                            memo,
                        });
                    }
                    else {
                        await queryRunner.rollbackTransaction();
                        return (0, log_tools_config_1.handleError)("[Service] adminPayment(1)", [], "권한이 없습니다.");
                    }
                    if (token.level == 1) {
                        addAmount = await this.siteRepository.sitePayment(queryRunner, 0, amount);
                        await this.logRepository.siteMoneyLog(queryRunner, {
                            toAdminId: targetId,
                            money: amount,
                            postBalance: addAmount.balance,
                            code: 36,
                            type: 2,
                            transactionType: 1,
                            memo,
                        });
                    }
                    else {
                        addAmount = await this.adminRepository.adminPayment(queryRunner, paymentType - 1, token.id, amount);
                        await this.logRepository.adminMoneyLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toAdminId: targetId,
                            money: amount,
                            postBalance: addAmount.balance,
                            status: 3,
                            transactionType: 6,
                            memo,
                        });
                    }
                    break;
                case 2:
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
                        });
                    }
                    ;
                    addAmount = await this.adminRepository.adminPayment(queryRunner, paymentType, targetId, amount);
                    if (token.level == 1 || token.level < addAmount.level) {
                        await this.logRepository.adminPointLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toAdminId: targetId,
                            point: amount,
                            postPoint: addAmount.point,
                            type: pointDetail,
                            transactionType: 1,
                            memo,
                        });
                    }
                    else {
                        await queryRunner.rollbackTransaction();
                        return (0, log_tools_config_1.handleError)("[Service] adminPayment(2)", [], "권한이 없습니다.");
                    }
                    break;
                case 3:
                    title = "에이전트에게 포인트를 성공적으로 회수했습니다.";
                    removeAmount = await this.adminRepository.adminPayment(queryRunner, paymentType, targetId, amount);
                    if (token.level == 1 || token.level < removeAmount.level) {
                        await this.logRepository.adminPointLog(queryRunner, {
                            fromId: token.level == 1 ? null : token.id,
                            toAdminId: targetId,
                            point: amount,
                            postPoint: removeAmount.point,
                            type: 3,
                            transactionType: 2,
                            memo,
                        });
                    }
                    else {
                        await queryRunner.rollbackTransaction();
                        return (0, log_tools_config_1.handleError)("[Service] adminPayment(3)", [], "권한이 없습니다.");
                    }
                    if (token.level !== 1) {
                        addAmount = await this.adminRepository.adminPayment(queryRunner, paymentType - 1, token.id, amount);
                        await this.logRepository.adminPointLog(queryRunner, {
                            fromId: token.id,
                            toAdminId: targetId,
                            point: amount,
                            postPoint: addAmount.point,
                            type: 3,
                            transactionType: 4,
                            memo,
                        });
                    }
                    break;
                case 4:
                    title = "포인트를 성공적으로 전환했습니다.";
                    let convertPoint;
                    removeAmount = await this.siteRepository.sitePayment(queryRunner, 1, amount);
                    await this.logRepository.siteMoneyLog(queryRunner, {
                        toAdminId: token.id,
                        money: Number(amount),
                        postBalance: Number(removeAmount.balance),
                        code: 39,
                        type: 2,
                        transactionType: 2,
                        memo,
                    });
                    convertPoint = await this.adminRepository.adminPayment(queryRunner, 4, token.id, amount);
                    await this.logRepository.adminPointLog(queryRunner, {
                        fromId: token.id,
                        toAdminId: token.id,
                        point: amount,
                        postPoint: convertPoint.point,
                        type: 3,
                        transactionType: 7,
                        memo,
                    });
                    await this.logRepository.adminMoneyLog(queryRunner, {
                        fromId: null,
                        toAdminId: token.id,
                        money: amount,
                        postBalance: convertPoint.balance,
                        status: 3,
                        transactionType: 5,
                        memo,
                    });
                    break;
            }
            await queryRunner.commitTransaction();
            return (0, log_tools_config_1.handleSend)([], title);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            return (0, log_tools_config_1.handleError)("[Service] adminPayment", error);
        }
        finally {
            await queryRunner.release();
        }
    }
    async adminRateValidator(body, token) {
        if (token.level <= 1) {
            const siteInfo = await this.siteRepository.siteInfo(body);
            if (siteInfo["casinoRollingRateMax"] < body.casinoRollingRate)
                throw "카지노 롤링이 사이트 설정 요율보다 큽니다.";
            if (siteInfo["casinoLosingRateMax"] < body.casinoLosingRate)
                throw "카지노 루징이 사이트 설정 요율보다 큽니다.";
            if (siteInfo["casinoOmittingRateMax"] < body.casinoOmittingRate)
                throw "카지노 누락이 사이트 설정 요율보다 큽니다.";
            if (siteInfo["slotRollingRateMax"] < body.slotRollingRate)
                throw "카지노 롤링이 사이트 설정 요율보다 큽니다.";
            if (siteInfo["slotLosingRateMax"] < body.slotLosingRate)
                throw "카지노 루징이 사이트 설정 요율보다 큽니다.";
            if (siteInfo["slotOmittingRateMax"] < body.slotOmittingRate)
                throw "카지노 누락이 사이트 설정 요율보다 큽니다.";
            if (siteInfo["minigameRollingRateMax"] < body.minigameRollingRate)
                throw "카지노 롤링이 사이트 설정 요율보다 큽니다.";
            if (siteInfo["minigameLosingRateMax"] < body.minigameLosingRate)
                throw "카지노 루징이 사이트 설정 요율보다 큽니다.";
            if (siteInfo["minigameOmittingRateMax"] < body.minigameOmittingRate)
                throw "카지노 누락이 사이트 설정 요율보다 큽니다.";
        }
        if (token.level > 1) {
            const myInfo = await this.adminRepository.admin(body, token);
            if (myInfo["adminCommissionRate"]["casinoRollingRate"] < body.casinoRollingRate)
                throw "카지노 롤링이 상위요율보다 큽니다.";
            if (myInfo["adminCommissionRate"]["casinoLosingRate"] < body.casinoLosingRate)
                throw "카지노 루징이 상위요율보다 큽니다.";
            if (myInfo["adminCommissionRate"]["slotRollingRate"] < body.slotRollingRate)
                throw "카지노 롤링이 상위요율보다 큽니다.";
            if (myInfo["adminCommissionRate"]["slotLosingRate"] < body.slotLosingRate)
                throw "카지노 루징이 상위요율보다 큽니다.";
            if (myInfo["adminCommissionRate"]["minigameRollingRate"] < body.minigameRollingRate)
                throw "카지노 롤링이 상위요율보다 큽니다.";
            if (myInfo["adminCommissionRate"]["minigameLosingRate"] < body.minigameLosingRate)
                throw "카지노 루징이 상위요율보다 큽니다.";
        }
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository,
        site_repository_1.SiteRepository,
        log_repository_1.LogRepository,
        typeorm_1.DataSource])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map