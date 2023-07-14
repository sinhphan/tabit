import { addressFormatter, dateFormatter, inseeFormatter } from '.';

describe('addressFormatter', () => {
  it('should format the address correctly', () => {
    const address = {
      street: '123 Main St',
      street2: 'Apt 4',
      zipCode: '12345',
      city: 'Cityville',
      country: 'Country',
    };

    const formattedAddress = addressFormatter(address);

    expect(formattedAddress).toEqual(
      '123 Main St Apt 4, 12345 Cityville, Country',
    );
  });

  // Add more test cases to cover different scenarios and edge cases for addressFormatter
});

describe('inseeFormatter', () => {
  it('should format the INSEE number correctly', () => {
    const inseeNumber = '123456789012345';

    const formattedInseeNumber = inseeFormatter(inseeNumber);

    expect(formattedInseeNumber).toEqual('1 23 45 67 890 123 45');
  });

  // Add more test cases to cover different scenarios and edge cases for inseeFormatter
});

describe('dateFormatter', () => {
  it('should format the date correctly', () => {
    const date = '2022-01-01';

    const formattedDate = dateFormatter(date as never);

    expect(formattedDate).toEqual('01/01/2022');
  });

  it('should return null for empty date', () => {
    const formattedDate = dateFormatter('');

    expect(formattedDate).toBeNull();
  });

  // Add more test cases to cover different scenarios and edge cases for dateFormatter
});
