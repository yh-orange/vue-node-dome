<template>
    <div class="ef-detail-module-header">
        {{i18nKeyTitle}}
    </div>
</template>

<script>
    export default {
        name: 'detail-module-header',
        props: {
            i18nKeyTitle: {
                type: String,
                default: false
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/detail-module-header.less"></style>
