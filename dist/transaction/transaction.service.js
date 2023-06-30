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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const transaction_repository_1 = require("./transaction.repository");
const log_tools_config_1 = require("../config/log.tools.config");
let TransactionService = class TransactionService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async userDeposit(body) {
        try {
            const userDeposit = await this.transactionRepository.userTransaction(body, 1);
            const [list, total] = Object.values(userDeposit);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] userDeposit", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }
    async userWithdrawal(body) {
        try {
            const userWithdrawal = await this.transactionRepository.userTransaction(body, 2);
            const [list, total] = Object.values(userWithdrawal);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] userDeposit", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }
    async userHistory(body) {
        try {
            const userHistory = await this.transactionRepository.userTransactionHistory(body);
            const [list, total] = Object.values(userHistory);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] userHistory", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }
    async adminDeposit(body) {
        try {
            const adminDeposit = await this.transactionRepository.adminTransaction(body, 1);
            const [list, total] = Object.values(adminDeposit);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] userDeposit", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }
    async adminWithdrawal(body) {
        try {
            const adminWithdrawal = await this.transactionRepository.adminTransaction(body, 2);
            const [list, total] = Object.values(adminWithdrawal);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] adminWithdrawal", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }
    async adminHistory(body) {
        try {
            const adminHistory = await this.transactionRepository.adminTransactionHistory(body);
            const [list, total] = Object.values(adminHistory);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] adminHistory", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }
    async userDepositAlert(body) {
        try {
            const adminDepositAlert = await this.transactionRepository.adminTransactionAlert(body, 1);
            const [list, total] = Object.values(adminDepositAlert);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] adminDepositAlert", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }
    async userWithdrawalAlert(body) {
        try {
            const adminWithdrawalAlert = await this.transactionRepository.adminTransactionAlert(body, 2);
            const [list, total] = Object.values(adminWithdrawalAlert);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] adminWithdrawalAlert", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }
    async adminDepositAlert(body) {
        try {
            const adminDepositAlert = await this.transactionRepository.adminTransactionAlert(body, 1);
            const [list, total] = Object.values(adminDepositAlert);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] adminDepositAlert", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }
    async adminWithdrawalAlert(body) {
        try {
            const adminWithdrawalAlert = await this.transactionRepository.adminTransactionAlert(body, 2);
            const [list, total] = Object.values(adminWithdrawalAlert);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            return (0, log_tools_config_1.handleError)("[Service] adminWithdrawalAlert", error, "데이터를 가져오던중 문제가 생겼습니다.");
        }
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_repository_1.TransactionRepository])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map