<template>

</template>

<script>
import { routerBase } from '@/api/login';
import router from '@/router';
export default {
    created() {
        this.redirect()
    },
    methods: {
        redirect() {
            routerBase().then(res => {
                router.push({ path: res.result[0].children[0].path });
            })
        }
    }
}
</script>

<style>

</style>