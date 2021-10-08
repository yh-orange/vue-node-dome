<script type="text/babel">
    export default {
        props: {
            item: {
                type: Object,
                default: {
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
            contentClass: {
                type: String,
                default: ''
            }
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
            let child = [];
            let content = this.item.content;
            let itemOpt = {
                'class': [
                    this.contentClass,
                    this.item.classes
                ],
                'domProps': {}
            };
            let getChildOpt = function (props) {
                return {
                    'props': Object.assign({}, props, this.extendProps)
                };
            };
            let prepareChild = function (obj) {
                if (!obj || typeof obj !== 'object') { return; }
                if (obj.component && typeof obj.component === 'object') {
                    child.push(createElement(obj.component, getChildOpt.call(this, obj.props)));
                } else {
                    child.push(createElement(obj, getChildOpt.call(this, {})));
                }
            };
            // child component 的初始化处理
            if (typeof content === 'string') {
                itemOpt['domProps']['innerHTML'] = content;
            } else if (Array.isArray(content)) {
                content.forEach((obj) => {
                    prepareChild.call(this, obj);
                });
            } else {
                prepareChild.call(this, content);
            }
            // 创建 item 元素
            return createElement('div', itemOpt, child);
        },
        watch: {},
        methods: {}
    };
</script>

<style lang="less" rel="stylesheet/less">

</style>
