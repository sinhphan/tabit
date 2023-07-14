import { v4 as uuidv4 } from 'uuid';
import { enc, MD5, SHA1 } from 'crypto-js';

/**
 * application\Helpers\StringHelper.php
 */
export class StringHelper {
  public static trunkLine(
    string: string,
    length: number,
    character: string,
  ): string[] {
    if (!length) length = 76;
    if (!character) character = ' ';
    if (string.indexOf('\n') !== -1) {
      const ar_strings = string.split('\n');
      let array_reste: string[] = [];
      for (const line of ar_strings) {
        array_reste = array_reste.concat(
          StringHelper.trunkLine(line, length, character),
        );
      }
      return array_reste;
    } else {
      if (length >= string.length) {
        return [string];
      }
      let first_line = string.substring(0, length + 1);
      const pos_last_space = first_line.lastIndexOf(character);
      if (pos_last_space === -1) {
        first_line = first_line.substring(0, length);
      } else {
        first_line = first_line.substring(0, pos_last_space);
      }
      const rest_string = string.substring(pos_last_space + 1);

      const array_reste = StringHelper.trunkLine(
        rest_string,
        length,
        character,
      );
      array_reste.unshift(first_line);
      return array_reste;
    }
  }

  public static random(format: string, length: number): string {
    if (!format) format = 'alnum';
    if (!length) length = 16;
    format = format.toLowerCase();

    // Formatage GUID.
    if (format === 'guid') {
      return uuidv4();
    }
    // Liste des caractères acceptés.
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    if (format === 'hex') {
      characters = 'abcdef0123456789';
    } else if (format === 'alpha') {
      characters = 'abcdefghijklmnopqrstuvwxyz';
    } else if (format === 'numeric') {
      characters = '0123456789';
    }
    // Calcul de la chaine de caractères aléatoires.
    let random = '';
    for (let i = 0; i < length; i++) {
      random += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    // Formatage MD5 ou SHA1.
    if (format === 'md5') {
      return MD5(random).toString(enc.Hex);
    } else if (format === 'sha1') {
      return SHA1(random).toString(enc.Hex);
    }
    return random;
  }

  public static br2nl(string: string, replace: string): string {
    if (!replace) replace = '\n';
    return string.replace(/<br(\s*)\/?>/gi, replace);
  }

  public static formatBytes(bytes: number, format: string | false): string {
    const formats = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const size = 1024;
    let i = 0;

    if (format && !formats.includes(format)) {
      while (bytes > size) {
        bytes /= size;
        i++;
      }
    } else if (format && formats.includes(format)) {
      const key = formats.indexOf(format);
      while (i < key) {
        bytes /= size;
        i++;
      }
    }
    return `${bytes.toFixed(2)} ${formats[i]}`;
  }

  public static formatInsee(string: string): string {
    string = string.replace(/\W/g, '').toUpperCase();
    return string.replace(
      /(\w{1})(\w{2})(\w{2})(\w{2})(\w{3})(\w{3})(\w{2})/,
      '$1 $2 $3 $4 $5 $6 $7',
    );
  }

  public static startsWith(haystack: string, needle: string): boolean {
    return haystack.startsWith(needle);
  }

  public static endsWith(haystack: string, needle: string): boolean {
    return haystack.endsWith(needle);
  }
}
