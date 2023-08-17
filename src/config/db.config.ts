import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import path from 'path';
console.log(process.env.DATABASE_USERNAME);
export const loadDbConfig = (): TypeOrmModuleOptions => ({
  type: 'mongodb',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: 'all',
  // loggerLevel: 'all',
  autoLoadEntities: true,
  synchronize: false,
  subscribers: [],
  migrationsTableName: 'user_migrations',
  authSource: 'admin',
  socketTimeoutMS: 3000,
  ...(process.env.NON_SSL_DATABASE === 'true'
    ? {}
    : {
        sslValidate: true,
        ssl: true,
        sslCA: readFileSync(
          path.resolve(process.env.DATABASE_SSL_CA_CERT_PATH as string),
        ),
        useNewUrlParser: true,
      }),
});
