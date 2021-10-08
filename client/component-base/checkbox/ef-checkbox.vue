<template>
    <label class="ef-checkbox" :class="{'is-checked': model}">
    <span class="ef-checkbox-input">
      <span class="ef-checkbox-inner"></span>
      <input type="checkbox"
             tabindex="-1"
             :disabled="disabled"
             class="ef-checkbox-original"
             v-model="model">
    </span>
        <span class="ef-checkbox-label">
      <slot></slot>
      <template v-if="label">{{label}}</template>
    </span>
    </label>
</template>

<script type="text/babel">
    export default {
        props: {
            disabled: Boolean,
            value: Boolean,
            validate: Function,
            label: String
        },
        data () {
            return {
                cacheValue: this.value
            };
        },
        computed: {
            model: {
                get () {
                    if (this.validate && !this.validate()) {
                        this.cacheValue = this.value;
                    }
                    this.$emit('input', this.cacheValue);
                    return this.cacheValue;
                },
                set (val) {
                    this.cacheValue = val;
                }
            }
        },
        components: {},
        mounted () {},
        watch: {
            value (value) {
                this.cacheValue = value;
            }
        },
        methods: {}
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-checkbox.less"></style>