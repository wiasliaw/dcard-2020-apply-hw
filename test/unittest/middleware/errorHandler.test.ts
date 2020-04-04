/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from 'winston';
import { AppError } from '../../../src/constants';
import errorHandlerMiddleware from '../../../src/middleware/errorHandler';

describe('ErrorHandlerMiddleware', () => {
  const logger = winston.createLogger();
  const errorMockFn = jest.fn((msg: string) => msg);
  logger.error = errorMockFn.bind(logger);

  afterEach(() => {
    errorMockFn.mockClear();
  });

  test('ctx with 404', async done => {
    const ctx = {
      body: '',
      status: 404,
      logger,
      throw: function(errInstance: AppError): void {
        throw errInstance;
      },
    };
    await errorHandlerMiddleware(
      (ctx as any),
      () => Promise.resolve(),
    );
    expect(errorMockFn.mock.results[0].value)
      .toEqual('[Err_LOG]: Error: Not Found');
    expect(ctx.body).toEqual('Not Found');
    done();
  });

  test('ctx with 500', async done => {
    const ctx = {
      body: '',
      status: 404,
      logger,
      throw: function(errInstance: AppError): void {
        throw errInstance;
      },
    };
    await errorHandlerMiddleware(
      (ctx as any),
      () => Promise.reject(new AppError(500, 'Internal Server Error')),
    );
    expect(errorMockFn.mock.results[0].value)
      .toEqual('[Err_LOG]: Error: Internal Server Error');
    expect(ctx.body).toEqual('Internal Server Error');
    done();
  });
});
