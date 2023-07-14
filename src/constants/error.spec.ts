import { ErrorCode, HttpStatus } from './error';

describe('ErrorCode', () => {
  it('should have correct values', () => {
    expect(ErrorCode.FORBIDDEN).toEqual('FORBIDDEN REQUEST');
    expect(ErrorCode.NOT_FOUND).toEqual('NOT FOUND');
    expect(ErrorCode.NOT_FOUND_PLAYER).toEqual('NOT_FOUND_PLAYER');
    expect(ErrorCode.STATUS_NOT_FOUND).toEqual('404');
    expect(ErrorCode.STATUS_INTERNAL_SERVER_ERROR).toEqual(
      'STATUS_INTERNAL_SERVER_ERROR',
    );
  });
});

describe('HttpStatus', () => {
  it('should have correct values', () => {
    expect(HttpStatus.BAD_REQUEST).toEqual(400);
  });
});
