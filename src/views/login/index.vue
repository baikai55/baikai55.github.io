<template>
    <div id="login">
        <div class="dunpai">
            <div class="title">
                <img src="@/assets/images/login/logo.png" alt="logo"><span>警长伙伴</span>
            </div>
            <div class="login">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" prefix-icon="el-icon-login-user" placeholder="请输入账号">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"
                            prefix-icon="el-icon-login-password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item class="loginbtn">
                        <span @click="submitForm('ruleForm')">登录</span>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="remember">记住密码</el-checkbox>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>
<script>
import router, { initAsyncRouter } from '@/router';
import { login, routerBase } from '@/api/login';
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
            loading: false,
            remember: false,
            ruleForm: {
                username: "root",
                password: "123456",
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
                    this.loading = true;
                    login(this.ruleForm).then(res => {
                        console.log(res);
                        store.commit('set_token', res.result.token);
                        store.commit('set_userName', res.user);
                        routerBase().then(res => {
                            this.loading = false;
                            console.log(res.result, 'role');
                            store.commit('set_userRole', res.result);
                            initAsyncRouter();
                            router.push({ path: res.result[0].children[0].path });
                        })
                    })
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
    position: relative;
    background: url("@/assets/images/login/bg.png") no-repeat;
    background-size: 100% 100%;


    :deep .dunpai {
        width: 5.5rem;
        height: 5.8rem;
        background: url("@/assets/images/login/dunpai.png") no-repeat;
        background-size: 5.5rem 5.8rem;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;


        .title {
            position: absolute;
            top: 17%;
            left: 30%;
            z-index: 33;
            display: flex;
            align-items: center;

            img {
                width: 0.45rem;
                height: 0.45rem;
            }

            span {
                margin-left: 10px;
                font-size: 36px;
                color: #fff;
            }
        }

        .login {
            background: url("@/assets/images/login/login.png") no-repeat;
            background-size: 6.2rem 2.5rem;
            width: 6.2rem;
            height: 2.5rem;
            position: absolute;
            top: 50%;
            margin-top: -1rem;
            left: 50%;
            margin-left: -3rem;
            display: flex;
            flex-direction: column;
            align-content: space-between;
            flex-wrap: nowrap;
            justify-content: space-around;
            align-items: flex-start;

            /* 添加用户名密码小图标 */
            .el-icon-login-user {
                background: url(@/assets/images/login/user.png) center no-repeat;
                background-size: contain;
            }

            .el-icon-login-user:before {
                content: "\66ff";
                font-size: 16px;
                visibility: hidden;
            }

            .el-icon-login-password {
                background: url(@/assets/images/login/pass.png) center no-repeat;
                background-size: contain;
            }

            .el-icon-login-password:before {
                content: "替";
                font-size: 16px;
                visibility: hidden;
            }

            .el-input__prefix {
                left: 10px;
            }

            .el-input--prefix .el-input__inner {
                padding-left: 40px;
            }


            .el-form-item.loginbtn {
                position: absolute;
                top: 41%;
                right: 11%;

                span {
                    font-size: 40px;
                    color: #0366CE;
                    cursor: pointer;
                }
            }

            .el-form-item.code {
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

        .el-checkbox {
            span.el-checkbox__label {
                color: #000;
            }
        }

        .el-checkbox__input .el-checkbox__inner {
            border-radius: 50%;
        }

        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: transparent !important;
            border: 1px solid #fff !important;
            border-radius: 50%;
        }

        .el-checkbox__inner:hover {
            border-color: #fff;
        }

        .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #fff;
        }

        .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #fff !important;
        }


    }
}
</style>