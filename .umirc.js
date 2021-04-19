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
    copy: ['CNAME',
        'logo_128.png',
        'logo_256.png',
        'manifest.json'],
    analytics: {
        baidu: 'ea74cfe1769e440fd33ddda0da97d5ec',
    },
};
