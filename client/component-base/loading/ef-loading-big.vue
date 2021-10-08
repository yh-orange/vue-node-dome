<template>
    <!--    <div class="ef-loading-panel" v-if="isShow">-->
    <!--        <div class="ef-loading-icon" :class="size">-->
    <!--            <loading-circle :size="size"></loading-circle>-->
    <!--        </div>-->
    <!--    </div>-->
    <div class="ef-loading-big-wrap">
        <div class="ef-loading-big-panel" v-if="isShow">
            <div class="cssload-shaft1"></div>
            <div class="cssload-shaft2"></div>
            <div class="cssload-shaft3"></div>
            <div class="cssload-shaft4"></div>
            <div class="cssload-shaft5"></div>
            <div class="cssload-shaft6"></div>
            <div class="cssload-shaft7"></div>
            <div class="cssload-shaft8"></div>
            <div class="cssload-shaft9"></div>
            <div class="cssload-shaft10"></div>
        </div>
        <slot name="loading-component"></slot>
        <span class="ef-loading-tip" v-if="isShowTip">{{ tip }}</span>
    </div>
</template>

<script type="text/babel">
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
        components: {},
        methods: {
            isNestedPattern () {
                return !!this.$children.length;
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-loading-big.less"></style>
