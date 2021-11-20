<template>
  <div class="app-wrap">
    <el-container>
      <el-header>
        <h1>{{ title }}</h1>
      </el-header>
      <el-main>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动画演示" name="animateDome">
            <animate-dome></animate-dome>
          </el-tab-pane>
          <el-tab-pane label="接口演示" name="interfaceDome">
            <interface-dome></interface-dome>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import animateDome from './animate-dome.vue';
  import interfaceDome from './interface-dome.vue';
  
  export default {
    name: 'index-wrap',
    data() {
      return {
        title: '开始dome演示',
        activeName: 'interfaceDome',
        tabList: [
          {key: 'animateDome', label: '动画演示'},
          {key: 'interfaceDome', label: '接口演示'}
        ]
      }
    },
    components: {
      animateDome,
      interfaceDome
    },
    methods: {
      showAnimation() {
        this.$refs.box.style.animationName = 'bounceIn';
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" src="./less/index.less" scoped>
</style>
