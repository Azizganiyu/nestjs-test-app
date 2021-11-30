import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const ormConfig: SqliteConnectionOptions = {
    type: 'sqlite',
    database: 'db',
    entities: ['dist/src/**/entities/*.entity.js'],
    synchronize: true,
    migrations: [
        'dist/src/db/migrations/*.js'
    ],
    cli: {
        migrationsDir: 'src/db/migrations'
    }
};

export default ormConfig;