import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { IPBlockMiddleware } from './middleware/IP-block.middleware';
export declare class AppModule implements NestModule {
    private readonly ipBlockMiddleware;
    constructor(ipBlockMiddleware: IPBlockMiddleware);
    configure(consumer: MiddlewareConsumer): void;
}
