<template>
    <div>
        <h1>dept</h1>
        <el-button type="primary" @click="update">更新</el-button>
    </div>
</template>

<script>
import { getRoles } from '@/api/user';
import { initAsyncRouter } from '@/router';
import store from '@/store';
export default {
    methods: {
        update() {
            getRoles('admin').then(res => {
                console.log(res);
                store.commit('set_userRole', res);
                initAsyncRouter();
            });
        }
    }
}
</script>

<style>

</style>