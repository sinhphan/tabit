import { enc, MD5, SHA1 } from 'crypto-js';
import { StringHelper } from './string-helper';

describe('StringHelper', () => {
  describe('trunkLine', () => {
    it('splits a string into lines of specified length, preserving words', () => {
      const input =
        'This is a long sentence that needs to be split into multiple lines.';
      const length = 10;
      const character = ' ';

      const result = StringHelper.trunkLine(input, length, character);

      expect(result).toEqual([
        'This is a',
        'long',
        'sentence',
        'that needs',
        'to be',
        'split into',
        'multiple',
        'lines.',
      ]);
    });
  });

  describe('random', () => {
    it('generates a random string of specified format and length', () => {
      const format = 'alnum';
      const length = 8;

      const result = StringHelper.random(format, length);

      expect(result).toHaveLength(length);
    });
  });

  describe('br2nl', () => {
    it('replaces <br>, <br/>, or <br /> tags with new lines', () => {
      const input = 'Line 1<br>Line 2<br/>Line 3<br />Line 4';
      const expected = 'Line 1\nLine 2\nLine 3\nLine 4';

      const result = StringHelper.br2nl(input, '\n');

      expect(result).toEqual(expected);
    });
  });

  describe('formatInsee', () => {
    it('formats an INSEE number with spaces', () => {
      const input = '123456789012345';
      const expected = '1 23 45 67 890 123 45';

      const result = StringHelper.formatInsee(input);

      expect(result).toEqual(expected);
    });
  });

  describe('startsWith', () => {
    it('checks if a string starts with the given substring', () => {
      const haystack = 'Hello, World!';
      const needle = 'Hello';

      const result = StringHelper.startsWith(haystack, needle);

      expect(result).toBeTruthy();
    });

    it('returns false if the string does not start with the given substring', () => {
      const haystack = 'Hello, World!';
      const needle = 'Goodbye';

      const result = StringHelper.startsWith(haystack, needle);

      expect(result).toBeFalsy();
    });
  });

  describe('endsWith', () => {
    it('checks if a string ends with the given substring', () => {
      const haystack = 'Hello, World!';
      const needle = 'World!';

      const result = StringHelper.endsWith(haystack, needle);

      expect(result).toBeTruthy();
    });

    it('returns false if the string does not end with the given substring', () => {
      const haystack = 'Hello, World!';
      const needle = 'Universe!';

      const result = StringHelper.endsWith(haystack, needle);

      expect(result).toBeFalsy();
    });
  });
});
