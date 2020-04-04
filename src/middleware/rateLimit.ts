import dayjs from 'dayjs';
import { AppError, Docs } from '../constants';
import { Context, Next } from 'koa';
import { IMiddleware } from 'koa-router';
import { MongoDB } from '../lib/mongoClient'

const getResetTime = (): string => dayjs().add(1, 'hour').format('YYYY/MM/DD HH:mm');

const checkExpire = (timeString: string): boolean => (
  dayjs(timeString, 'YYYY/MM/DD HH:mm').valueOf() < dayjs().valueOf()
) ? true
  : false;


const rateLimitMiddleware: IMiddleware = async (
  ctx: Context,
  next: Next,
) => {
  const userData: Docs = await (ctx.dbClient as MongoDB).findList(ctx.ip);
  if (userData) {
    let updateResetTime: string = userData.reset;
    let updateRemaining: number = userData.remaining;
    // check reset time
    if (checkExpire(updateResetTime)) {
      updateResetTime = getResetTime();
      updateRemaining = 1000;
    }
    // check remaining
    if (updateRemaining !== 0) {
      updateRemaining = updateRemaining - 1;
    } else {
      ctx.throw(new AppError(429, 'Too Many Requests'));
    }
    // set headers & update db
    ctx.set('X-RateLimit-Remaining', updateRemaining.toString());
    ctx.set('X-RateLimit-Reset', updateResetTime);
    await (ctx.dbClient as MongoDB).updateList(ctx.ip, {
      reset: updateResetTime,
      remaining: updateRemaining,
    });
  } else {
    const resetTime = getResetTime();
    ctx.set('X-RateLimit-Remaining', '999');
    ctx.set('X-RateLimit-Reset', resetTime);
    await (ctx.dbClient as MongoDB).insertList({
      ip: ctx.ip,
      remaining: 999,
      reset: resetTime,
    });
  }
  await next();
};

export default rateLimitMiddleware;
