<template>
    <div class="ef-tip-rs" :style="styleObj" v-show="show">
        <div class="rs-message">
            <img src="../../asset/image/setting/tip1.svg" alt="" class="jinggao" :style="styleObj2">
            <div class="error-message">{{errorMessage}}</div>
        </div>
        <div class="release">
            <div class="releaseLoading ef-tip-fabu">
                <div class="error-message" v-show="showReleaseMessage">
                    <img src="../../asset/image/setting/releaseing.png" alt="" class="jinggao" :style="styleObj2">{{il8n.releaseLoading}}
                </div>
            </div>
            <div class="releaseSuccess ef-tip-fabu">
                <div class="error-message" v-show="showReleaseSuccess">
                    <img src="../../asset/image/setting/ok.png" alt="" class="jinggao" :style="styleObj2">{{il8n.releaseSuccess}}
                </div>
            </div>
            <div class="releaseError ef-tip-fabu">
                <div class="error-message" v-show="showReleaseError">
                    <img src="../../asset/image/setting/tip1.png" alt="" class="jinggao" :style="styleObj2">{{il8n.releaseError}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ef-tip',
        props: {
            size: {
                type: Number,
                default: 42
            },
            errorMessage: {
                type: [String, Boolean]
            },
            width: {
                type: Number,
                default: 53
            },
            releaseMessage: {
                type: String,
                default: null
            }

        },
        data () {
            return {
                show: false,
                styleObj: {},
                styleObj2: {},
                showReleaseMessage: false,
                showReleaseSuccess: false,
                showReleaseError: false,
                setTimeoutName: null
            };
        },
        created () {
            if (this.errorMessage) { // 如果有错误提示语句就显示
                this.show = true;
                let timeoutName = setTimeout(() => {
                    this.show = false;
                    clearTimeout(timeoutName);
                }, 1500);
            }
            this.styleObj = {
                height: this.size + 'px',
                'line-height': this.size + 'px'
            };
            this.styleObj2 = {
                'margin-top': (this.size - 20) / 2 + 'px'
            };
        },
        watch: {
            releaseMessage (newVal) {
                const self = this;
                if (self.setTimeoutName) {
                    clearTimeout(self.setTimeoutName);
                    self.setTimeoutName = null;
                }
                if (newVal) {
                    if (self.releaseMessage && self.releaseMessage === self.il8n.releaseLoading) {
                        self.showReleaseMessage = true;
                        self.setTimeoutName = setTimeout(() => {
                            self.showReleaseMessage = false;
                        }, 3000);
                    } else if (self.releaseMessage && self.releaseMessage === self.il8n.releaseSuccess) {
                        self.showReleaseSuccess = true;
                        self.setTimeoutName = setTimeout(() => {
                            self.showReleaseSuccess = false;
                        }, 3000000);
                    } else if (self.releaseMessage && self.releaseMessage === self.il8n.releaseError) {
                        self.showReleaseError = true;
                        self.setTimeoutName = setTimeout(() => {
                            self.showReleaseError = false;
                        }, 3000);
                    }
                }
            },
            errorMessage () { // 如果错误提示语句改变就使用新的 如果提示语句变为false就隐藏提示语句
                if (this.errorMessage) {
                    this.show = true;
                } else {
                    this.show = !this.show;
                }
            },
            show () {
                let timeoutName = setTimeout(() => {
                    this.show = false;
                    clearTimeout(timeoutName);
                }, 1500);
            }
        },
        computed: {
            il8n () {
                return {
                    releaseLoading: this.$t('main.settings.release.releaseLoading'),
                    releaseSuccess: this.$t('main.settings.release.releaseSuccess'),
                    releaseError: this.$t('main.settings.release.releaseError')
                };
            }
        },
        beforeDestroy () {
            clearTimeout(this.setTimeoutName);
            this.setTimeoutName = null;
        }
    };
</script>

<style lang="less" rel="stylesheet/less" src="./less/tip.less">

</style>
