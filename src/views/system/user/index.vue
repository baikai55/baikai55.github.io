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
        <el-dialog :title="title" :visible.sync="dialogVisibleNew" :close-on-click-modal="false">
            <div class="content-dia">
                <el-form ref="formNew" :model="formNew" label-width="100px" :rules="rules">
                    <el-form-item label="用户名" prop="userName">
                        <el-input placeholder="请输入用户名" v-model="formNew.userName">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input placeholder="请输入真实姓名" v-model="formNew.realName">
                        </el-input>
                    </el-form-item>
                    <el-form-item v-if="formNew.userType!=3" label="身份证号码" prop="idCardNumber">
                        <el-input placeholder="请输入身份证" v-model="formNew.idCardNumber">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="用户类型" prop="userType">
                        <el-select v-model="formNew.userType" placeholder="请选择用户类型" @change="changeType">
                            <el-option v-for=" item in userTypeData" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="formNew.password" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" v-if="formNew.userType!=3">
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
                <el-button v-if="title=='新增'" type="primary" @click="newParamsComfig('formNew')">确 定</el-button>
                <el-button v-else type="primary" @click="updateComfig">确 定</el-button>
                <el-button @click="newParamsComfigCancel">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    createData, getTableList, update, del, deleteBatch, getOne, getType, getAllType
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
                idCardNumber: "",
                userType: '',
                password: '',
                organizationId: '',
                roleIds: [],
                //使用roleIds未知原因，动画不展示
                roles: [],
                userType: "",

            },
            rules: {
                organizationId: [
                    { required: true, message: '请选择机构', trigger: 'blur' },
                ],
            },
            //id  roleName
            userAllTypeData: [],
            userTypeData: [
                // // 用户类型(0普通｜1管理员|2机构|3民警|4辅警|99系统管理员)
                // { id: 0, name: '普通' },
                // { id: 1, name: '管理员' },
                // { id: 2, name: '机构' },
                // { id: 3, name: '民警' },
                // { id: 4, name: '辅警' },
                // { id: 99, name: '系统管理员' },
            ],
            optionsNew: [],
            queryParams: {
                realName: "",
                userName: "",
                isDisabled: "",
            },
            dept: {},
            role: {},
            rolesData: [

            ],

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
                        prop: "userType", label: "用户类型", width: "120px", status: true, filters: (val) => {
                            let temp = ''
                            this.userAllTypeData.forEach(element => {
                                return element.id == val ? temp = element.type : val
                            });
                            return temp
                        }
                    },
                    //性别｜1男｜2 女｜0未知
                    { prop: "sex", label: "性别", minWidth: "120px", status: true, filters: (val) => val == 1 ? '男' : val == 2 ? '女' : val == 0 ? '未知' : val },
                    {
                        prop: "", label: "操作", width: "120px", control: true, fixed: 'right',
                        tableOption: [
                            { type: "text", label: "修改", size: "mini", methods: "update", role: (userType) => userType == 5 ? false : true, },
                            { type: "text", label: "删除", title: "确定删除吗？", size: "mini", methods: "delete", role: (userType) => userType == 5 ? false : true, },
                        ]
                    }
                ]
            }
        };
    },
    mounted() {
        // this.getdeptlist()
        this.getRole()
    },
    created() {
        this.getTable()
        this.getTypeData()
        this.getAllTypeData()
    },
    methods: {
        //获取所有类型
        getAllTypeData() {
            getAllType().then(res => {
                console.log(res);
                if (res.errCode == 200) {
                    this.userAllTypeData = res.result
                }
            })
        },
        // 用户类型数据
        getTypeData() {
            getType().then(res => {
                console.log(res, 'res.result');
                let temp = res.result.map((item, index) => {
                    let temp = Object.keys(item).toString()
                    let temp2 = Object.values(item).toString()
                    return {
                        id: Number(temp),
                        name: temp2
                    }
                })
                this.userTypeData = temp
            })
        },
        //选择角色
        changeRole(val) {
            this.formNew.roleIds = val
            console.log(val, this.formNew.roleIds);
        },
        // 选择类型
        changeType(val) {
            this.formNew.userType = val
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
            getOne(val.id).then(res => {
                if (res.errCode == 200) {
                    let tempId = []
                    this.formNew = res.result
                    res.result.roles.forEach(element => {
                        return tempId.push(element.id)
                    })
                    this.formNew.roles = tempId
                    this.dialogVisibleNew = true;
                }
            })
        },
        // // 机构列表
        // getdeptlist() {
        //     deptList(this.dept).then(res => {
        //         console.log(res, 'deptList');
        //         this.optionsNew = res.result
        //     })
        // },
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
        newParamsComfig(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
                organizationId: '',

            }
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