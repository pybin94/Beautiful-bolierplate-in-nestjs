"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv_1 = require("dotenv");
const cookieParser = require("cookie-parser");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin', 'x-csrf-token'],
        origin: [`http://${process.env.CLIENT_DOMAIN}`, `https://${process.env.CLIENT_DOMAIN}`],
        credentials: true,
    });
    app.use(cookieParser());
    await app.listen(process.env.PORT || 4000);
};
(0, dotenv_1.config)();
bootstrap();
//# sourceMappingURL=main.js.map