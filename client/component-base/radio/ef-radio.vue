<template>
  <label class="ef-radio" :class="{'is-checked': model === type}">
    <span class="ef-radio-input">
      <span class="ef-radio-inner"></span>
      <input type="radio"
             tabindex="-1"
             class="ef-radio-original"
             :value="type"
             v-model="model">
    </span>
    <span class="ef-radio-label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>

<script type="text/babel">
  export default {
      props: {
          disabled: Boolean,
          value: {},
          type: {}
      },
      data () {
          return {};
      },
      computed: {
          model: {
              get () {
                  return this.value;
              },
              set (val) {
                  this.$emit('input', val);
              }
          }
      },
      components: {},
      mounted () {},
      watch: {},
      methods: {}
  };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-radio.less">
</style>
