import API from '@/services/api';
import Log from '@/utils/log';
import Util from '@/utils/util';

export default {
  namespace: 'global',

  state: {
    workspaces: [],
    siteTop10: [],
    workspaceTop10: [],
    searchEngines: [],
    userConfigs: {},
  },

  effects: {
    * fetchWorkspaces(_, { call, put, select }) {
      const result = yield call(API.getWorkspaces);

      if (Util.isOk(result)) {
        yield put({
          type: 'changeWorkspaces',
          payload: result.data || [],
        });
      }
    },
    * fetchSiteTop10(_, { call, put, select }) {
      const result = yield call(API.getSiteTop10);

      if (Util.isOk(result)) {
        yield put({
          type: 'changeSiteTop10',
          payload: result.data || [],
        });
      }
    },
    * fetchWorkspaceTop10(_, { call, put, select }) {
      const result = yield call(API.getWorkspaceTop10);

      if (Util.isOk(result)) {
        yield put({
          type: 'changeWorkspaceTop10',
          payload: result.data || [],
        });
      }
    },
    * fetchSearchEngines(_, { call, put, select }) {
      const result = yield call(API.getSearchEngines);

      if (Util.isOk(result)) {
        yield put({
          type: 'changeSearchEngines',
          payload: result.data || [],
        });
      }
    },
  },

  reducers: {
    changeWorkspaces(state, { payload }) {
      return {
        ...state,
        workspaces: payload,
      };
    },
    changeWorkspaceTop10(state, { payload }) {
      return {
        ...state,
        workspaceTop10: payload,
      };
    },
    changeSiteTop10(state, { payload }) {
      return {
        ...state,
        siteTop10: payload,
      };
    },
    changeSearchEngines(state, { payload }) {
      return {
        ...state,
        searchEngines: payload,
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
              type: 'fetchWorkspaces',
              payload: {},
            });
            dispatch({
              type: 'fetchSiteTop10',
              payload: {},
            });
            dispatch({
              type: 'fetchWorkspaceTop10',
              payload: {},
            });
            dispatch({
              type: 'fetchSearchEngines',
              payload: {},
            });
          }
        }
      });
    },
  },
};
