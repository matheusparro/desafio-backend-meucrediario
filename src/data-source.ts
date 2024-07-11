import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migration/*.{ts,js}`]
});

export class ColumnNumericTransformer {
    to(data: number): number {
      return data;
    }
    from(data: string): number {
      return parseFloat(data);
    }
  }
// roda migration yarn typeorm-ts-node-commonjs migration:run -d src/data-source.ts
// yarn run typeorm migration:generate ./src/migration/changeIntegerToDecimalContract -d ./src/data-source.ts
