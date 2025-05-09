import {getColor, truncate} from './log.utils';

export class LogManager {
  public static info(source: any, message: any) {
    const name = this.getSourceName(source);
    const color = getColor(name);
    console.log(
      `%c[${name}]`,
      `background: ${color}; color: white`,
      `: ${message}`
    );
  }

  private static getSourceName(source: any): string {
    return typeof source === 'string'
      ? `${source}`
      : `${truncate(source.constructor['name'])}`;
  }
}
