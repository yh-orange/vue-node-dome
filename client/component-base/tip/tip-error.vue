<template>
    <transition name="fade">
        <div :class="['tip-error-wrap',`${positionName}`]">
            {{errorMessage}}
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'tip-error',
        props: {
            errorMessage: {
                type: String,
                default: ''
            },
            positionName: {
                type: String,
                default: ''
            }
        },
        data () {
            return {};
        },
        computed: {},
        created () {
        },
        methods: {}
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/tip-error.less"></style>
