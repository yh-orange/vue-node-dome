<template>
    <div class="session-error-popup" v-if="isNeedLogout">
        <div class="ant-icon"></div>
        <div class="content">{{ content }} <a :href="href">{{i18n.loginAgain}}</a></div>
        <span slot="footer"></span>
    </div>
</template>

<script>
    export default {
        props: {
            content: String,
            hrefLogout: Boolean,
            isNeedLogout: Boolean
        },
        computed: {
            href () {
                return this.hrefLogout ? `/logout` : `/login`;
            },
            i18n () {
                return {
                    'loginAgain': '重新登录'
                };
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/session-error-popup.less" scoped>
</style>
