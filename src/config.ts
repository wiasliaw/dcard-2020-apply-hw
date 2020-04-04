import winston from 'winston';
import { AppConfig } from './constants';

const config: AppConfig = {
  logger: {
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple(),
      winston.format.colorize({ all: true }),
    ),
    transports: [
      new winston.transports.Console()
    ],
  },
  dbClient: {
    uri: process.env.DB_URI ? process.env.DB_URI : '',
    opts: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: process.env.DB_USER ? process.env.DB_USER : '',
        password: process.env.DB_PWD ? process.env.DB_PWD : '',
      },
    }
  }
}

export default config;
