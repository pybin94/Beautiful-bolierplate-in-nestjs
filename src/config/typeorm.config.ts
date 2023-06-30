import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import {config} from 'dotenv';
config()

export const typeORMConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    // logging: (process.env.NODE_ENV === 'development' ? ['query', 'schema'] : false),
    charset: 'utf8mb4',
    keepConnectionAlive: true,
    poolSize: 10,
    timezone: 'Asia/Seoul', 
}
