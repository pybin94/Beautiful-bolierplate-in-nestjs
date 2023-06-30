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
exports.IPBlockMiddleware = void 0;
const site_repository_1 = require("../site/site.repository");
const common_1 = require("@nestjs/common");
const log_tools_config_1 = require("../config/log.tools.config");
let IPBlockMiddleware = class IPBlockMiddleware {
    constructor(siteRepository) {
        this.siteRepository = siteRepository;
    }
    async use(req, res, next) {
        try {
            const checkEnabledWhitelist = await this.siteRepository.siteInfo(req);
            const clientIP = req.ip;
            let getIPs;
            let IPs = [];
            checkEnabledWhitelist["isEnabledWhitelist"] == 0
                ? getIPs = await this.siteRepository.blacklist(req)
                : getIPs = await this.siteRepository.whitelist(req);
            const [list, total] = getIPs;
            list.forEach((item) => {
                IPs = [...IPs, item["ip"]];
            });
            if (checkEnabledWhitelist["isEnabledWhitelist"] == 0) {
                if (IPs.includes(clientIP)) {
                    return (0, log_tools_config_1.handleError)("[Middleware] IPBlockMiddleware", [], `아이피가 차단돼있습니다. 관리자에게 문의주세요. \n 차단된 아이피[${clientIP}]`, -1);
                }
                next();
            }
            else {
                if (IPs.includes(clientIP)) {
                    next();
                }
                return (0, log_tools_config_1.handleError)("[Middleware] IPBlockMiddleware", [], `아이피가 차단돼있습니다. 관리자에게 문의주세요. \n 차단된 아이피[${clientIP}]`, -1);
            }
        }
        catch (error) {
            (0, log_tools_config_1.handleError)("[Middleware] IPBlockMiddleware", error, "오류가 발생했습니다.");
        }
    }
};
IPBlockMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [site_repository_1.SiteRepository])
], IPBlockMiddleware);
exports.IPBlockMiddleware = IPBlockMiddleware;
//# sourceMappingURL=IP-block.middleware.js.map