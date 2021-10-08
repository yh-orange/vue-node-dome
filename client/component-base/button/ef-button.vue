<template>
  <button class="ef-button ef-text-overflow" :disabled="disabled"
          :class="[
            type ? 'ef-button-'+type : '',
            size ? 'ef-button-'+size : '',
            {
              'is-disabled': disabled,
              'is-loading': loading
            }
          ]"
  >
    <i class="main-iconfont main-app-loading" v-if="loading"></i>
    <span v-if="$slots.default" class="button-content"><slot></slot></span>
  </button>
</template>

<script type="text/babel">
  export default {
      props: {
          type: {
              type: String,
              default: 'default'
          },
          disabled: Boolean,
          size: String,
          loading: Boolean
      },
      data () {
          return {};
      },
      methods: {}
  };
</script>

<style lang="less" rel="stylesheet/less" src="./less/ef-button.less">
</style>


