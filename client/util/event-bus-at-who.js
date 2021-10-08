import Vue from 'vue';

let eventBus = new Vue();

eventBus.MessageConstants = {
    headBar: {
    // 关闭顶部输入框的自动补全
        CLOSE_HEAD_INPUT_AUTO_COMPLETE: 'CLOSE_HEAD_INPUT_AUTO_COMPLETE'
    }
};

export default eventBus;
