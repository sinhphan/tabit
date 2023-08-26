import { errFormat, filterError } from './filter-error';

describe('filterError', () => {
  it('filters out null and empty errors', () => {
    const errors = [
      { property: '', constraints: {}, contexts: {} },
      null,
      { property: 'name', constraints: {}, contexts: {} },
    ];

    const result = filterError(errors);

    expect(result).toEqual([{ name: { constraints: {}, contexts: {} } }]);
  });
});

describe('errFormat', () => {
  it('formats the error message with data', () => {
    const message = 'Error occurred.';
    const data = { status: 500 };

    const result = errFormat(message, data);

    expect(result).toEqual({ msg: 'Error occurred.', data: { status: 500 } });
  });

  it('formats the error message without data', () => {
    const message = 'Error occurred.';

    const result = errFormat(message);

    expect(result).toEqual({ msg: 'Error occurred.', data: null });
  });
});
