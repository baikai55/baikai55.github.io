<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="searchFrom" inline ref="searchFrom" size="mini">
                    <el-form-item prop="userId" label="员工工号：">
                        <el-input v-model="searchFrom.userId"></el-input>
                    </el-form-item>
                    <el-form-item prop="userName" label="员工名称：">
                        <el-input v-model="searchFrom.userName"></el-input>
                    </el-form-item>
                    <el-form-item prop="telephone" label="手机号码：">
                        <el-input v-model="searchFrom.telephone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-search">查询
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="info" icon="el-icon-refresh">
                            重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 搜索结束 -->
        </div>
        <div class="table-control-main">
            <div class="m_text">
                <p>员工列表</p>
                <div class="user-control-btn">
                    <div>
                        <el-button id="newstaff" icon="el-icon-plus" size="small">新增</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchFrom: {
                userId: '',
                userName: '',
                telephone: '',
            },
        };
    },
}
</script>

<style>

</style>