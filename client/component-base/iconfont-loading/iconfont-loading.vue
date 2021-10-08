<template>
    <a class="iconfont-loading-container" :class="{'default':!isLoading}">
        <i class="ef-iconfont ef-loading" v-if="isLoading"></i>
        <template v-else>
            <slot></slot>
        </template>
        <slot name="label"></slot>
    </a>
</template>

<script type="text/babel">
    export default {
        props: {
            'isLoading': {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {};
        },
        computed: {},
        watch: {},
        mounted () {

        },
        methods: {}
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/iconfont-loading.less"></style>