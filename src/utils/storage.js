import hash from 'hash.js';

export default class Storage {
  static KEY_LAST_WEBSITE_MAPS = 'KEY_LAST_WEBSITE_MAPS';
  static KEY_ACTIVE_INT = 'KEY_LAST_ACTIVE_INT';

  static getActive() {
    return parseInt(Storage.getItem(Storage.KEY_ACTIVE_INT));
  }

  static setActive(active) {
    Storage.setItem(Storage.KEY_ACTIVE_INT, active);
  }

  static getLastWebsiteMap() {
    return Storage.getItemUseJson(Storage.KEY_LAST_WEBSITE_MAPS) || {
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
    Storage.setItemUseJson(Storage.KEY_LAST_WEBSITE_MAPS, all);
  }


  // ----
  static setItem(key, value) {
    if (value === null || value === undefined) {
      return;
    }
    console.debug('[Storage]SET:', key, value);
    localStorage.setItem(key, value);
  }

  static getItem(key) {
    let result = localStorage.getItem(key);
    console.debug('[Storage]GET:', key, result);
    return result;
  }

  static setItemUseJson(key, value) {
    this.setItem(key, JSON.stringify(value));
  }

  static getItemUseJson(key) {
    let result = this.getItem(key);
    try {
      return JSON.parse(result);
    } catch (e) {
      return null;
    }
  }
}