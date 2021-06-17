// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        // to edit target browsers: use "browserslist" field in package.json
        "autoprefixer": {},
        'postcss-pxtorem': {
            'rootValue': 14, // body下的默认字体大小
            propList: ['*'], //属性的选择器
            mediaQuery: true //允许在媒体查询中转换px。
        }
    }
}
