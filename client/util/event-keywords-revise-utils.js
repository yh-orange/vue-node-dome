/**
 * Created by zhousiyao on 2017/5/8.
 */
/* eslint-disable */

import '../../asset/js/jquery-caret/jquery.caret.js';
import keywoedsQuotesHandleManager from './keywoeds-quotes-handle-manager';
import $ from 'jquery';
import _ from 'lodash';

// 穷举所有的过滤规则，进行语法效验
// 基础过滤规则，首先过滤中英文全角半角
let basicsReplaceMarkRegex = {
    '-': /(－)|(-)|(——)|(—)/g, // 中文全角，中文半角，英文全角，替换成英文半角 -
    '': /\/|\\/g, // 全局删除反斜杠
    '@': /(＠)|(﹫)/g, // 中文全角，中文半角，英文全角，替换成英文半角 @
    '#': /(＃)|(＃)|(﹟)/g, // 中文全角，中文半角，英文全角，替换成英文半角 #
    '(': /（/g, // 中文全角，中文半角，英文全角，替换成英文半角 (
    ')': /）/g, // 中文全角，中文半角，英文全角，替换成英文半角 )
    ':': /：/g, // 中文全角，中文半角，英文全角，替换成英文半角 :
    '"': /[“”]|[“”]/g, // 中文全角，中文半角，英文全角，替换成英文半角 "
    '&': /(＆)|(﹠)|(﹠)|(﹠)/g, // 中文全角，中文半角，英文全角，替换成英文半角 &
    '|': /(｜)|(‖)|(┃)|(│)/g // 中文全角，中文半角，英文全角，替换成英文半角 |
};

// 去除过滤规则，最后去除多余的重复符号
let doubleReplaceMarkRegex = {
    '(': /\(\s+/g, // 左括号后面不加任意空格符号
    ')': /\s+\)/g, // 右括号前面不加任意空格符号
    '-': /-\s+/g, // 多个排除字符合并成一个
    '$1||$2': /([^|])\|([^|])/g, // 一个|补全成两个
    '$1&&$2': /([^&])&([^&])/g, // 一个&补全成两个
    '||': /\|{2,}/g, // 多个|符号替换成两个
    '&&': /&{2,}/g // 多个&符号替换成两个
};

// 高级语法处理,补全语法需要的空格
let seniorReplaceMarkRegex = {
    '$1OR$2': /([\b\s])OR([\b\s])/ig, // 去除多个空格符
    '$1 $4': /((OR)|(\|\|))([\b])/g, // 给出OR要求的左右空格
    '$1 $2': /([\b])((OR)|(\|\|))/g, // 给出OR要求的左右空格
    '$1 || $2': /([^|\s])\s?\|\|\s?([^|\s])/g, // 给出||要求的左右空格
    '$1 && $2': /([^|\s])\s?&&\s?([^|\s])/g, // 给出&&要求的左右空格
    ' -': /-/g, //
    ' ': /\s+/g
};

// 保存的情况下，需要采用宽松的过滤正则，尽量补全|| && 两边的空格
let saveReplaceMarkRegex = {
    '': /"\S{0}\s*"/g, // 发现""，直接替换成'',单独的""没有语义
    '|': /\|+/g,
    '&': /&+/g,
    '||': /\|/g,
    '&&': /&/g,
    ' || ': /(\|\|)/g,
    ' && ': /(&&)/g,
    ' ': /\s+/g
};

let quotationMarksRegex = /"/g;
// let parenthesesMarks1Regex = /\(/g;
// let parenthesesMarks2Regex = /\)/g;

let KEYS = {
    BACKSPACE: 8,
    DELETE: 46,
    ENTER: 13
};
let CANCEL_KEYS = [KEYS.BACKSPACE, KEYS.DELETE, KEYS.ENTER, -1, undefined, null];

function replaceBeforeSave (text) {
    text = keywoedsQuotesHandleManager.replaceQuotes(text);
    text = _replaceMark(text);
    for (let key in saveReplaceMarkRegex) {
        text = text.replace(saveReplaceMarkRegex[key], key);
    }
    text = keywoedsQuotesHandleManager.restoreQuotes(text);
    return text;
}

