<template>
    <animated-list :newList="newList"
                   :onlyKey="onlyKey"
                   @mouseenter="stopAuto"
                   @mouseleave="updateAnimated"
                   ref="wrap">
        <template v-slot="props">
            <slot :item="props.item"></slot>
        </template>
    </animated-list>
</template>

<script>
    import animatedList from './animated-list.vue';

    export default {
        name: 'AnimatedIndex',
        props: {
            dataList: Array,
            onlyKey: String
        },
        data () {
            return {
                newList: [],
                interval: null
            };
        },
        components: {
            animatedList
        },
        watch: {
            'dataList': {
                handler (val) {
                    this.newList = [...val];
                    this.updateAnimated();
                },
                deep: true
            }
        },
        mounted () {
            this.newList = [...this.dataList];
            this.updateAnimated();
        },
        methods: {
            stopAuto () {
                clearInterval(this.interval);
            },
            startAuto () {
                this.interval && clearInterval(this.interval);
                let self = this;
                this.interval = setInterval(() => {
                    // 删除数组的第一个元素
                    let firstData = this.newList.shift();
                    this.$nextTick(function () {
                        // 将删除的元素重新放到数组的最后
                        self.newList.push(firstData);
                    });
                }, 3000);
            },
            updateAnimated () {
                // dom挂载完成后，判断item元素占据的动画区域是否超出内容区域
                this.$nextTick(() => {
                    let wrapHeight = this.$refs.wrap.$el.offsetHeight;
                    let animatedHeight = this.$refs.wrap.$refs.animatedBox.$el.offsetHeight;
                    // 如果动画区域超出内容区域，则开启动画
                    if (wrapHeight < animatedHeight) {
                        this.startAuto();
                    } else {
                        this.stopAuto();
                    }
                });
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
</style>
