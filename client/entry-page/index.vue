<template>
    <div id="app">
        <img src="@/asset/logo.png">
        <router-view/>
        2333333333
        <session-error-popup :content="content"
                             :is-need-logout="isNeedLogout"
                             :href-logout="hrefLogout"></session-error-popup>
    </div>
</template>

<script>
    import adaptiveHandle from '@/components/adaptive-handler.vue';
    import initListenReq from '@/util/init-listen-req';
    import sessionErrorPopup from '@/components/session-error-popup.vue';
    export default {
        name: 'App',
        components: {
            sessionErrorPopup
        },
        extends: adaptiveHandle,
        mixins: [initListenReq]
    }
</script>

<style lang="less" rel="stylesheet/less" src="./less/index.less">

</style>
