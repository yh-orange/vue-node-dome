<template>
    <div class="ef-textarea keyword-textarea">
    <textarea ref="textarea"
              spellcheck="false"
              class="keyword-textarea"
              v-model="cacheValue"
              :disabled="disabled"
              :placeholder="placeholder"
              :class="{
                          'max-length': isMax
                          // 'auto-height': isAucommonUtilstoHeight
                       }"
              @blur="handleBlur"
              @focus="handleFocus"
              @enter="handlerEnter"
              @keyup="keyUpHandler">
    </textarea>
        <span v-if="isAutoHeight"
              class="copy-keyword">
          {{cacheValue}}
    </span>
        <slot name="extend"></slot>
    </div>
</template>

<script type="text/babel">
    import efTextarea from './ef-textarea.vue';
    // import keywordUtils from '../../asset/util/event-keywords-revise-utils';
    import keywordUtils from '@component-util/keyword-revise-utils';
    import atWhoUtils from '../../asset/util/at-who-utils';
    import _ from 'lodash';
    import $ from 'jquery';

    export default {
        props: {
            iconfontClass: String,
            value: String,
            placeholder: String,
            maxInputLength: {
                type: Number,
                default: 2000
            },
            validate: Function,
            disabled: Boolean,
            isAutoHeight: Boolean
        },
        data () {
            return {
                inputValue: this.value,
                cacheTextAreaFocus: false,
                cachePos: null, // 记录失去焦点后光标的位置
                cachePosTimeout: null,
                stopInputHandler: false
            };
        },
        computed: {
            cacheValue: {
                set (val) {
                    this.inputValue = val;
                },
                get () {
                    return this.formatWord();
                }
            },
            isMax () {
                return this.maxInputLength && this.maxInputLength - this.cacheValue.length <= 0;
            }
        },
        components: {
            efTextarea
        },
        mounted () {
            this.setKeyWordEl();
            if (this.$keyWord) {
                atWhoUtils.addEventAts(this.$keyWord, 'zzz', this.callbackToInsert);
            }
        },
        watch: {
            'value' (val) {
                this.inputValue = val;
            }
        },
        methods: {
            callbackToInsert (event, flag, query) {
                // 按keyup事件对待，检查是否少空格
                this.formatKeywords(event.target.value, true, this.getCaretPosition());
            },
            formatWord () {
                let inputValue = this.inputValue;
                if (this.maxInputLength && inputValue.length > this.maxInputLength) {
                    inputValue = inputValue.slice(0, this.maxInputLength);
                    return inputValue;
                }
                if (inputValue && inputValue.length > 0) {
                    inputValue = inputValue.replace(/[\r\n]/g, '').replace(/\s+/g, ' ');
                }
                if (this.validate) {
                    inputValue = this.validate(inputValue);
                }
                this.inputValue = inputValue;
                this.$emit('input', inputValue);
                return inputValue.trim();
            },
            // 为了在atwho之前完成输入格式化，最好不要使用debounce
            keyUpHandler (e) {
                let isString = typeof e === 'string';
                if (!isString && !e.target) {
                    return;
                }
                let value = isString ? e : e.target.value;
                let isKeyup = (!isString && e.keyCode !== 1000 && e.type === 'keyup');
                this.stopInputHandler = true;
                // 抛出事件代表正在输入
                this.$emit('input-val');

                if (isKeyup && _.includes(keywordUtils.CANCEL_KEYS, e.keyCode)) {
                    return;
                }
                this.formatKeywords(value, isKeyup, this.getCaretPosition());
            },
            formatKeywords (value, isKeyup, pos, offset = 0) {
                let payload = keywordUtils.formatKeywords(value, pos, isKeyup);
                if (this.cacheTextAreaFocus && this.inputValue !== payload.newText) {
                    this.inputValue = payload.newText;
                    this.$nextTick(() => {
                        this.setCaretPosition(payload.pos + offset);
                    });
                }
            },
            setCaretPosition (pos) {
                if (this.$keyWord) {
                    this.$keyWord.caret('pos', pos);
                }
            },
            handleBlur (e) {
                this.cacheTextAreaFocus = false;
                this.cachePos = this.getCaretPosition();
                this.delayClearCachePos();
                this.$emit('blur', e);
            },
            handleFocus (e) {
                this.cacheTextAreaFocus = true;
                if (this.cachePosTimeout) {
                    clearTimeout(this.cachePosTimeout);
                }
                this.$emit('focus', e);
            },
            handlerEnter (e) {
                this.cacheTextAreaFocus = false;
                this.cachePos = this.getCaretPosition();
                this.delayClearCachePos();
                this.$emit('enter', e);
            },
            setKeyWordEl () {
                this.$keyWord = $(this.$refs.textarea);
            },
            getCaretPosition () {
                if (this.$keyWord) {
                    return this.$keyWord.caret('pos');
                }
                return 0;
            },
            delayClearCachePos () {
                if (this.cachePosTimeout) {
                    clearTimeout(this.cachePosTimeout);
                }
                // 延时一秒后认为cachePos已过期
                this.cachePosTimeout = setTimeout(() => {
                    this.cachePosTimeout = null;
                    this.cachePos = null;
                }, 1000);
            },
            focus () {
                if (this.$refs.textarea) {
                    this.$refs.textarea.focus();
                }
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-textarea.less">
</style>
