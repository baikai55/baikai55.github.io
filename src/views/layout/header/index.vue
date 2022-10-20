<template>
    <div class="header">
        <el-header>
            <div class="left">
                <img class="logo" src="@/assets/images/login/logo.png" alt="">
                <span>警长伙伴后台管理系统</span>
            </div>
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

    .left {
        display: flex;
        align-items: center;

        .logo {
            margin-right: 20px;
            width: 36px;
            height: 36px;
        }
    }

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