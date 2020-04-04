/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston';
import loggerMiddleware from '../../../src/middleware/logger';

describe('LoggerMiddleware', () => {
  const logger = winston.createLogger();
  const infoMockFn = jest.fn((msg: string) => msg);
  logger.info = infoMockFn.bind(logger);

  test('logging', async done => {
    const ctx = {
      ip: '127.0.0.1',
      method: 'GET',
      path: '/test_path',
      status: 200,
      logger: logger,
    };
    await loggerMiddleware((ctx as any), () => Promise.resolve());
    expect(infoMockFn.mock.results[0].value).toEqual(
      `${ctx.ip} ${ctx.method} ${ctx.path} ${ctx.status}`
    );
    done();
  });
});