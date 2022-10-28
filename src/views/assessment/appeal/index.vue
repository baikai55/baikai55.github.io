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
                <p>申诉列表</p>
                <div class="user-control-btn">
                    <div>
                        <template v-if="userType!=5">
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
                    <el-form-item label="申诉人" prop="appealUserId">
                        <el-select v-model="formNew.appealUserId" placeholder="请选择" disabled>
                            <el-option v-for="item in userListData" :key="item.id" :label="item.realName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务名称" prop="taskName">
                        <el-input v-model="formNew.taskName" disabled> </el-input>
                    </el-form-item>
                    <el-form-item label="申诉理由" prop="appealReason">
                        <el-input v-model="formNew.appealReason" disabled> </el-input>
                    </el-form-item>
                    <template v-if="title=='详细'">
                        <el-form-item label="申诉状态" prop="appealState">
                            <el-radio-group v-model="formNew.appealState" disabled>
                                <el-radio :label="0">待审核</el-radio>
                                <el-radio :label="1">已审核</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="申诉审核人" prop="appealChecker">
                            <el-select v-model="formNew.appealChecker" placeholder="请选择" disabled>
                                <el-option v-for="item in userListData" :key="item.id" :label="item.realName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="审核结果" prop="checkResult">
                            <el-radio-group v-model="formNew.checkResult" disabled>
                                <el-radio label="0">通过</el-radio>
                                <el-radio label="1">驳回</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="审核描述" prop="checkRemark">
                            <el-input v-model="formNew.checkRemark" disabled> </el-input>
                        </el-form-item>
                    </template>
                    <el-form-item label="附件" prop="attachmentId">
                        <template>
                            <img :src="item.fileUrl" alt="" v-for="item in formNew.fileList" :key="item.id" width="100"
                                @click="ImgClick(item.fileUrl)" />
                        </template>
                    </el-form-item>
                    <template v-if="title == '处理'">
                        <el-form-item label="审核描述" prop="checkRemark">
                            <el-input v-model="formNew.checkRemark"> </el-input>
                        </el-form-item>
                        <el-form-item label="申诉结果" prop="checkResult">
                            <el-radio-group v-model="formNew.checkResult">
                                <el-radio label="0">通过</el-radio>
                                <el-radio label="1">驳回</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newParamsComfigCancel">取 消</el-button>
                <el-button v-if="title == '处理'" type="primary" @click="updateComfig">确 定</el-button>
                <el-button v-else type="primary" @click="dialogVisibleNew = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisibleImg">
            <img :src="dialogVisibleImgUrl" alt="" class="bigImg" />
        </el-dialog>
    </div>
</template>

