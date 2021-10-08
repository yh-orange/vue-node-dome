<template>
    <ef-loading-big :isShow="isShow"
                    :size="size"
                    :tip="tip"
                    v-if="type === 'big'"></ef-loading-big>
    <ef-loading-small :isShow="isShow"
                      :size="size"
                      :tip="tip"
                      v-else></ef-loading-small>
</template>

<script type="text/babel">
    import efLoadingBig from './ef-loading-big.vue';
    import efLoadingSmall from './ef-loading-small.vue';

    export default {
        name: 'ef-loading',
        props: {
            tip: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: ''
            },
            isShow: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: 'small'
            }
        },
        data () {
            return {};
        },
        computed: {
            isShowTip () {
                return this.tip !== '';
            }
        },
        components: {
            efLoadingBig,
            efLoadingSmall
        },
        methods: {
            isNestedPattern () {
                return !!this.$children.length;
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-loading.less"></style>
