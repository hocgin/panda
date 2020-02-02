import request from '@/utils/request';
import websites from '@/services/websites';
import jsonp from 'jsonp';
import { stringify } from 'qs';

export default class API {

  static worked(payload) {
    return request(`/worked`, {
      method: 'GET',
      body: {
        ...payload,
      },
    });
  }

  static getAutocomplete(payload) {
    let queryStr = stringify(payload);
    return new Promise((resolve, reject) => {
      jsonp(`https://duckduckgo.com/ac/?${queryStr}`, {
        param: 'callback',
        name: 'autocompleteCallback',
      }, (err, data) => {
        if (!!err) {
          console.error('[请求出现异常]', err);
          resolve([]);
        } else {
          resolve(data);
        }
      });
    }).then((response) => {
      return response;
    }).catch((e) => {
      console.log('[请求出现异常]', e);
      return [];
    });
  }

  static getWebsites() {
    return {
      code: 200,
      message: 'ok',
      data: websites,
    };
  }
}