<script>
import {
    createData,
    getTableList,
    update,
    del,
    deleteBatch,
    getOne,
    checkAppeal,
} from "@/api/assessment/appeal";
import { deptList } from "@/api/system/dept";
import { userList } from "@/api/system/user";
import { getRoleList } from "@/api/system/role";
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState(['userType']),
    },
    data() {
        return {
            title: "",
            deletelTemp: "",
            deleteAllTemp: [],
            //新增
            dialogVisibleNew: false,
            formNew: {
                appealChecker: null,
                appealReason: "",
                checkResult: null,
                appealTime: "",
                appealUserId: null,
                attachmentId: null,
                checkRemark: "",
                taskName: null,
            },
            rules: {
                organizationId: [{ required: true, message: "请选择机构", trigger: "blur" }],
            },
            userTypeData: [],
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
                    { prop: "taskName", label: "任务名称", minWidth: "120px" },
                    {
                        prop: "appealUserId",
                        label: "申诉人",
                        minWidth: "120px",
                        status: true,
                        filters: (val) => {
                            let temp = "";
                            this.userListData.forEach((element) => {
                                return element.id == val ? (temp = element.realName) : val;
                            });
                            return temp;
                        },
                    },
                    { prop: "appealReason", label: "申诉理由", minWidth: "120px" },
                    {
                        prop: "appealState",
                        label: "申诉状态",
                        width: "120px",
                        status: true,
                        filters: (val) => (val == 0 ? "待审核" : "已审核"),
                    },
                    { prop: "appealTime", label: "申诉时间", width: "180px" },
                    {
                        prop: "appealChecker",
                        label: "申诉审核人",
                        minWidth: "120px",
                        status: true,
                        filters: (val) => {
                            let temp = "";
                            this.userListData.forEach((element) => {
                                return element.id == val ? (temp = element.realName) : val;
                            });
                            return temp;
                        },
                    },
                    {
                        prop: "caozuo",
                        label: "操作",
                        control: true,
                        fixed: "right",
                        tableOption: [
                            {
                                type: "text",
                                label: "详细",
                                size: "mini",
                                role: (userType) => (userType == 5 ? true : true),
                                methods: "details",
                            },
                            {
                                type: "text",
                                label: "处理",
                                size: "mini",
                                methods: "update",
                                role: (userType) => (userType == 5 ? false : true),
                                disabled: (val) => (val == 0 ? false : true),
                            },
                            {
                                type: "text",
                                label: "删除",
                                title: "确定删除吗？",
                                size: "mini",
                                methods: "delete",
                                role: (userType) => (userType == 5 ? false : true),
                            },
                        ],
                    },
                ],
            },
            userListData: [],
            dialogVisibleImg: false,
            dialogVisibleImgUrl: "",
        };
    },
    mounted() {
        // this.getdeptlist()
        // this.getRole()
    },
    created() {
        this.getTable();
        this.getuserList();
    },
    methods: {
        //图片放大
        ImgClick(val) {
            console.log(val);
            this.dialogVisibleImg = true;
            this.dialogVisibleImgUrl = val;
        },
        getuserList() {
            userList({}).then((res) => {
                this.userListData = res.result;
            });
        },
        //选择角色
        changeRole(val) {
            this.formNew.roleIds = val;
            console.log(val, this.formNew.roleIds);
        },
        // 选择类型
        changeType(val) {
            this.formNew.userType = val;
        },
        reset() {
            this.queryParams = {
                realName: "",
                userName: "",
                isDisabled: "",
            };
            this.getTable();
        },
        search() {
            let temp = Object.assign({}, this.pagination, this.queryParams);
            console.log(temp);
            getTableList(temp).then((res) => {
                this.table.tableData = res.result.records;
                this.pagination.total = res.result.total;
            });
        },
        // 批量删除
        deleteAll() {
            if (this.deleteAllTemp.length <= 0) {
                this.$message({
                    message: "请选择要删除的数据",
                    type: "warning",
                });
            }
        },
        //获取角色列表
        getRole() {
            getRoleList(this.role).then((res) => {
                this.rolesData = res.result;
            });
        },
        //表格操作传参
        handButton(val) {
            if (val.methods == "delete") {
                this.deletelTemp = val.row;
            } else if (val.methods == "update") {
                this.updateTable(val.row);
            } else if (val.methods == "details") {
                this.details(val.row);
            }
        },
        //详细
        details(val) {
            this.title = "详细";
            getOne(val.id).then((res) => {
                if (res.errCode == 200) {
                    this.dialogVisibleNew = true;
                    this.formNew = res.result;
                }
            });
        },
        //确认删除
        confirmDel() {
            del(this.deletelTemp).then((res) => {
                console.log(res, "deleteTable");
                this.getTable();
            });
        },
        //批量删除
        confirmDelAll() {
            deleteBatch(this.deleteAllTemp).then((res) => {
                console.log(res, "deleteAll");
                this.deleteAllTemp = [];
                this.getTable();
            });
        },
        //处理
        updateTable(val) {
            this.title = "处理";
            getOne(val.id).then((res) => {
                if (res.errCode == 200) {
                    this.formNew = res.result;
                    this.dialogVisibleNew = true;
                }
            });
        },
        // 机构列表
        getdeptlist() {
            deptList(this.dept).then((res) => {
                console.log(res, "deptList");
                this.optionsNew = res.result;
            });
        },
        // 获取表格数据
        getTable() {
            getTableList(this.pagination).then((res) => {
                let temp = res.result.records.map(item => {
                    return {
                        taskName: item.taskName,
                        appealUserId: item.appealUserId,
                        appealReason: item.appealReason,
                        appealState: item.appealState,
                        appealTime: item.appealTime,
                        appealChecker: item.appealChecker,
                        appealState: item.appealState,
                        caozuo: item.appealState,
                        id: item.id,
                        taskId: item.taskId,
                    }
                })
                this.table.tableData = temp;
                this.pagination.total = res.result.total;
            });
        },
        //新增
        newParams() {
            this.title = "新增";
            this.dialogVisibleNew = true;
            this.resetForm();
        },
        // 新增-确认
        newParamsComfig(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.formNew, "formNew");
                    this.dialogVisibleNew = false;
                    createData(this.formNew).then((res) => {
                        console.log(res);
                        this.resetForm();
                        if (res.errCode == 200) {
                            this.$message({
                                message: `${res.errMsg}`,
                                type: "success",
                            });
                            this.getTable();
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        // 处理-确认
        updateComfig() {
            this.dialogVisibleNew = false;
            // this.formNew.appealState = 1
            let temp = this.formNew;
            checkAppeal(temp).then((res) => {
                if (res.errCode == 200) {
                    this.$message({
                        message: `${res.errMsg}`,
                        type: "success",
                    });
                    this.getTable();
                }
            });
        },
        // 新增-取消
        newParamsComfigCancel() {
            this.dialogVisibleNew = false;
            this.resetForm();
        },
        // 重置表单
        resetForm() {
            this.formNew = {
                sex: "",
                userName: "",
                realName: "",
                userType: "",
                password: "",
                rePassword: "",
                parentId: "",
                roleIds: [],
                organizationId: "",
            };
        },
        //单选
        select(val) {
            let temlCurrent = val.current;
            let temp = temlCurrent.map((item) => {
                return item.id;
            });
            this.deleteAllTemp = temp;
        },
        //全选
        selectAll(val) {
            console.log(val);
            let temp = val.map((item) => {
                return item.id;
            });
            this.deleteAllTemp = temp;
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
    },
};
</script>

<style>

</style>
