import { Injectable } from '@nestjs/common';
import knex from 'knex';

@Injectable()
export class KnexService {
  instance = knex({
    client: 'postgres',
    connection: {
      host: 'postgres_db',
      port: 5432,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
    },
  });
}
