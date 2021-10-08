import PubSubService from '@component-util/micro-pubsub-service';

/**
 * 事件总线mixins
 */
export default {
    created: function () {
        /**
         *通过闭包的方式防止污染其他组件；
         *使用hook钩子函数，在组件销毁前，解绑所有监听；
         * */
        let events = Object.keys(this.$options.events);
        let bindEvents = {};
        events.forEach(eventId => {
            bindEvents[eventId] = PubSubService.ListenService.publish(eventId);
            bindEvents[eventId].on(this.$options.events[eventId].bind(this));
        });
        this.$once('hook:beforeDestroy', () => {
            events.forEach(eventId => {
                if (bindEvents[eventId]) {
                    // bindEvents[eventId].$off(eventId);
                    bindEvents[eventId].destroy();
                }
            });
            bindEvents = null;
            events = null;
        });
    }
};
