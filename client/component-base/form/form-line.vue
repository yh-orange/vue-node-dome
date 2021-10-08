<template>
  <div class="form-line"
       :class="{
                'is-show-more': isHidden && showMore
               }">
    <div>
      <div class="form-line-label">
        <span>{{label ? (label + ':') : ''}}</span>
      </div>
    </div>
    <div>
      <div class="form-line-right">
      <span v-if="isMultiple">{{$t("common.canMultiple")}}
        <slot name="extendMultiple"></slot>
      </span>
        <span v-if="isHidden"
              @click="clickHandler"
              class="more-btn">
        {{$t("relationship.more")}}
      </span>
      </div>
    </div>
    <div class="form-line-content controls-row"
         ref="content">
      <slot></slot>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
      props: {
          isMultiple: {
              type: Boolean,
              default: false
          },
          isHidden: {
              type: Boolean,
              default: false
          },
          label: {
              type: String
          },
          labelWidth: {
              type: Number,
              default: 65
          },
          height: {
              type: Number
          }
      },
      data () {
          return {
              lineHeight: 38,
              isMore: false,
              showMore: false,
              defaultPaddingRight: 30,
              multiplePaddingRight: 40
          };
      },
      computed: {
          paddingRight () {
              let paddingRight = this.defaultPaddingRight;
              if (this.isMultiple) {
                  paddingRight += this.multiplePaddingRight;
              }
              return paddingRight;
          }
      },
      watch: {
          'isHidden' (val) {
              if (!val) {
                  this.showMore = false;
              }
          }
      },
      methods: {
          clickHandler () {
              this.showMore = !this.showMore;
              this.$nextTick(() => {
                  this.$emit('changed-show-more');
              });
          },
          checkIsOverflow () {
              if (!this.$refs.content) {
                  return false;
              }
              return this.$refs.content.offsetHeight > this.lineHeight;
          }
      }
  };
</script>

<style lang="less" rel="stylesheet/less" src="./less/form-line.less">
</style>