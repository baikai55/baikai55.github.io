<template>
    <div id="login">
        <div class="login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账户：" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="验证码：" prop="code" class="code">
                    <template>
                        <div class="left">
                            <el-input v-model="ruleForm.code"></el-input>
                        </div>
                        <div class="right">
                            <img src="@/assets/images/example.png" alt="">
                        </div>
                    </template>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import router, { initAsyncRouter } from '@/router';
import { login, getRoles } from '@/api/user'
import store from '@/store';
export default {
    beforeRouteEnter(to, from, next) {
        if (sessionStorage.getItem('token')) {
            next({ path: '/' })
        } else {
            next()
        }
    },
    data() {
        return {
            ruleForm: {
                username: 'admin',
                password: '123456',
                code: '1',
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        // 登录
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    login(this.ruleForm).then(res => {
                        console.log(res);
                        store.commit('set_token', res.token);
                        store.commit('set_userName', res.username);
                        getRoles(res.role).then(res => {
                            console.log(res, 'role');
                            store.commit('set_userRole', res);
                            initAsyncRouter();
                            router.push({ path: '/' });
                            location.reload();
                        })
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>
<style lang="scss" scoped>
#login {
    width: 100vw;
    height: 100vh;

    .login {
        width: 500px;
        height: 500px;
        margin: 0 auto;

        :deep .el-form-item.code {
            .el-form-item__content {
                display: flex;

                .left {
                    width: 60%;
                }

                .right {
                    width: 40%;

                    img {
                        box-sizing: border-box;
                        width: 100%;
                        height: 40px;
                        padding-left: 15px;
                    }
                }
            }
        }
    }
}
</style>