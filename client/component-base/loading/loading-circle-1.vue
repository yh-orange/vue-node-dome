<template>
    <div :class="['loader-circle', loaderClass]"></div>
</template>

<script type="text/babel">
    export default {
        props: {
            loaderClass: String
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/loading-circle.less"></style>