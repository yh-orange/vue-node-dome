<template>
    <section class="loading-circle-1">
        <div :class="['sk-chasing-dots',size]">
            <div class='sk-child sk-dot-1'></div>
            <div class='sk-child sk-dot-2'></div>
        </div>
    </section>
</template>
<script type="text/babel">
    export default {
        props: {
            size: String
        },
        data () {
            return {};
        },
        components: {},
        watch: {},
        created () {

        },
        mounted () {

        },
        methods: {
            // 验证码获取成功

        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/login-loading.less"></style>
