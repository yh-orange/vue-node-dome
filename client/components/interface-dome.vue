<template>
  <div>
    <button type="button" name="button" v-on:click="getmsg">send</button>
    <button type="button" name="button" v-on:click="postmsg">send</button>
  </div>
</template>

<script>
  import api from '@/api/index.js';
    export default {
        name: "interface-dome",
      methods: {
        getmsg () {
          api.request({dong: '123'}).then(res=>{
            console.log(res && res.data);
          }).catch(error=>{
            console.log(error);
          })
        },
        postmsg () {
          api.getDataTest({name: '123'}).then(res=>{
            console.log(res && res.data);
          }).catch(error=>{
            console.log(error);
          })
        }
      }
    }
</script>

<style scoped>

</style>
