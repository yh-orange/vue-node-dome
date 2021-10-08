<template>
  <div class="syntax-help-panel">
    <div class="help" v-show="!isKeywordHelper">
      <a class="help-btn" @click="showOrHiddenKeywordHelper">
          <img src="../../../asset/image/setting/tip.png" alt="">
          语法帮助
      </a>
    </div>
    <div class="edit-keywords-helper" v-show="isKeywordHelper">
      <span v-for="(tipObj, key) in tipKeys"
            class="help-tip-item"
            @click="setWord(key, tipObj.value)">
          {{ tipObj.name ? ($t(tipObj.name) + ':') : tipObj.value }}
      </span>
      <i class="close-keyword-helper-btn"
         @click="showOrHiddenKeywordHelper">×</i>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
      props: {

      },
      data () {
          return {
              tipKeys: {
                  '&&': {
                      // title: this.$t('syntaxHelp.and'),
                      value: ' && '
                  },
                  '||': {
                      // title: this.$t('syntaxHelp.or'),
                      value: ' || '
                  },
                  '()': {
                      // title: this.$t('syntaxHelp.independent'),
                      value: ' () '
                  },
                  '-': {
                      // title: this.$t('syntaxHelp.exclude'),
                      value: ' -'
                  },
                  '""': {
                      // title: this.$t('syntaxHelp.phrase'),
                      value: ' "" '
                  },
                  '##': {
                      // title: this.$t('syntaxHelp.topic'),
                      value: ' ## '
                  },
                  'industry': {
                      // title: this.$t('syntaxHelp.industry'),
                      value: ' 行业:'
                  },
                  'field': {
                      // title: this.$t('syntaxHelp.field'),
                      value: ' 领域:'
                  },
                  'region': {
                      // title: this.$t('syntaxHelp.region'),
                      value: ' 地域:'
                  }
              },
              isKeywordHelper: false
          };
      },
      computed: {},
      components: {},
      mounted () {},
      watch: {},
      methods: {
          setWord (key, value) {
              this.$emit('set-word', {
                  key,
                  value
              });
          },
          showOrHiddenKeywordHelper () {
              this.isKeywordHelper = !this.isKeywordHelper;
          }
      }
  };
</script>

<style lang="less" rel="stylesheet/less">

</style>
