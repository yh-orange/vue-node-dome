<script type="text/babel">
    import eventBus from '@/mixins/event-bus';

    export default {
        props: {},
        data () {
            return {
                timeoutId: null,
                scale: null,
                isMounted: false

            };
        },
        mounted () {
            this.initResizeListener();
            this.isMounted = true;
        },
        beforeDestroy () {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            this.removeResizeListener();
        },
        methods: {
            handleResize () {
                eventBus.$emit(eventBus.MessageConstants.home.WINDOW_RESIZE);
            },
            initResizeListener () {
                window.addEventListener('resize', this.debounceResize);
            },
            removeResizeListener () {
                window.removeEventListener('resize', this.debounceResize);
            },
            debounceResize () {
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                }
                // 而界面改变事件的抛出延时到300ms后
                this.timeoutId = setTimeout(this.handleResize, 300);
            }
        }
    };
</script>
