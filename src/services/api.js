import request from '@/utils/request';
import { stringify } from 'qs';
import websites from '@/services/websites';

export default class API {

  static worked(payload) {
    return request(`/worked`, {
      method: 'GET',
      body: {
        ...payload,
      },
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