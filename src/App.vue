<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { routerBase } from './api/login';
import { initAsyncRouter } from './router';
import store from './store';

export default {
  created() {
    initAsyncRouter();

    // routerBase().then(res => {
    //   console.log(res, 'res');
    //   store.commit('set_userRole', res.result);
    // })
  },
};
</script>
<style>
#app {
  background-color: #f5f5f5;
}

.inline {
  display: inline-block;
  margin-left: 10px;
}
</style>
