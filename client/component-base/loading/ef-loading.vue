<template>
    <div class="ef-loading-panel" v-if="isShow">
        <div class="ef-loading-icon" :class="size">
            <loading-circle :size="size"></loading-circle>
        </div>
        <span class="ef-loading-tip" v-if="isShowTip">{{ tip }}</span>
    </div>
</template>

<script type="text/babel">
    import loadingCircle from './loading-circle.vue';

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
            loadingCircle
        },
        methods: {
            isNestedPattern () {
                return !!this.$children.length;
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-loading.less"></style>
