import koaRouter from 'koa-router';

const router = new koaRouter();

router.post('*', ctx => {
  ctx.body = 'get card';
  ctx.status = 200;
});

export default router;
