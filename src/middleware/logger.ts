import { Context, Next } from 'koa';
import { IMiddleware } from 'koa-router';
import { Logger } from 'winston';

const loggerMiddleware: IMiddleware = async (
  ctx: Context,
  next: Next,
) => {
  await next();
  (ctx.logger as Logger).info(
    `${ctx.ip} ${ctx.method} ${ctx.path} ${ctx.status}`
  );
};

export default loggerMiddleware;
