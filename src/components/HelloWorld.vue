<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" name="button" v-on:click="getmsg">send</button>
    <button type="button" name="button" v-on:click="postmsg">send</button>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getmsg () {
      this.$axios.get('/api/request?dong=123').then(function (res) {
        console.log('res=', res.data)
      })
    },
    postmsg () {
      this.$axios.post('/api/get-data-test', {name: '123'}).then(function (res) {
        console.log('post res = ', res)
      })
    }
  }
}
</script>