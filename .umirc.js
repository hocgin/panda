// ref: https://umijs.org/config/
export default {
    title: '熊猫导航',
    routes: [
        {
            path: '/',
            component: '../layouts/index',
            routes: [
                {path: '/', component: '../pages/index'},
            ],
        },
    ],
    exportStatic: {
        htmlSuffix: true,
        dynamicRoot: true,
    },
    outputPath: './dist',
    dva: {},
    antd: {},
    copy: ['CNAME'],
    analytics: {
        baidu: '41d7f44870aac3490f3d497fc9af7485',
    },
};
