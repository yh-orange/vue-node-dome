<template>
    <div class="syntax-help-textarea">
        <keyword-textarea
                v-model="inputValue"
                :disabled="disabled"
                :isAutoHeight="isAutoHeight"
                :placeholder="placeholder"
                :max-input-length="totals"
                @showErrorTip="showErrorTip"
                @focus="handleFocus"
                @blur="handleBlur"
                @enter="handleEnter"
                ref="textarea">
        </keyword-textarea>
        <syntax-help
                v-show="isKeywordHelper"
                @set-word="handleSetWord"
                ref="keywordHelper">
        </syntax-help>
        <ef-tip v-if="isNeedTip && hasErrorTip" :errorMessage="errorTip" :positionName="positionName"></ef-tip>
        <div class="length-tip" ref="lengthTop" v-if="isShowLengthTipContent&&!isIntelligence">
            <span class="length-tip-span-tip">{{i18n.lengthTip1}}<em class="length-tip-em-tip">{{totals - inputValue.length}}</em>{{i18n.lengthTip2}}</span>
            <!--            <a class="clear-btn" @click="clearKeywordValue">{{i18n.lengthTip3}}</a>-->
        </div>
    </div>
</template>

<script type="text/babel">
    import api from './../../../api/manage';
    import keywordTextarea from '../keyword-textarea.vue';
    import keywordsRevise from './../../../asset/util/event-keywords-revise-utils';
    import efTip from '../../tip/tip-error.vue';
    import syntaxHelp from './syntax-help.vue';

    export default {
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
            },
            isAutoHeight: {
                type: Boolean,
                default: true
            },
            errorMessage: {
                type: String,
                default: '关键词语法错误'
            },
            placeholder: String,
            isNeedTip: {
                type: Boolean,
                default: true
            },
            totals: {
                type: Number,
                default: 2000
            },
            isShowLengthTip: {
                type: Boolean,
                default: false
            },
            errorCallback: Function, // 错误信息回调
            isNormal: {
                type: Boolean, // 默认正常显示，不是智能推荐
                default: true
            },
            isModule: {
                type: Boolean, // 默认是模块配置
                default: true
            },
            isIntelligence: {
                type: Boolean, // 默认不是智能推荐的添加输入框，如果是则不显示字数提示
                default: false
            },
            isSpecialOpinionModule: { // 是否是带有专题监测的模块
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                inputValue: this.value,
                isKeywordHelper: false,
                topHeight: 0,
                isBlur: true,
                hasErrorTip: false, // 是否有错误提示
                errorTip: null // 错误提示
            };
        },
        computed: {
            i18n () {
                return {
                    'lengthTip1': this.$t(`main.common.length-tip1`),
                    'lengthTip2': this.$t(`main.common.length-tip2`),
                    'lengthTip3': this.$t(`main.common.length-tip3`)
                };
            },
            isShowLengthTipContent () {
                return this.isShowLengthTip && this.inputValue.length > 0 && !this.isBlur;
            },
            positionName () {
                if (this.isNormal) {
                    if (this.isModule) {
                        return this.$refs.keywordHelper.isKeywordHelper ? 'error-top' : 'left-bottom';
                    } else {
                        return this.$refs.keywordHelper.isKeywordHelper ? 'page-top' : 'left-bottom';
                    }
                } else {
                    return 'bottom';
                }
            }
        },
        components: {
            keywordTextarea,
            syntaxHelp,
            efTip
        },
        mounted () {
        },
        watch: {
            'disabled' (val) {
                if (val) {
                    this.isKeywordHelper = !val;
                }
            },
            'inputValue' (val) {
                this.isBlur = false;
                if (val.length > this.totals) {
                    this.inputValue = this.inputValue.slice(0, this.totals);
                    return;
                }
                this.$emit('input', val);
            },
            'value' (val) {
                let result = keywordsRevise.formatKeywords(val, this.totals, true);
                this.inputValue = result.newText;
            },
            'errorMessage' () {
                this.$nextTick(() => {
                    this.topHeight = this.$refs.textarea.$el.getHeight();
                });
            },
            'isSpecialOpinionModule': {
                handler (val) {
                    if (val) {
                        this.$nextTick(() => {
                            this.handleBlur();
                        });
                    } else {
                        this.hasErrorTip = false;
                        this.errorTip = null;
                    }
                },
                immediate: true
            }
        },
        methods: {
            handleSetWord (payload) {
                if (this.$refs.textarea) {
                    this.stopBlur = true;
                    this.$refs.textarea.focus();
                    let cachePos = this.$refs.textarea.cachePos;
                    let newInputValue = this.inputValue;
                    let pos = 0;
                    let offset = 0;
                    if (payload.key === '()' || payload.key === '""' || payload.key === '##') {
                        offset -= 2;
                    }
                    if (typeof cachePos === 'number') {
                        let hText = newInputValue.substring(0, cachePos);
                        let fText = newInputValue.substring(cachePos);
                        newInputValue = hText + payload.value + fText;
                        pos = cachePos + payload.value.length;
                    } else {
                        newInputValue += payload.value;
                        pos = newInputValue.length;
                    }
                    this.$refs.textarea.formatKeywords(newInputValue, true, pos, offset);
                    this.$nextTick(() => {
                        this.atwhoRun();
                    });
                }
            },
            atwhoRun () {
                if (this.$refs.textarea && this.$refs.textarea.$keyWord) {
                    this.$refs.textarea.$keyWord.atwho('run');
                }
            },
            handleFocus () {
                this.isKeywordHelper = true;
                this.$emit('focus');
                if (this.setTimeoutName) {
                    clearTimeout(this.setTimeoutName);
                }
                this.setTimeoutName = setTimeout(() => {
                    this.hasErrorTip = false;
                    this.errorTip = null;
                    clearTimeout(this.setTimeoutName);
                }, 0);
            },
            handleBlur () {
                // let timeoutName = setTimeout(() => {
                //     clearTimeout(timeoutName);
                let tags = document.getElementsByClassName('atwho-view');
                let isShowUl = Array.from(tags).some(item => item.style.display === 'block');
                this.isBlur = true;
                // 传空字符串接口会报错
                if (this.inputValue === '') {
                    if (this.isSpecialOpinionModule) {
                        this.showErrorTip('关键词不能为空');
                    }
                    this.$emit('blur', this.inputValue);
                    return;
                }
                if (!this.isLegal(this.inputValue) && !isShowUl) {
                    this.showErrorTip();
                    this.$emit('blur', 'error');
                    return;
                }
                if (!isShowUl) {
                    this.checkKeywordEffectiveness('blur');
                }
                // }, 200);
            },
            handleEnter () {
                this.isBlur = true;
                if (!this.isLegal(this.inputValue)) {
                    this.showErrorTip();
                    return;
                }
                // 传空字符串接口会报错
                if (this.inputValue === '') {
                    this.$emit('enter', this.inputValue);
                }

                // this.checkKeywordEffectiveness('enter');
            },
            focus () {
                this.$refs['textarea'].focus();
            },
            showErrorTip (errorContent) {
                // if (this.errorCallback) {
                //     this.errorCallback(errorContent || this.errorMessage || this.$t('main.common.textareaTip'));
                //     return;
                // }
                this.hasErrorTip = true;
                this.errorTip = errorContent || this.errorMessage || this.$t('main.common.textareaTip');
                // this.$message.error({
                //     message: this.errorTip,
                //     offset: this.$el.getHeight() * 0.5
                // }, this.$el);
            },
            // 清除关键字
            clearKeywordValue () {
                this.$refs.textarea.inputValue = '';
            },
            // 括号匹配
            isLegal (str) {
                let left = 0;
                let right = 1;
                let other = 2;
                // 判断括号是左边还是右边，或者其他
                let verifyFlag = function (char) {
                    if (char === '(' || char === '[' || char === '{' || char === '/*') {
                        return left;
                    } else if (char === ')' || char === ']' || char === '}' || char === '*/') {
                        return right;
                    } else {
                        return other;
                    }
                };
                // 判断左右括号是否匹配
                let matches = function (char1, char2) {
                    return (char1 === '(' && char2 === ')') ||
                      (char1 === '{' && char2 === '}') ||
                      (char1 === '[' && char2 === ']') ||
                      // (char1 === '&' && char2 === '&') ||
                      // (char1 === '"' && char2 === '"') ||
                      // (char1 === '|' && char2 === '|') ||
                      // (char1 === '#' && char2 === '#') ||
                      (char1 === '/*' && char2 === '*/');
                };
                // 入口
                let leftStack = [];
                if (str !== null || str !== '' || str !== undefined) {
                    for (let i = 0; i < str.length; i++) {
                        // 处理字符
                        let char = str.charAt(i);
                        if (verifyFlag(char) === left) {
                            leftStack.push(char);
                        } else if (verifyFlag(char) === right) {
                            // 如果不匹配，或者左括号栈已经为空，则匹配失败
                            if (leftStack.length === 0 || !matches(leftStack.pop(), char)) {
                                return false;
                            }
                        } else {
                        }
                    }
                    // 循环结束，如果左括号栈还有括号，也是匹配失败
                    return leftStack.length === 0 && str[str.length - 1] !== ':' && str[str.length - 1] !== '：';
                }
            },
            checkKeywordEffectiveness (type) {
                api.checkKeyword({keyword: this.inputValue}).then(data => {
                    if (data.data.success) {
                        this.$emit(type, this.inputValue);
                    } else {
                        this.showErrorTip(this.$t(`main.common.keywordGrammarError`));
                    }
                }).catch(error => {
                    this.showErrorTip(this.$t('main.common.error.systemError'));
                    console.log(error);
                });
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    @import "../less/syntax-help-textarea.less";
</style>
