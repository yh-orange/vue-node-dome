<template>
  <div>
    <button type="button" name="button" v-on:click="getmsg">get send</button>
    <button type="button" name="button" v-on:click="postmsg">post send</button>
    
    <div>返回结果为： {{message}}</div>
  </div>
</template>

<script>
  import api from '@/api/index.js';
  
  export default {
    name: "interface-dome",
    data() {
      return {
        message: ''
      };
    },
    methods: {
      getmsg() {
        api.request({dong: '123'}).then(res => {
          this.message = res && res.data;
        }).catch(error => {
          this.message = error;
        })
      },
      postmsg() {
        api.getDataTest({name: '123'}).then(res => {
          this.message = res && res.data;
        }).catch(error => {
          this.message = error;
        })
      }
    }
  }
</script>

<style scoped>

</style>
