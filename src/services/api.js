import request from '@/utils/request';
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

  static getWorkspaces(payload) {
    let query = stringify(payload);
    return request(`/workspaces?${query}`, {
      method: 'GET',
    });
  }

  static getSiteTop10(payload) {
    let query = stringify(payload);
    return request(`/site/top10?${query}`, {
      method: 'GET',
    });
  }

  static getWorkspaceTop10(payload) {
    let query = stringify(payload);
    return request(`/workspace/top10?${query}`, {
      method: 'GET',
    });
  }

  static getSearchEngines(payload) {
    let query = stringify(payload);
    return request(`/search-engines?${query}`, {
      method: 'GET',
    });
  }

}