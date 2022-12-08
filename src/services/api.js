import website from '@/services/website';
import searchEngine from '@/services/search-engine';
import jsonp from 'jsonp';
import { stringify } from 'qs';

export default class API {
  static getAutocomplete({ q, ...payload }) {
    let queryStr = stringify({
      prod: 'pc',
      wd: q,
    });
    let url = `https://www.baidu.com/sugrec?${queryStr}`;
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: 'cb',
        name: 'autocompleteCallback',
      }, (err, data) => {
        if (!!err) {
          resolve([]);
        } else {
          resolve((data.g || []).map(({ q }) => q));
        }
      });
    }).then((response) => {
      return response;
    }).catch((e) => {
      console.error('[请求出现异常]', e);
      return [];
    });
  }

  static getWebsites() {
    return {
      code: 200,
      message: 'ok',
      data: website,
    };
  }

  static getSearchEngine() {
    return {
      code: 200,
      message: 'ok',
      data: searchEngine,
    };
  }
}
