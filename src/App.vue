<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { initAsyncRouter } from './router';
export default {
  created() {
    initAsyncRouter();
  },
};
</script>
<style>
#app {
  background-color: #f5f5f5;
}
</style>
