<template>
    <div class="ef-animate-list">
        <div class="ef-animate-content" :style="listStyle">
            <transition-group v-on:enter="enter"
                              v-on:after-leave="$emit('after-leave')">
                <slot></slot>
            </transition-group>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: {},
        data () {
            return {
                listTop: 0
            };
        },
        computed: {
            listStyle () {
                if (this.listTop === 0) {
                    return {
                        top: this.listTop,
                        transition: 'top 1000ms ease 0s'
                    };
                }
                return {
                    top: this.listTop + 'px'
                };
            }
        },
        components: {},
        mounted () {
        },
        watch: {},
        methods: {
            /**
             * transition enter
             */
            enter: function (el, done) {
                this.listTop = -el.getHeight('padding');
                done();
                setTimeout(() => {
                    this.listTop = 0;
                });
                setTimeout(() => {
                    this.$emit('after-enter');
                }, 1000);
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    .ef-animate-list {
        position: relative;
        .ef-animate-content {
            position: relative;
        }
    }
</style>
