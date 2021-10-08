<template>
    <div class="animated-list-wrap" ref="wrap">
        <transition-group name="animate-list"
                          class="animated-list-box"
                          ref="animatedBox"
                          tag="div">
            <div class="animate-item-wrap"
                 v-for="item in newList"
                 :key="handlerOnlyKey(item)">
                <slot :item="item"></slot>
            </div>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: 'AnimatedList',
        props: {
            newList: Array,
            onlyKey: String // 用来标识item项key的字段名
        },
        methods: {
            handlerOnlyKey (item) {
                return !this.onlyKey ? item.id : item[this.onlyKey];
            }
        },
        components: {}
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/animated-list.less">
</style>
