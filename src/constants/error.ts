export enum ErrorCode {
  FORBIDDEN = 'FORBIDDEN REQUEST',
  NOT_FOUND = 'NOT FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  STATUS_NOT_FOUND = '404',
  PASSWORD_NOT_MATCH = 'PASSWORD_NOT_MATCH',
  LOGIN_FAIL = 'LOGIN_FAIL',
  STATUS_INTERNAL_SERVER_ERROR = 'STATUS_INTERNAL_SERVER_ERROR',
  CANNOT_CREATE_DISH = 'CANNOT_CREATE_DISH',
  CANNOT_CREATE_RATE = 'CANNOT_CREATE_RATE',
  CANNOT_DELETE = 'CANNOT_DELETE',
  CANNOT_RESTORE = 'CANNOT_RESTORE',
  DISH_NOT_FOUND = 'DISH_NOT_FOUND',
  DISH_ALREADY_EXISTS = 'DISH_ALREADY_EXISTS',
  USER_RATED = 'USER_RATED',
}

export enum HttpStatus {
  BAD_REQUEST = 400,
}
