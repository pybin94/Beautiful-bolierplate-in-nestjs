import { SiteRepository } from '../site/site.repository';
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class IPBlockMiddleware implements NestMiddleware {
    private readonly siteRepository;
    constructor(siteRepository: SiteRepository);
    use(req: Request, res: Response, next: NextFunction): Promise<object>;
}
