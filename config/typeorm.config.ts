import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'dax12345',
    database: 'almoxarifado',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true

}