function _replaceMark (text) {
    for (let key in basicsReplaceMarkRegex) {
        text = text.replace(basicsReplaceMarkRegex[key], key);
    }
    for (let key in doubleReplaceMarkRegex) {
        text = text.replace(doubleReplaceMarkRegex[key], key);
    }
    for (let key in seniorReplaceMarkRegex) {
        text = text.replace(seniorReplaceMarkRegex[key], key);
    }
    return text;
}

function _trimFooter (text) {
    return $.trim(text);
}

function _trimHeader (text) {
    return $.trim(text);
}

function _getMatchCount (regex, text) {
    let matchResult = text.match(regex);
    return matchResult ? matchResult.length : 0;
}

let formatKeywords = function (text, cachePos, isKeyup) {
    let textQuotes = keywoedsQuotesHandleManager.replaceQuotes(text);

    let h_text = _replaceMark(textQuotes.substring(0, cachePos));
    let f_text = _replaceMark(textQuotes.substring(cachePos));
    let h_trim_text = _trimFooter(h_text);
    let f_trim_header = _trimHeader(f_text);

    let newText = h_text + f_text;
    let pos = h_text.length;

    end: {
    // case1、少括号：(湖南 || 湖北 && 大学；自动补全
        if (isKeyup) {
            let h_last_charset = _.last(h_trim_text);
            let f_first_charset = _.isUndefined(_.first(f_trim_header)) ? '' : ')';

            if (h_last_charset === '(' && f_first_charset !== ')') {
                newText = h_trim_text + ') ' + f_trim_header;
                pos = h_trim_text.length;
                break end;
            }
        }

        // case2、少空格：(湖南 ||湖北) && 大学；自动补全
        {
            let h_last_charset = (h_trim_text.length > 1 ? h_trim_text.substring(h_trim_text.length - 1) : h_trim_text);
            let h_last2_charset = (h_trim_text.length > 2 ? h_trim_text.substring(h_trim_text.length - 2) : h_trim_text);
            let h_last3_charset = (h_trim_text.length > 3 ? h_trim_text.substring(h_trim_text.length - 3) : h_trim_text);
            let f_first_charset = f_text.substring(0, 1);
            // let f_first2_charset = f_text.substring(1, 2);

            if (h_last2_charset === '||') {
                if (f_first_charset !== ' ') {
                    if (h_trim_text.length > 3 && h_last3_charset !== ' ||') {
                        let s = h_trim_text.substring(0, h_trim_text.length - 2) + ' || ';
                        newText = s + f_trim_header;
                        pos = s.length;
                    } else {
                        newText = h_trim_text + ' ' + f_trim_header;
                        pos = h_trim_text.length + 1;
                    }
                    break end;
                }
            } else if (h_last_charset === '|' && f_first_charset != '|') {
                if (h_last2_charset !== h_trim_text && h_last2_charset !== ' |') {
                    let s = h_trim_text.substring(0, h_trim_text.length - 1) + ' || ';
                    newText = s + f_trim_header;
                    pos = s.length;
                } else {
                    let s = h_trim_text + '| ';
                    newText = s + f_trim_header;
                    pos = s.length;
                }
                break end;
            }
        }

        // &&
        {
            let h_last_charset = (h_trim_text.length > 1 ? h_trim_text.substring(h_trim_text.length - 1) : h_trim_text);
            let h_last2_charset = (h_trim_text.length > 2 ? h_trim_text.substring(h_trim_text.length - 2) : h_trim_text);
            let h_last3_charset = (h_trim_text.length > 3 ? h_trim_text.substring(h_trim_text.length - 3) : h_trim_text);
            let f_first_charset = f_text.substring(0, 1);
            // let f_first2_charset = f_text.substring(1, 2);

            if (h_last2_charset === '&&') {
                if (f_first_charset !== ' ') {
                    if (h_trim_text.length > 3 && h_last3_charset !== ' &&') {
                        let s = h_trim_text.substring(0, h_trim_text.length - 2) + ' && ';
                        newText = s + f_trim_header;
                        pos = s.length;
                    } else {
                        newText = h_trim_text + ' ' + f_trim_header;
                        pos = h_trim_text.length + 1;
                    }
                    break end;
                }
            } else if (h_last_charset === '&' && f_first_charset != '&') {
                if (h_last2_charset !== h_trim_text && h_last2_charset !== ' &') {
                    let s = h_trim_text.substring(0, h_trim_text.length - 1) + ' && ';
                    newText = s + f_trim_header;
                    pos = s.length;
                } else {
                    let s = h_trim_text + '& ';
                    newText = s + f_trim_header;
                    pos = s.length;
                }
                break end;
            }
        }

        // ""
        if (isKeyup && _getMatchCount(quotationMarksRegex, newText) % 2) {
            let h_last_charset = _.last(h_trim_text);
            let h_last2_charset = (h_trim_text.length > 2 ? h_trim_text.substring(h_trim_text.length - 2) : h_trim_text);
            let f_first_charset = _.first(f_text);

            if (h_last_charset === '"' && (!f_first_charset || f_first_charset === ' ') &&
        (h_last2_charset === ' "' || h_last2_charset === '"')) {
                newText = h_trim_text + '" ' + f_trim_header;
                pos = h_trim_text.length;
                break end;
            }
        }

        // - ' -': /(－)|(-)/g
        if (isKeyup && h_text.search(/-/g) >= 0) {
            let str_list = h_text.split(' ');
            let next_str = '';
            str_list.map(function (str, index) {
                if (index > 0) {
                    next_str += ' ';
                }
                let pass = str.search(/-/g);
                let nextPass = str.search(/@/g);
                // 有- 并且-和@不在开头或没有@
                if (pass >= 0 && nextPass != 0) {
                    if (nextPass > 0) {
                        str.split('@').map(function (item, j) {
                            if (j > 0) {
                                next_str += '@';
                            }
                            if (j === 0 && pass > 0) {
                                next_str += item.replace(/-/g, ' -');
                            } else {
                                next_str += item;
                            }
                        });
                    } else {
                        if (pass === 0) {
                            str.split('-').map(function (item, j) {
                                if (j > 0) {
                                    if (j === 1) {
                                        next_str += '-';
                                    } else {
                                        next_str += ' -';
                                    }
                                }
                                next_str += item;
                            });
                        } else {
                            next_str += str.replace(/-/g, ' -');
                        }
                    }
                } else {
                    next_str += str;
                }
            });
            newText = next_str + f_text;
            pos = next_str.length;
            break end;
        }

        // 替换空格
        {
            pos = h_text.length;
            break end;
        }
    }

    newText = keywoedsQuotesHandleManager.restoreQuotes(newText);
    return {
        newText,
        pos
    };
};

