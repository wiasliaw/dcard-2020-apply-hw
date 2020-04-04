import { LoggerOptions } from 'winston';
import { MongoClientOptions } from 'mongodb';

export interface Docs {
  userId: string;
  reset: string;
  remaining: number;
}

export interface AppErrorReturn {
  code: number;
  msg: string;
}

export class AppError extends Error {
  public code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export interface AppConfig {
  logger: LoggerOptions;
  dbClient: {
    uri: string;
    opts: MongoClientOptions;
  };
}
