<template>
    <ef-input type="text"
              ref="input"
              :placeholder="placeholder"
              :disabled="disabled"
              :value="cacheValue"
              :width="width"
              :size="size"
              @input="handleInput">
    </ef-input>
</template>

<script type="text/babel">
    import efInput from './ef-input.vue';

    export default {
        props: {
            placeholder: String,
            value: String,
            disabled: Boolean,
            size: {
                type: String,
                default: '' // mini small large
            },
            width: String,
            maxNum: {
                type: Number,
                default: 10
            },
            minNum: {
                type: Number,
                default: 1
            }
        },
        data () {
            return {
                cacheValue: this.value
            };
        },
        computed: {},
        components: {
            efInput
        },
        mounted () {},
        watch: {
            'value' (value) {
                this.cacheValue = value;
            }
        },
        methods: {
            handleInput (value) {
                let oldValue = this.cacheValue;
                this.cacheValue = value;

                // 校验
                if (typeof this.cacheValue === 'string') {
                    this.$nextTick(() => {
                        this.cacheValue = this.cacheValue.replace(/\D/g, '');
                        let num = parseInt(this.cacheValue);
                        if (num < this.minNum || num > this.maxNum) {
                            this.cacheValue = oldValue;
                        }
                        this.$emit('input', this.cacheValue);
                    });
                } else {
                    this.$emit('input', this.cacheValue);
                }
            },
            focus () {
                if (this.$refs.input) {
                    this.$refs.input.focus();
                }
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less">

</style>
