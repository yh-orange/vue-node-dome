<template>
    <div class="ef-user-header">
        <img v-show="!isLoading"
             :src="extendSrc"
             @load="onLoad"
             @error="onError"/>
        <img v-if="isLoading" :src="defaultSrc || defaultHeader"/>
    </div>
</template>

<script type="text/babel">
    // 默认头像
    import defaultHeader from '../../asset/image/default-header.jpg';
    import proxyImageUtil from '../../asset/util/proxy-image.js';

    export default {
        props: {
            src: String,
            defaultSrc: String
        },
        data () {
            return {
                loadError: false,
                isLoading: false,
                defaultHeader: defaultHeader
            };
        },
        computed: {
            extendSrc () {
                let src = this.src;
                if (src && src.indexOf('@eefungImgProxy') !== -1) {
                    src = proxyImageUtil.getAbleImageUrl(this.src, 'twitter');
                }
                if (!this.loadError && this.src && this.src !== '') {
                    return src;
                } else if (this.defaultSrc) {
                    return this.defaultSrc;
                } else {
                    return this.defaultHeader;
                }
            }
        },
        components: {},
        created () {
            this.isLoading = true;
        },
        watch: {},
        methods: {
            onLoad () {
                this.isLoading = false;
            },
            onError () {
                this.isLoading = false;
                this.loadError = true;
            }
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
    .ef-user-header {
        width: 100%;
        height: 100%;

        img {
            width: 100%;
            height: 100%;
        }
    }
</style>
