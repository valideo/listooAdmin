import {Injectable} from '@angular/core';

@Injectable()
export class StringHelperService {
  /**
   *
   * @param str
   * @returns {string}
   * @link http://stackoverflow.com/a/37511463/1224564
   */
  static normalize(str: string) {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "") // Remove accented characters
      .replace(/[^\w\s]/g, ""); //  Remove hypens, dots, …
  }
}
