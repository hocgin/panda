import API from '@/services/api';
import Log from '@/utils/log';
import Util from '@/utils/util';

export default {
  namespace: 'global',

  state: {
    siteGroup: [],
    userConfigs: {},
  },

  effects: {
    * fetchSiteGroup(_, { call, put, select }) {
      const result = yield call(API.getWebsites);

      if (Util.isOk(result)) {
        yield put({
          type: 'changeSiteGroup',
          payload: result.data || [],
        });
      }
    },
  },

  reducers: {
    changeSiteGroup(state, { payload }) {
      return {
        ...state,
        siteGroup: payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        Log.debug('当前访问的 URL = ', pathname);
        switch (pathname) {
          case '/':
          default: {
            dispatch({
              type: 'fetchSiteGroup',
              payload: {},
            });
          }
        }
      });
    },
  },
};
