import { TypeOrmModuleOptions } from '@nestjs/typeorm'
require('dotenv').config()

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DBHOST,
    port: 5432,
    username: process.env.USUARIO,
    password: process.env.SENHA,
    database: process.env.DATABASE,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true

}