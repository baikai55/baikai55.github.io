<template>
    <div class="header">
        <el-header>
            <p>Header</p>
            <div class="username">
                {{user}}
                <div class="logout" @click="logout">
                    退出
                </div>
            </div>
        </el-header>
    </div>
</template>

<script>
import router from '@/router'
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['userName'])
    },
    data() {
        return {
            user: ''
        }
    },
    created() {
        this.user = this.userName
    },
    methods: {
        logout() {
            localStorage.clear()
            router.push({ path: '/login' })
            location.reload()
        }
    },
}
</script>

<style lang="scss" scoped>
header.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .username {
        text-align: center;
        min-width: 50px;
        cursor: pointer;
        position: relative;

        .logout {
            cursor: pointer;
            display: none;
            position: absolute;
            width: 100%;
            text-align: center;
        }
    }

    .username:hover .logout {
        display: block;
    }
}
</style>