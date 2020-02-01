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
          reject(err);
        } else {
          resolve(data);
        }
      });
    }).then((response) => {
      console.log('response', JSON.stringify(response));
      return response;
    }).catch((e) => {
      console.log('[请求出现异常]', e);
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