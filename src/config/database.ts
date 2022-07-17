import { Sequelize } from 'sequelize';
import 'dotenv/config';

let database;
let username;
let password;
let host;

switch (process.env.NODE_ENV) {
  case 'test':
    database = String(process.env.DATABASE_TEST);
    username = String(process.env.USERNAME_TEST);
    password = String(process.env.PASSWORD_TEST);
    host = String(process.env.HOST_TEST);
    break;
  case 'dev':
    database = String(process.env.DATABASE_DEV);
    username = String(process.env.USERNAME_DEV);
    password = String(process.env.PASSWORD_DEV);
    host = String(process.env.HOST_DEV);
    break;
  default:
    database = String(process.env.DATABASE_PRO);
    username = String(process.env.USERNAME_PRO);
    password = String(process.env.PASSWORD_PRO);
    host = String(process.env.HOST_PRO);
}

const db = new Sequelize(database, username, password, { host, dialect: 'mysql' });

export default db;
