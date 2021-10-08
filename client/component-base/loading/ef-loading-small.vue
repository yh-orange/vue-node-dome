<template>
    <!--    <div class="ef-loading-panel" v-if="isShow">-->
    <!--        <div class="ef-loading-icon" :class="size">-->
    <!--            <loading-circle :size="size"></loading-circle>-->
    <!--        </div>-->
    <!--    </div>-->
    <div class="ef-loading-small-wrap">
        <div :class="['ef-loading-small-panel', size]" v-if="isShow">
            <div :class="['cssload-square-part cssload-square-green', size]"></div>
            <div :class="['cssload-square-part cssload-square-pink', size]"></div>
            <div class="cssload-square-blend"></div>
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

<style lang="less" rel="stylesheet/less" src="./less/ef-loading-small.less"></style>
