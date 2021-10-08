<template>
    <div class="ef-textarea">
    <textarea ref="textarea"
              spellcheck="false"
              class="keyword-textarea"
              :disabled="disabled"
              :placeholder="placeholder"
              :value="inputValue"
              :class="{
                          'max-length': isMax,
                          'auto-height': isAutoHeight
                         }"
              @input="handleInput"
              @blur="handleBlur"
              @focus="handleFocus"
              @keyup.enter.native="handleEnterKeyUp"
              @keyup="handleKeyUp">
    </textarea>
        <span v-if="isAutoHeight"
              class="copy-keyword">
          {{inputValue}}
    </span>
        <slot name="extend"></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {
            value: String,
            isAutoHeight: {
                type: Boolean,
                default: false
            },
            disabled: Boolean,
            placeholder: String,
            isMax: Boolean
        },
        data () {
            return {
                inputValue: this.value || ''
            };
        },
        computed: {},
        components: {},
        mounted () {},
        watch: {
            'value' (val, oldValue) {
                this.inputValue = val;
            }
        },
        methods: {
            handleBlur (e) {
                this.$emit('blur', e);
            },
            handleFocus (e) {
                this.$emit('focus', e);
            },
            handleKeyUp (e) {
                this.$emit('keyup', e);
            },
            handleEnterKeyUp (e) {
                this.$emit('enter', e);
            },
            handleInput (e) {
                this.inputValue = e.target.value;
                this.$emit('input', this.inputValue);
            },
            focus () {
                if (this.$refs.textarea) {
                    this.$refs.textarea.focus();
                }
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-textarea.less"></style>
