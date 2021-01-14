<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <button @click="onSetCookie">set cookie</button>
    <button @click="onGetCookie">get cookie</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const { ipcRenderer } = require('electron')

export default defineComponent({
  name: 'Home',
  components: {
  },
  methods: {
    onSetCookie() {
      const ok = ipcRenderer.sendSync('cookie', 'set', {
        url: 'https://www.baidu.com',
        name: 'name',
        value: 'yyj'
      })
    },
    onGetCookie() {
       const cookie = ipcRenderer.sendSync('cookie', 'get', {})
        console.log('cookie', cookie)
    }
  }
});
</script>
