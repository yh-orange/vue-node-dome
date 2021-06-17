import Vue from 'vue';

let eventBus = new Vue();

eventBus.MessageConstants = {
    EVENT_TYPE_CHANGE: 'EVENT_TYPE_CHANGE',
    ANALYSIS_TIME_CHANGE: 'ANALYSIS_TIME_CHANGE',
    ADD_EVENT: 'ADD_EVENT',
    EXECUTOR_HAS_NEW_DATA: 'EXECUTOR_HAS_NEW_DATA',
    EVENT_DETAIL: 'EVENT_DETAIL',
    CHANGE_TAG_LIST: 'CHANGE_TAG_LIST'
};

export default eventBus;
