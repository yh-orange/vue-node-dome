<template>
    <button @click="item.callback(item.key)" class="ef-navigation-button">
        {{item.text}}
    </button>
</template>

<script type="text/babel">
    export default {
        props: {
            item: {
                type: Object
            }
        },
        data () {
            return {};
        },
        methods: {}
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-navigation-button.less">
</style>


