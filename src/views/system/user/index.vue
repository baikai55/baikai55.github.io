<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="queryParams" inline ref="queryParams" size="mini">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="queryParams.userName" placeholder="请输入用户名" clearable style="width: 150px" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="info" icon="el-icon-refresh" @click="reset">
                            重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 搜索结束 -->
        </div>
        <div class="table-control-main">
            <div class="m_text">
                <p>用户列表</p>
                <div class="user-control-btn">
                    <div>
                        <el-button id="newstaff" icon="el-icon-plus" size="small" @click="newParams">新增</el-button>
                        <template>
                            <el-button v-if="deleteAllTemp.length <= 0" icon="el-icon-delete" size="small"
                                @click="deleteAll">批量删除
                            </el-button>
                            <el-popconfirm v-else title="确认删除选中的数据？" @confirm="confirmDelAll">
                                <el-button slot="reference" id="deleteAll" icon="el-icon-delete" size="small">批量删除
                                </el-button>
                            </el-popconfirm>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="table">
            <Table :table="table" ref="table" @handButton="handButton" @select="select" @selectAll="selectAll"
                @confirmDel="confirmDel"></Table>
        </div>
        <div class="pagination">
            <Pagination background @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
                :total="pagination.total" :pageNum="pagination.pageNum" :pageSize="pagination.pageSize">
            </Pagination>
        </div>
        <el-dialog :title="title" :visible.sync="dialogVisibleNew" :before-close="handleClose">
            <div class="content-dia">
                <el-form ref="formNew" :model="formNew" label-width="80px">
                    <el-form-item label="用户名" prop="userName">
                        <el-input placeholder="请输入内容" v-model="formNew.userName">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input placeholder="请输入内容" v-model="formNew.realName">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="所属机构" prop="parentId">
                        <el-select v-model="formNew.parentId" placeholder="请选择">
                            <el-option v-for="item in optionsNew" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="formNew.password" placeholder="请输入内容"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="rePassword">
                        <el-input v-model="formNew.rePassword" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="formNew.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="角色" prop="roles">
                        <el-select v-model="formNew.roles" multiple placeholder="请选择角色" @change="changeRole">
                            <el-option v-for=" item in rolesData" :key="item.id" :label="item.roleName"
                                :value="item.id">
                            </el-option>
                        </el-select>

                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newParamsComfigCancel">取 消</el-button>
                <el-button v-if="title=='新增'" type="primary" @click="newParamsComfig">确 定</el-button>
                <el-button v-else type="primary" @click="updateComfig">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    createData, getTableList, update, del, deleteBatch, getOne
} from '@/api/system/user';
import { deptList } from '@/api/system/dept';
import { getRoleList } from '@/api/system/role';
export default {
    data() {
        return {
            title: '',
            deletelTemp: '',
            deleteAllTemp: [],
            //新增
            dialogVisibleNew: false,
            formNew: {
                sex: "",
                userName: "",
                realName: "",
                userType: '',
                password: '',
                rePassword: "",
                parentId: '',
                roleIds: [],
                //使用roleIds未知原因，动画不展示
                roles: []
            },
            optionsNew: [],
            queryParams: {
                realName: "",
                userName: "",
                isDisabled: "",
            },
            dept: {},
            role: {},
            rolesData: [],
            pagination: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
            },
            table: {
                tableData: [],
                header: [
                    { selection: true, width: "70px" },
                    { prop: "userName", label: "用户名", minWidth: "120px" },
                    { prop: "realName", label: "姓名", minWidth: "120px" },
                    {
                        prop: "userType", label: "用户类型", width: "120px", status: true, filters: (val) => val == 0 ? '普通' :
                            val == 1 ? '管理员' : val = 99 ? '系统管理员' : val
                    },
                    //性别｜1男｜2 女｜0未知
                    { prop: "sex", label: "性别", minWidth: "120px", status: true, filters: (val) => val == 1 ? '男' : val == 2 ? '女' : val == 0 ? '未知' : val },
                    {
                        prop: "", label: "操作", width: "120px", control: true, fixed: 'right',
                        tableOption: [
                            { type: "text", label: "修改", size: "mini", methods: "update", },
                            { type: "text", label: "删除", title: "这是一段内容确定删除吗？", size: "mini", methods: "delete", },
                        ]
                    }
                ]
            }
        };
    },
    mounted() {
        this.getdeptlist()
        this.getRole()
    },
    created() {
        this.getTable()
    },
    methods: {
        //选择角色
        changeRole(val) {
            this.formNew.roleIds = val
            console.log(val, this.formNew.roleIds);
        },
        reset() {
            this.queryParams = {
                realName: "",
                userName: "",
                isDisabled: "",
            }
            this.getTable()
        },
        search() {
            let temp = Object.assign({}, this.pagination, this.queryParams)
            console.log(temp);
            getTableList(temp).then(res => {
                this.table.tableData = res.result.records
                this.pagination.total = res.result.total
            })
        },
        // 批量删除
        deleteAll() {
            if (this.deleteAllTemp.length <= 0) {
                this.$message({
                    message: '请选择要删除的数据',
                    type: 'warning'
                });
            }
        },
        //获取角色列表
        getRole() {
            getRoleList(this.role).then(res => {
                this.rolesData = res.result
            })
        },
        //表格操作传参
        handButton(val) {
            if (val.methods == 'delete') {
                this.deletelTemp = val.row;
            } else if (val.methods == 'update') {
                this.updateTable(val.row)
            }
        },
        //确认删除
        confirmDel() {
            del(this.deletelTemp).then(res => {
                console.log(res, 'deleteTable');
                this.getTable()
            })
        },
        //批量删除
        confirmDelAll() {
            deleteBatch(this.deleteAllTemp).then(res => {
                console.log(res, 'deleteAll');
                this.deleteAllTemp = []
                this.getTable()
            })
        },
        //修改
        updateTable(val) {
            this.title = '修改';
            this.formNew = val
            getOne(val.id).then(res => {
                let tempId = []
                res.result.roles.forEach(element => {
                    tempId.push(element.id)
                })
                this.formNew.roles = tempId
                this.dialogVisibleNew = true;
            })

        },
        // 机构列表
        getdeptlist() {
            deptList(this.dept).then(res => {
                this.optionsNew = res.result
            })
        },
        // 获取表格数据
        getTable() {
            getTableList(this.pagination).then(res => {
                this.table.tableData = res.result.records
                this.pagination.total = res.result.total
            })
        },
        //新增
        newParams() {
            this.title = '新增'
            this.dialogVisibleNew = true
            this.resetForm()
        },
        // 新增-确认
        newParamsComfig() {
            this.dialogVisibleNew = false
            createData(this.formNew).then(res => {
                console.log(res)
                this.resetForm()
                if (res.errCode == 200) {
                    this.$message({
                        message: `${res.errMsg}`,
                        type: 'success'
                    });
                    this.getTable()
                }
            })
        },
        // 更新-确认
        updateComfig() {
            this.dialogVisibleNew = false
            update(this.formNew).then(res => {
                if (res.errCode == 200) {
                    this.$message({
                        message: `${res.errMsg}`,
                        type: 'success'
                    });
                    this.getTable()
                } else {
                    this.$message({
                        message: `${res.errMsg}`,
                        type: 'error'
                    });
                }
            })
        },
        // 新增-取消
        newParamsComfigCancel() {
            this.dialogVisibleNew = false
            this.resetForm()
        },
        // 重置表单
        resetForm() {
            this.formNew = {
                sex: "",
                userName: "",
                realName: "",
                userType: '',
                password: '',
                rePassword: "",
                parentId: '',
                roleIds: [],


            }
        },
        //离开弹出框
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.resetForm()
                    done();
                })
                .catch(_ => { });
        },
        //单选
        select(val) {
            let temlCurrent = val.current
            let temp = temlCurrent.map(item => {
                return item.id
            })
            this.deleteAllTemp = temp
        },
        //全选
        selectAll(val) {
            console.log(val);
            let temp = val.map(item => {
                return item.id
            })
            this.deleteAllTemp = temp
        },

        // 分页器一页显示多少条
        handleSizeChange(val) {
            this.pagination.pageSize = val.pageSize;
            this.getTable();
        },
        // 分页器当前页
        handleCurrentChange(val) {
            this.pagination.pageNum = val.currentPage;
            this.getTable();
        },

    }
}
</script>

<style>

</style>