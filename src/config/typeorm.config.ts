import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: 5432,
    username: 'postgres',
    password: '19931993n',
    database: 'todo',
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: true,
};
