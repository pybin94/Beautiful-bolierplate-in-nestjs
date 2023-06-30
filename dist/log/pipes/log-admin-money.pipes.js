"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogAdminMoneyPipes = void 0;
const common_1 = require("@nestjs/common");
const log_admin_money_entity_1 = require("../entity/log-admin-money.entity");
class LogAdminMoneyPipes {
    constructor() {
        this.LogAdminMoneyPipesOptions = [
            log_admin_money_entity_1.LogAdminMoney[1],
            log_admin_money_entity_1.LogAdminMoney[2],
            log_admin_money_entity_1.LogAdminMoney[3],
            log_admin_money_entity_1.LogAdminMoney[4],
            log_admin_money_entity_1.LogAdminMoney[5],
            log_admin_money_entity_1.LogAdminMoney[6],
        ];
    }
    transform(value, metadata) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`${value} isn't in the status options`);
        }
        return value;
    }
    isStatusValid(status) {
        const index = this.LogAdminMoneyPipesOptions.indexOf(status);
        return index !== -1;
    }
}
exports.LogAdminMoneyPipes = LogAdminMoneyPipes;
//# sourceMappingURL=log-admin-money.pipes.js.map