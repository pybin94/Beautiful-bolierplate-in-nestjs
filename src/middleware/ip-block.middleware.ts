import { SiteRepository } from '../site/site.repository';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { handleError } from 'src/config/log.tools.config';

@Injectable()
export class IPBlockMiddleware implements NestMiddleware {
    constructor(
        private readonly siteRepository: SiteRepository ,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {

        try {
            const checkEnabledWhitelist = await this.siteRepository.siteInfo(req)
            const clientIP = req.ip;
            let getIPs: any;
            let IPs: string[] = [];

            checkEnabledWhitelist["isEnabledWhitelist"] == 0
            ? getIPs = await this.siteRepository.blacklist(req)     // blacklisted
            : getIPs = await this.siteRepository.whitelist(req);    // whitlisted

            const [list, total] = getIPs;
            list.forEach((item: Array<string>) => {
                IPs = [...IPs, item["ip"]]
            });

            if(checkEnabledWhitelist["isEnabledWhitelist"] == 0) {
                if (IPs.includes(clientIP)) {
                    return handleError("[Middleware] IPBlockMiddleware", [], `아이피가 차단돼있습니다. 관리자에게 문의주세요. \n 차단된 아이피[${clientIP}]`, -1);
                }
                next();
            } else {
                if (IPs.includes(clientIP)) {
                    next();
                }
                return handleError("[Middleware] IPBlockMiddleware", [], `아이피가 차단돼있습니다. 관리자에게 문의주세요. \n 차단된 아이피[${clientIP}]`, -1);
            }
            
        } catch (error) {
            handleError("[Middleware] IPBlockMiddleware", error, "오류가 발생했습니다.");
        }
    }
}