let inputHandler = function ($this, e) {
    clearTimeout($this._reviseEventTimeout);
    let isNotBlur = (e.type !== 'blur');
    let isKeyup = (e.keyCode !== 1000 && e.type === 'keyup');

    if (isNotBlur && _.includes(CANCEL_KEYS, e.keyCode)) {
        e.keyCode = 1000;
        $this._reviseEventTimeout = _.delay(_.bind(inputHandler, $this[0], $this, e), 2000);
        return;
    }

    let text = $this.val();
    let payload = formatKeywords(text, $this.caret('pos'), isKeyup);

    if (text !== payload.newText) {
        if (isNotBlur) {
            $this.val(payload.newText).change().caret('pos', payload.pos);
        } else {
            $this.val(payload.newText).change();
        }
    }
};

let addInputElementReviseEvent = function ($input) {
    if (!$input) {
        return;
    }
    $input.on('keyup focus click blur paste cut', _.partial(inputHandler, $input));

    // case1、少括号：(湖南 || 湖北 && 大学；自动补全
    // case2、少空格：(湖南 ||湖北) && 大学；自动补全
    // case3、少值：userName:；提示语法错误，不能添加监测事件
    // case4、小写：湖南 or 大学；自动修正为大写
    // case5、引号不成对，中文引号：中文引号和括号自动转换为英文，不成对自动补全，添加监测事件时再做一次语法检查
    // case6、单个 |，兼容；
    // case7、多个冒号：username:http://weibo.com/u/3164259974，提示语法错误，不让添加监测事件
};

module.exports = {
    addInputElementReviseEvent,
    formatKeywords,
    CANCEL_KEYS,
    KEYS,
    replaceBeforeSave,
    basicsReplaceMarkRegex
};
