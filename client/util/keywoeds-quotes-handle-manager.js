/**
 * Created by zhousiyao on 2017/6/15.
 *
 * 此类只用来做语法效验中的双引号内容不处理
 * 处理原则：1.待效验的字符，首先全局替换掉特殊占位符
 *          2.把待验证字符中的""内的内容，按照长度替换成等长的占位符（语法自动提示，需要计算鼠标光标位置）
 *          3.全局过滤完正则规则后，还原占位符成原来的内容
 */
/* eslint-disable */
// 双引号处理管理类
let QuotesHandleManager = {
    options: {
        replaceArray: [],
        regExp: /\"[^\"]+\"/g,
        firstPlaceholder: 0x0,
        morePlaceholder: 0x1
    },
    replaceQuotes: function (text) {
    // 全局处理掉特殊字符占位符
        let _textHandleFirst = text.replace(new RegExp(QuotesHandleManager.regExpPlaceholder(), 'g'), '');

        // 全局保留特殊字符占位符内容
        QuotesHandleManager.options.replaceArray = _textHandleFirst.match(QuotesHandleManager.options.regExp);

        // 把""内存在内容的，全局占位陈\t字符
        let _textEnd = _textHandleFirst.replace(QuotesHandleManager.options.regExp, function (val) {
            let _ret = QuotesHandleManager.generatePlaceholder(QuotesHandleManager.options.firstPlaceholder);
            for (let i = 0; i < val.length - 1; i++) {
                _ret += QuotesHandleManager.generatePlaceholder(QuotesHandleManager.options.morePlaceholder);
            }
            return _ret;
        });

        return _textEnd;
    },
    restoreQuotes: function (text) {
        let _i = 0;
        let _newText = text.replace(new RegExp(QuotesHandleManager.regExpPlaceholder(), 'g'), function () {
            return QuotesHandleManager.options.replaceArray[_i++];
        });

        return _newText;
    },
    /**
   * 生成占位符方法
   * @param str
   */
    generatePlaceholder: function (str) {
        return String.fromCharCode(str);
    },
    /**
   * 全局替换占位符规则
   */
    regExpPlaceholder: function () {
        return QuotesHandleManager.generatePlaceholder(QuotesHandleManager.options.firstPlaceholder) +
      QuotesHandleManager.generatePlaceholder(QuotesHandleManager.options.morePlaceholder) + '*';
    }
};

/**
 * 全局语法过滤前，替换双引号的内容为系统定义的占位符
 * @param text
 * @returns {*}
 */
let replaceQuotes = function (text) {
    return QuotesHandleManager.replaceQuotes(text);
};

/**
 * 全局语法过滤后，还原占位符为原始内容
 * @param text
 * @private
 */
let restoreQuotes = function (text) {
    return QuotesHandleManager.restoreQuotes(text);
};

module.exports = {
    replaceQuotes,
    restoreQuotes
};
