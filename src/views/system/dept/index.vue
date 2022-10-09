<template>
    <div>
        <h1>dept</h1>
        <el-button type="primary" @click="update">更新</el-button>
        <el-button type="primary" @click="Login">登录</el-button>
    </div>
</template>

<script>
import { login } from '@/api/login';
import { getRoles } from '@/api/user';
import { initAsyncRouter } from '@/router';
import store from '@/store';
export default {
    methods: {
        Login() {
            login(a).then(res => {
                console.log(res);
            });
        },
        update() {
            getRoles('admin').then(res => {
                this.consloeAsync()
                console.log(res);
                store.commit('set_userRole', res);
                initAsyncRouter();
            });
        },
        async consloeAsync() {
            const res = await getRoles('admin');
            console.log(res, 'consloeAsync');
        }
    }
}
</script>

<style>

</style>