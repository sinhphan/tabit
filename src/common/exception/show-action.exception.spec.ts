import { HttpException, HttpStatus } from '@nestjs/common';
import { ShowActionExceptionFilter } from './show-action.exception';

describe('ShowActionExceptionFilter', () => {
  it('should return the response body with the correct status code and exception', () => {
    const filter = new ShowActionExceptionFilter();
    const error = new Error('Test error');

    const result = filter.catch(error);

    expect(result).toEqual({
      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      status_text: 'INTERNAL_SERVER_ERROR',
      exception: error,
    });
  });

  it('should return the response body with the status code and exception from HttpException', () => {
    const filter = new ShowActionExceptionFilter();
    const httpException = new HttpException(
      'Test exception',
      HttpStatus.BAD_REQUEST,
    );

    const result = filter.catch(httpException);

    expect(result).toEqual({
      status_code: HttpStatus.BAD_REQUEST,
      status_text: 'BAD_REQUEST',
      exception: httpException,
    });
  });

  // Add more test cases to cover different scenarios and edge cases
});
