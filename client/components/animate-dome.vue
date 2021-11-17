<template>
  <div class="animate-dome">
    <div class="user-introduction">
      {{introduction}}
    </div>
    <div class="btn-box">
      <div v-for="item in animateNameList"
           class="btn-item"
           :key="item.key"
           @click="showAnimation(item.key)">
        <el-tooltip  v-if="clickItem === item.key" class="item" effect="dark" :content="tipContent" placement="top">
          <button :id="item.key" @dblclick="copy(item.key, 'innerText')">{{item.key}}</button>
        </el-tooltip>
        <button v-else :id="item.key" @dblclick="copy(item.key, 'innerText')">{{item.key}}</button>
      </div>
    </div>
    <div class="dome-box" ref="box"></div>
  </div>
</template>

<script>
  export default {
    name: "animate-dome",
    data: () => {
      return {
        animateNameList: [
          {key: 'bounce'},
          {key: 'flash'},
          {key: 'pulse'},
          {key: 'rubberBand'},
          {key: 'headShake'},
          {key: 'swing'},
          {key: 'tada'},
          {key: 'wobble'},
          {key: 'jello'},
          {key: 'bounceIn'},
          {key: 'bounceInDown'},
          {key: 'bounceInLeft'},
          {key: 'bounceInRight'},
          {key: 'bounceInUp'},
          {key: 'bounceOut'},
          {key: 'bounceOutDown'},
          {key: 'bounceOutLeft'},
          {key: 'bounceOutRight'},
          {key: 'bounceOutUp'},
          {key: 'fadeIn'},
          {key: 'fadeInDown'},
          {key: 'fadeInDownBig'},
          {key: 'fadeInLeft'},
          {key: 'fadeInLeftBig'},
          {key: 'fadeInRight'},
          {key: 'fadeInRightBig'},
          {key: 'fadeInUp'},
          {key: 'fadeInUpBig'},
          {key: 'fadeOut'},
          {key: 'fadeOutDown'},
          {key: 'fadeOutDownBig'},
          {key: 'fadeOutLeft'},
          {key: 'fadeOutLeftBig'},
          {key: 'fadeOutRight'},
          {key: 'fadeOutRightBig'},
          {key: 'fadeOutUp'},
          {key: 'fadeOutUpBig'},
          {key: 'flip'},
          {key: 'flipInX'},
          {key: 'flipInY'},
          {key: 'flipOutX'},
          {key: 'flipOutY'},
          {key: 'lightSpeedIn'},
          {key: 'lightSpeedOut'},
          {key: 'rotateIn'},
          {key: 'rotateInDownLeft'},
          {key: 'rotateInDownRight'},
          {key: 'rotateInUpLeft'},
          {key: 'rotateInUpRight'},
          {key: 'rotateOut'},
          {key: 'rotateOutDownLeft'},
          {key: 'rotateOutDownRight'},
          {key: 'rotateOutUpLeft'},
          {key: 'rotateOutUpRight'},
          {key: 'hinge'},
          {key: 'jackInTheBox'},
          {key: 'rollOut'},
          {key: 'rollIn'},
          {key: 'zoomIn'},
          {key: 'zoomInDown'},
          {key: 'zoomInLeft'},
          {key: 'zoomInRight'},
          {key: 'zoomInUp'},
          {key: 'zoomOut'},
          {key: 'zoomOutDown'},
          {key: 'zoomOutLeft'},
          {key: 'zoomOutRight'},
          {key: 'zoomOutUp'},
          {key: 'slideInDown'},
          {key: 'slideInRight'},
          {key: 'slideInUp'},
          {key: 'slideOutDown'},
          {key: 'slideOutLeft'},
          {key: 'slideOutRight'},
          {key: 'slideOutUp'}
        ],
        introduction: '此处的动画全部为css动画，使用的时候只需要将动画名字修改成你需要动画对应的名称集合。\n' +
          '点击查看动画效果，双击复制动画名称',
        tipContent: '',
        clickItem: '',
        timer:null
      }
    },
    methods: {
      showAnimation(name) {
        this.$refs.box.style.animationName = name;
      },
      /**
       * 一键粘贴
       * @param  {String} id [需要粘贴的内容]
       * @param  {String} attr [需要 copy 的属性，默认是 innerText，主要用途例如赋值 a 标签上的 href 链接]
       *
       * range + selection
       *
       * 1.创建一个 range
       * 2.把内容放入 range
       * 3.把 range 放入 selection
       *
       * 注意：参数 attr 不能是自定义属性
       * 注意：对于 user-select: none 的元素无效
       * 注意：当 id 为 false 且 attr 不会空，会直接复制 attr 的内容
       */
      copy (id, attr) {
        this.timer && clearTimeout(this.timer);
        let target = null;
    
        if (attr) {
          target = document.createElement('div');
          target.id = 'tempTarget';
          target.style.opacity = '0';
          if (id) {
            let curNode = document.querySelector('#' + id);
            target.innerText = curNode[attr];
          } else {
            target.innerText = attr;
          }
          document.body.appendChild(target);
        } else {
          target = document.querySelector('#' + id);
        }
    
        try {
          let range = document.createRange();
          range.selectNode(target);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
          document.execCommand('copy');
          window.getSelection().removeAllRanges();
          this.tipContent = '复制成功';
          this.clickItem = id;
        } catch (e) {
          this.tipContent = '复制失败';
          this.clickItem = id;
        }
    
        if (attr) {
          // remove temp target
          target.parentElement.removeChild(target);
        }
        setTimeout(()=>{
          this.tipContent = '';
          this.clickItem = '';
        }, 1200)
      }
    }
  }
</script>

<style lang="less" src="./less/animate-dome.less">

</style>
