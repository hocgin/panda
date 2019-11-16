import React from 'react';

export default class Formatter {

  /**
   * 格式化标识数量
   * @param idx
   * @returns {*|string}
   */
  static idxString(idx) {
    let idxStr = idx;
    if (!idx) {
      idxStr = '暂无';
    } else if (idx >= 10000) {
      idxStr = '9999+';
    }
    return idxStr;
  }

};