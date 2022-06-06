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
    },
    outputPath: './dist',
    dva: {},
    antd: {},
    copy: ['CNAME',
        'logo_128.png',
        'logo_256.png',
        'sw.js',
        'manifest.json'],
    analytics: {
        baidu: 'ea74cfe1769e440fd33ddda0da97d5ec',
    },
    // 配置 external
    externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
    },
    // 引入被 external 库的 scripts 区分 development 和 production，使用不同的产物
    scripts: process.env.NODE_ENV === 'development' ? [
        'https://gw.alipayobjects.com/os/lib/react/16.8.6/umd/react.development.js',
        'https://gw.alipayobjects.com/os/lib/react-dom/16.8.6/umd/react-dom.development.js',
    ] : [
        'https://gw.alipayobjects.com/os/lib/react/16.8.6/umd/react.production.min.js',
        'https://gw.alipayobjects.com/os/lib/react-dom/16.8.6/umd/react-dom.production.min.js',
    ],
    extraBabelPlugins: [
        [
            'import',
            {
                libraryName: '@hocgin/ui',
                camel2DashComponentName: false,
                style: true,
            },
            '@hocgin/ui',
        ],
    ],
};
