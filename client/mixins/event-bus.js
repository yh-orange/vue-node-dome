import Vue from 'vue';

let eventBus = new Vue();

eventBus.MessageConstants = {
    TEST: 'TEST',
    /**
     * home
     */
    home: {
        // 窗口大小改变
        WINDOW_RESIZE: 'WINDOW_RESIZE',
        // 设置热门事件标题数组
        SET_HOT_TITLES: 'SET_HOT_TITLES',
        // logo改变事件
        LOGO_CHANGE: 'LOGO_CHANGE',
        // 设置热词详情的选择指针
        SET_DETAILS_HOT_WORD_INDEX: 'SET_DETAILS_HOT_WORD_INDEX',
        // 更新indexOptions
        UPDATE_INDEX_OPTIONS: 'UPDATE_INDEX_OPTIONS',
        // 打开地域详情
        OPEN_REGION_DETAILS: 'OPEN_REGION_DETAILS',
        // 打开模块详情
        OPEN_DETAILS: 'OPEN_DETAILS',
        // 更新重点博主推送数据
        REFRESH_ATTENTION_SOCKET_DATA: 'REFRESH_ATTENTION_SOCKET_DATA',
        //
        SEND_HOT_BLOG_DATA: 'SEND_HOT_BLOG_DATA',
        //
        TRY_GET_HOT_BLOG_DATA: 'TRY_GET_HOT_BLOG_DATA',
        // 切换界面
        TOGGLE_RIGHT_FLOAT_PANEL: 'TOGGLE_RIGHT_FLOAT_PANEL',
        // 关闭
        CLOSE_RIGHT_FLOAT_PANEL: 'CLOSE_RIGHT_FLOAT_PANEL'
    }
};

export default eventBus;
