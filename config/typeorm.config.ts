import { TypeOrmModuleOptions } from '@nestjs/typeorm'
require('dotenv').config()

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.host,
    port: 5432,
    username: process.env.user,
    password: process.env.password,
    database: process.env.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true

}