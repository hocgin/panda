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
          image: '@image("24x24")',
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

export default delay(proxy, 1000);