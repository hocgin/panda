import hash from 'hash.js';

export default class Storage {
  static KEY_LAST_WEBSITE_MAPS = 'KEY_LAST_WEBSITE_MAPS';

  static getLastWebsiteMap() {
    return Storage.getItem(Storage.KEY_LAST_WEBSITE_MAPS) || {
      // hash: {index: 1, value: {}}
    };
  }

  static putLastWebsiteItem(item) {
    if (!item) {
      return;
    }
    let all = this.getLastWebsiteMap();
    let keys = Object.keys(all) || [];
    let key = hash.sha256().update(JSON.stringify(item)).digest('hex');
    if (keys.includes(key)) {
      all[key].index += 1;
    } else {
      all[key] = {
        index: 0,
        value: item,
      };
    }
    Storage.setItem(Storage.KEY_LAST_WEBSITE_MAPS, all);
  }

  static setItem(key, value) {
    if (!value) {
      return;
    }
    console.debug('[Storage]存储:', key, JSON.stringify(value));
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key) {
    let result = localStorage.getItem(key);
    console.debug('[Storage]获取:', key, JSON.parse(result));
    try {
      return JSON.parse(result);
    } catch (e) {
      return null;
    }
  }
}