<script type="text/babel">
    export default {
        props: {
            item: {
                type: Object,
                default: function () {
                    return {
                        // this 为当前实例
                        callbacks: {
                            init () {
                            },
                            active () {
                            },
                            inactive () {
                            }
                        },
                        // 额外的 class 名称
                        classes: '',
                        // item 内容，两种格式如下：
                        // 1. string:（注意：XSS的攻击，所以这里的内容不可以是用户提交的）
                        // 2. object: 子组件 {props:{}, component:object} | object
                        // 3. array: 子组件数组 [ {props:{}, component:object} | object, ... ]
                        content: {
                            props: '',
                            component: ''
                        }
                    };
                },
                validator (data) {
                    if (!data) { return false; }
                    data.callbacks = data.callbacks || {};
                    data.classes = (data.classes || '');
                    data.content = data.content || '';
                    return true;
                }
            },
            extendProps: Object,
            extendOn: Object
        },
        data () {
            return {};
        },
        computed: {

        },
        components: {},
        mounted () {

        },
        render (createElement) {
            let child = null;
            let content = this.item.content;
            let getChildOpt = function (props, on) {
                return {
                    'props': Object.assign({}, props, this.extendProps),
                    'class': this.item.classes,
                    'on': Object.assign({}, on, this.extendOn)
                };
            };
            let prepareChild = function (obj) {
                if (!obj || typeof obj !== 'object') { return; }
                if (obj.component && typeof obj.component === 'object') {
                    child = createElement(obj.component, getChildOpt.call(this, obj.props, obj.on));
                } else {
                    child = createElement('div');
                }
            };
            // child component 的初始化处理
            if (typeof content === 'string') {
                child = createElement('div', {
                    domProps: {
                        innerHTML: content
                    }
                });
            } else if (Array.isArray(content)) {
                prepareChild.call(this, content[0]);
            } else {
                prepareChild.call(this, content);
            }
            // 创建 item 元素
            return child;
        },
        watch: {},
        methods: {}
    };
</script>

<style lang="less" rel="stylesheet/less">

</style>
