<template>

</template>

<script>
import { getRoles } from '@/api/user';
import router from '@/router';
export default {
    created() {
        this.redirect()
    },
    methods: {
        redirect() {
            getRoles('admin').then(res => {
                router.push({ path: res[0].children[0].path })
            })
        }
    }
}
</script>

<style>

</style>