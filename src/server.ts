import koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import winston from 'winston';
import router from './router';
import loggerMiddleware from './middleware/logger';
import errorHandlerMiddleware from './middleware/errorHandler';
import rateLimitMiddleware from './middleware/rateLimit';
import { MongoDB } from './lib/mongoClient';
import config from './config';

// init
const app = new koa();
const logger = winston.createLogger(config.logger);
const dbClient = new MongoDB(config.dbClient.uri, config.dbClient.opts);

// app context
app.context.logger = logger;
app.context.dbClient = dbClient;

// middleware
app.use(koaBodyparser());
app.use(loggerMiddleware);
app.use(errorHandlerMiddleware);
app.use(rateLimitMiddleware);

// router
app.use(router.routes());

export default app;
