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
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const history_repository_1 = require("./history.repository");
const log_tools_config_1 = require("../config/log.tools.config");
let HistoryService = class HistoryService {
    constructor(historyRepository) {
        this.historyRepository = historyRepository;
    }
    async userMoneyTransaction(body, token) {
        try {
            let userMoneyTransactionList = await this.historyRepository.userMoneyTransaction(body, token);
            const [list, total] = Object.values(userMoneyTransactionList);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Servie] userMoneyTransaction", error);
        }
    }
    async userPointTransaction(body, token) {
        try {
            let userPointTransactionList = await this.historyRepository.userPointTransaction(body, token);
            const [list, total] = Object.values(userPointTransactionList);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Servie] userPointTransaction", error);
        }
    }
    async adminMoneyTransaction(body, token) {
        try {
            let adminMoneyTransactionList = await this.historyRepository.adminMoneyTransaction(body, token);
            const [list, total] = Object.values(adminMoneyTransactionList);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Servie] adminMoneyTransaction", error);
        }
    }
    async adminPointTransaction(body, token) {
        try {
            let AdminPointTransactionList = await this.historyRepository.adminPointTransaction(body, token);
            const [list, total] = Object.values(AdminPointTransactionList);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Servie] adminPointTransaction", error);
        }
    }
    async siteMoneyTransaction(body) {
        try {
            let siteMoneyTransactionList = await this.historyRepository.siteMoneyTransaction(body);
            const [list, total] = Object.values(siteMoneyTransactionList);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Servie] siteMoneyTransaction", error);
        }
    }
    async userThirdpartyTransaction(body) {
        try {
            let userThirdpartyTransactionList = await this.historyRepository.userThirdpartyTransaction(body);
            const [list, total] = Object.values(userThirdpartyTransactionList);
            return (0, log_tools_config_1.handleSend)({ list, total });
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Servie] userThirdpartyTransaction", error);
        }
    }
};
HistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [history_repository_1.HistoryRepository])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map