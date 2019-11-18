import { success } from './utils/result';
import Mock from 'mockjs';
import { delay } from 'roadhog-api-doc';

const proxy = {
  'GET /api/all': (req, res) => {
    let data = [];
    return res.json(success([
        ...data,
      ]),
    );
  },
  'GET /api/workspaces': getWorkspaces,
  'GET /api/site/top10': getSiteTop10,
  'GET /api/workspace/top10': getWorkspaceTop10,
  'GET /api/search-engines': getSearchEngines,
};

function getSiteTop10(req, res) {
  let mock = Mock.mock({
    'data|10': [{
      'title': '@ctitle(5, 15)',
      'code': '@sentence(5)',
    }],
  });

  return res.json(success([
      ...mock.data,
    ]),
  );
}

function getWorkspaceTop10(req, res) {
  let mock = Mock.mock({
    'data|10': [{
      'title': '@ctitle(5, 15)',
      'code': '@sentence(5)',
    }],
  });

  return res.json(success([
      ...mock.data,
    ]),
  );
}

function getWorkspaces(req, res) {
  let mock = Mock.mock({
    'data|1-5': [{
      'id': '@id()',
      'type|0-1': 1,
      name: '@ctitle(1, 5)',
      password: '@zip()',
      'themes|0-10': [{
        name: '@ctitle(1, 5)',
        'sites|0-10': [{
          name: '@ctitle(1, 5)',
          image: '@image("100x100")',
          url: '@url()',
          desc: '@csentence(0, 20)',
          'idx1|+1': [0, 10000, 10003],
          'idx2|+1': [0, 10000, 10003],
        }],
      }],
    }],
  });
  return res.json(success([
      ...mock.data,
    ]),
  );
}

function getSearchEngines(req, res) {
  let mock = Mock.mock({
    'data|1-5': [{
      name: '@ctitle(1, 5)',
      'image|+1': [
        'https://www.baidu.com/img/baidu_resultlogo@2.png',
        'https://static.lookao.com/img/logo_home_2x.aabc51.png',
      ],
      'hotKey|+1': [':bd', ':gl'],
      'query|+1': [
        'https://www.baidu.com/s?wd={keyword}',
        'https://lookao.com/search?q={keyword}',
      ],
    }],
  });
  return res.json(success([
      ...mock.data,
    ]),
  );
}

export default delay(proxy, 1000);