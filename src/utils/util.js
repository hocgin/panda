import {message} from 'antd';
import moment from 'moment';
import duckduckgo from '@/assets/duckduckgo.svg';
import sogou from '@/assets/sogou.png';
import baidu from '@/assets/baidu.png';
import google from '@/assets/google.png';

export default class Util {

  static getSearchLogo() {
    return {
      'duckduckgo': duckduckgo,
      'sogou': sogou,
      'baidu': baidu,
      'google': google,
    };
  }

  /**
   * 请求结果是否符合预期
   * @param result
   * @returns {boolean}
   */
  static isOk(result) {
    return result && result.code === 200;
  }

}
