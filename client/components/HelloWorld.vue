<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" name="button" v-on:click="getmsg">send</button>
    <button type="button" name="button" v-on:click="postmsg">send</button>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <br>
    <br>
    <br>
    <Button type="dashed" @click="showAnimation">go</Button>
    <div class="box" ref="box"></div>
  </div>
</template>

<script>
  import api from '@/api/index.js';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getmsg () {
      api.request({dong: '123'}).then(res=>{
        console.log(res && res.data);
      }).catch(error=>{
        console.log(error);
      })
      // this.$axios.get('/api/request?dong=123').then(function (res) {
      //   console.log('res=', res.data)
      // })
    },
    postmsg () {
      api.getDataTest({name: '123'}).then(res=>{
        console.log(res && res.data);
      }).catch(error=>{
        console.log(error);
      })
      // this.$axios.post('/api/get-data-test', {name: '123'}).then(function (res) {
      //   console.log('post res = ', res)
      // })
    },
    showAnimation () {
      this.$refs.box.style.animationName= 'bounceIn';
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" src="./less/HelloWorld.less" scoped>
</style>
