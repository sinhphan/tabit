import { HttpException, HttpStatus } from '@nestjs/common';
import { CForbiddenRequestException } from './forbidden-request.exception';

describe('CForbiddenRequestException', () => {
  it('should create an instance with default values', () => {
    const exception = new CForbiddenRequestException('Test message');

    expect(exception).toBeInstanceOf(CForbiddenRequestException);
    expect(exception).toBeInstanceOf(HttpException);
    expect(exception.getStatus()).toEqual(HttpStatus.FORBIDDEN);
    expect(exception.getResponse()).toEqual({
      msg: 'Test message',
      data: undefined,
    });
  });

  it('should create an instance with provided data', () => {
    const exception = new CForbiddenRequestException('Test message', []);

    expect(exception).toBeInstanceOf(CForbiddenRequestException);
    expect(exception).toBeInstanceOf(HttpException);
    expect(exception.getStatus()).toEqual(HttpStatus.FORBIDDEN);
    expect(exception.getResponse()).toEqual({
      msg: 'Test message',
      data: [],
    });
  });

  // Add more test cases to cover different scenarios and edge cases
});
