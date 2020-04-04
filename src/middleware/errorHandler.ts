import { AppError } from '../constants';
import { Context, Next } from 'koa';
import { IMiddleware } from 'koa-router';
import { Logger } from 'winston';

const errorHandlerMiddleware: IMiddleware = async (
  ctx: Context,
  next: Next
) => {
  try {
    await next();
    if (ctx.status === 404) {
      ctx.throw(new AppError(404, 'Not Found'));
    }
  } catch (err) {
    (ctx.logger as Logger).error(`[Err_LOG]: ${err}`);
    ctx.body = err.message;
    ctx.status = Number.parseInt(err.code, 10);
  }
};

export default errorHandlerMiddleware;