import {LOCAL_STORAGE} from "@/utils/constant";

export default class Config {
    /**
     * 服务器地址
     * @returns {string}
     */
    static host() {
        if (Config.isDev()) {
            return `http://${document.location.host}/api`;
        }
        return 'http://api.hocg.in/panda/v1';
    }

    /**
     * 默认配置参数
     */
    static defaultConfig() {
        return {
        };
    }

    /**
     * 获取用户配置
     */
    static getUserConfig() {
        let customConfig = {};
        try {
            customConfig = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER_CONFIG) || `{}`);
        } catch (e) {
            console.error('获取自定义配置时发生错误, 可能为JSON解析出错', e);
        }
        // 默认配置
        let defaultConfig = Config.defaultConfig() || {};

        return {
            ...defaultConfig,
            ...customConfig
        };
    }

    /**
     * 抉择值
     * @param prod
     * @param dev
     * @returns {*}
     */
    static isDevUse(prod, dev) {
        return Config.isDev() ? dev : prod;
    }

    /**
     * 是否开发模式
     * @returns {boolean}
     */
    static isDev() {
        if (`${document.location.host}`.startsWith('127.0.0.1')) {
            return true;
        }
        return false;
    }
}