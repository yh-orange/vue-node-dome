import eventBus from './event-bus';

/**
 * 事件总线mixins
 */
export default {
    created: function () {
        /**
         *通过闭包的方式防止污染其他组件；
         *使用hook钩子函数，在组件销毁前，解绑所有监听；
         * */
        let events = (this.$options.events && Object.keys(this.$options.events)) || [];
        let bindEvents = {};
        events.forEach(eventId => {
            let event = this.$options.events[eventId].bind(this);
            eventBus.$on(eventId, event);
            bindEvents[eventId] = event;
        });
        this.$once('hook:beforeDestroy', () => {
            events.forEach(eventId => {
                eventBus.$off(eventId, bindEvents[eventId]);
            });
        });
    }
};
