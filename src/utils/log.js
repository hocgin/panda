import Config from '@/utils/config';

export default class Log {

  /**
   * 输出日志
   */
  static debug(...args) {
    if (Config.isDev()) {
      console.debug(...args);
    }
  }

  static error(...args) {
    console.error(...args);
  }
}