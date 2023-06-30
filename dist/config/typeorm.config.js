"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.typeORMConfig = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    charset: 'utf8mb4',
    keepConnectionAlive: true,
    poolSize: 10,
    timezone: 'Asia/Seoul',
};
//# sourceMappingURL=typeorm.config.js.map