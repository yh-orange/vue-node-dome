<template>
    <section class="empty-data-box">
        <div class='empty-content'>
            {{errorContent}}
        </div>
    </section>
</template>
<script type="text/babel">
    export default {
        props: {
            tipsAndInstructions: {
                type: String,
                default: '无相关数据'
            }
        },
        data () {
            return {};
        },
        components: {},
        computed: {
            errorContent () {
                if (this.tipsAndInstructions) {
                    return this.tipsAndInstructions;
                } else {
                    return '无相关数据';
                }
            }
        },
        created () {},
        mounted () {

        },
        methods: {
            // 验证码获取成功

        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/empty-data.less"></style>
