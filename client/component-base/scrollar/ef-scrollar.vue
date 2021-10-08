<template>
    <div class="ef-scrollar-wrapper ef-scroll"
         :class="{'ef-scroll-horizontal': horizontal }">
        <div v-if="horizontal" class="ef-scrollar-horizontal-inner" :style="{ maxHeight: maxHeight + 'px' }">
            <slot></slot>
        </div>
        <div v-else class="ef-scrollar-vertical-inner">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    import 'perfect-scrollbar/css/perfect-scrollbar.css';
    import PerfectScrollbar from 'perfect-scrollbar';

    export default {
        name: 'efScrollar',
        props: {
            noListener: {
                type: Boolean,
                default: false
            },
            classes: {
                type: String,
                default: ''
            },
            horizontal: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                maxHeight: 0,
                Ps: null
            };
        },
        created () {
            window.addEventListener('resize', this.handleResize);
        },
        mounted () {
            let scrollSetting = {};
            if (this.horizontal) {
                this.maxHeight = this.$el.clientHeight;
                scrollSetting.suppressScrollY = true;
                scrollSetting.wheelSpeed = 2;
                scrollSetting.wheelPropagation = false;
            } else {
                scrollSetting.minScrollbarLength = 20;
                scrollSetting.maxScrollbarLength = 200;
                scrollSetting.suppressScrollX = true;
            }
            this.Ps = new PerfectScrollbar(this.$el, scrollSetting);
            // Ps.initialize(this.$el, scrollSetting);
            this.$el.addEventListener('scroll', this.handleScroll);
        },

        components: {},
        methods: {
            handleResize () {
                if (this.$el.clientHeight > 50) {
                    this.maxHeight = this.$el.clientHeight;
                }
                this.updated();
            },
            handleScroll (e) {
                this.$emit('onScroll', e);
            },
            scroll (scrollDistance, callback) {
                let scrollNum = parseInt(scrollDistance);
                // 当scrollDistance===0时，需要滚动到顶部
                if (!this.$el || scrollNum < 0) {
                    return;
                }
                this.$el.scrollTop = scrollNum;
                if (typeof callback === 'function') {
                    this.$nextTick(() => {
                        callback();
                    });
                }
            },
            updated () {
                this.$nextTick(() => {
                    this.Ps.update(this.$el);
                });
            },
            toBottom (distance = 0) {
                this.$el.scrollTop = this.$el.scrollHeight - distance;
            },
            toTop (distance = 0) {
                if (this.$el && this.$el.scrollTop !== distance) {
                    this.$el.scrollTop = distance;
                }
            }
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.handleResize);
            this.$el.removeEventListener('scroll', this.handleScroll);
            this.Ps.destroy(this.$el);
            this.Ps = null;
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-scrollar.less"></style>
