
<script type="text/babel">
    import resourceBus from '../../asset/util/resource-bus';
    import resource from '../../asset/util/resource-mixins';

    const ESC_KEY = 27;

    export default {
        data () {
            return { // 注意，该组件只是部分公共处理的抽取，没有实际的dom和样式，具体使用请看left\right-float-panel
                openType: '',
                panelWidth: 0,
                paddingRight: 17,
                overlayIndex: 1,
                contentIndex: 2,
                isInAnimation: false, // 是否正处于动画执行中，为true时将屏蔽type变化。
                timeoutId: null
            };
        },
        computed: {
            mixinPanelWidth () {
                return this.panelWidth + this.paddingRight;
            },
            panelStyle () {
                return {
                    'z-index': this.contentIndex,
                    width: this.mixinPanelWidth + 'px'
                };
            },
            isOpen () {
                return !!this.openType;
            }
        },
        resource: {
            [resourceBus.ResourceType.MONITOR_ITEM_WIDTH]: function (panelWidth) {
                this.panelWidth = panelWidth;
            }
        },
        mixins: [resource],
        watch: {
            'openType' (openType) {
                if (typeof this.updateOpenTypeCache === 'function') {
                    this.updateOpenTypeCache(openType);
                }
            },
            'isOpen' (isOpen) {
                this.addOrRemoveListener(isOpen);
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                }
                this.timeoutId = setTimeout(() => {
                    this.isInAnimation = false;
                    this.timeoutId = null;
                }, 200);
            }
        },
        methods: {
            addOrRemoveListener (isOpen) {
                // 在侧滑界面打开时需要监听ESC按钮事件
                if (isOpen) {
                    window.addEventListener('keyup', this.handlerKeyup);
                } else {
                    window.removeEventListener('keyup', this.handlerKeyup);
                }
            },
            handlerKeyup (e) {
                // esc按键事件，关闭侧滑面板
                if (e && e.keyCode === ESC_KEY) {
                    this.closeFloat();
                }
            },
            closeFloat () {
                if (this.isInAnimation) {
                    return;
                }
                if (this.isOpen) {
                    this.isInAnimation = true;
                }
                this.openType = '';
            },
            openFloat (type) {
                if (this.isInAnimation) {
                    return;
                }
                if (!this.isOpen) {
                    this.isInAnimation = true;
                }
                this.openType = type;
            }
        }
    };
</script>
