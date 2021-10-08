<template>
    <div class="ef-input"
         :class="[
            size ? 'ef-input-'+size : ''
           ]"
         :style="{width: width ? width + 'px' : '100%', display: this.$slots.append ? 'inline-table': ''}">
        <i class="ef-input-icon ef-iconfont main-iconfont" :class="icon" v-if="icon" @click.stop="handleIconClick"></i>
        <input class="ef-input-inner"
               :type="type"
               :maxlength="maxLength"
               :disabled="disabled"
               :autofocus="autofocus"
               :readonly="readonly"
               :placeholder="placeholder"
               :value="inputValue"
               :class="{'hide-border':isHideBorder,'transparent':isTransparent}"
               @blur="handleBlur"
               @input="handleInput"
               @focus="handleFocus"
               @keyup="handleKeyUp"
               ref="input">
        <div class="ef-input-append" v-if="$slots.append">
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'ef-input',
        props: {
            maxLength: Number,
            placeholder: String,
            value: [String, Number],
            disabled: Boolean,
            autofocus: Boolean,
            type: {
                type: String,
                default: 'text'
            },
            size: {
                type: String,
                default: '' // mini small large
            },
            readonly: {
                type: Boolean,
                default: false
            },
            width: String,
            icon: String,
            isHideBorder: {
                type: Boolean,
                dafault: false
            },
            isTransparent: {
                type: Boolean,
                dafault: false
            }
        },
        computed: {},
        data () {
            return {
                inputValue: this.value
            };
        },
        watch: {
            'value' (val, oldValue) {
                this.inputValue = val;
            }
        },
        methods: {
            handleInput (event) {
                this.inputValue = event.target.value;
                this.$emit('input', this.inputValue);
            },
            handleBlur (e) {
                this.$emit('blur', e);
            },
            handleFocus () {
                this.$emit('focus');
            },
            handleIconClick () {
                this.$emit('click');
            },
            handleKeyUp (e) {
                this.$emit('keyup', e);
            },
            focus () {
                this.$refs.input.focus();
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-input.less">
</style>


