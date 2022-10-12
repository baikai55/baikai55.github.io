<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                    label-width="68px">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="queryParams.roleName" placeholder="请输入角色名称" clearable
                            @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索
                        </el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置
                        </el-button>
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
                        <el-button id="newstaff" icon="el-icon-plus" size="small" @click="handleAdd">新增</el-button>
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
        <!-- 添加或修改角色配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
            <div class="content-dia">
                <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="form.roleName" placeholder="请输入角色名称" />
                    </el-form-item>
                    <!-- <el-form-item label="角色状态" prop="isDisabled">
                        <el-select v-model="form.isDisabled" placeholder="请选择">
                            <el-option label="停用" :value="1"></el-option>
                            <el-option label="启用" :value="0"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item prop="roleKey">
                        <span slot="label">
                            <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                            权限字符
                        </span>
                        <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
                    </el-form-item>
                    <el-form-item label="菜单权限">
                        <el-checkbox v-model="form.menuCheckStrictly"
                            @change="handleCheckedTreeConnect($event, 'menu')">
                            父子联动
                        </el-checkbox>
                        <el-tree class="tree-border" :data="menuOptions" show-checkbox ref="menu" node-key="id"
                            :default-checked-keys="form.menuIds" :check-strictly="menuCheckStrictly"
                            empty-text="加载中，请稍候" :props="defaultProps" @check="trees"></el-tree>
                    </el-form-item>
                    <!-- <el-form-item label="备注">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item> -->
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import {
    getRolePage,
    getRoleList,
    getRoleDel,
    PutRoleUpdata,
    getRoleCreate,
    getRoleGetOne,
    getDelRolBatch,
    deleteBatch
} from "@/api/system/role";
import { menulist } from "@/api/system/menu";

export default {
    data() {
        return {
            pagination: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
            },
            deleteAllTemp: [],
            deleteTemp: '',
            menuCheckStrictly: false,
            // 遮罩层
            loading: false,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            // 字典表格数据
            SysRoleList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 菜单列表
            menuOptions: [],
            ids: [],
            menuList: [],
            // 日期范围
            dateRange: [],
            // 是否显示弹出层（数据权限）
            openDataScope: false,
            menuExpand: false,
            menuNodeAll: false,
            deptExpand: true,
            deptNodeAll: false,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                //数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）
                dataScope: undefined,
                //部门树选择项是否关联显示
                deptCheckStrictly: undefined,
                //其他描述
                description: undefined,
                //是否禁用｜0否｜1是
                isDisabled: undefined,
                //角色权限字符串
                roleKey: undefined,
                //角色名称
                roleName: undefined,
            },
            query: {
                id: "",
                //角色权限字符串
                roleKey: undefined,
                //角色名称
                roleName: undefined,
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                dataScope: [
                    {
                        required: true,
                        message: "数据范围",
                        trigger: "blur",
                    },
                ],
                deptCheckStrictly: [
                    {
                        required: true,
                        message: "部门树",
                        trigger: "blur",
                    },
                ],
                description: [
                    { required: true, message: "其他描述不能为空", trigger: "blur" },
                ],
                isDisabled: [
                    {
                        required: true,
                        message: "是否禁用",
                        trigger: "blur",
                    },
                ],
                roleKey: [
                    {
                        required: true,
                        message: "角色权限字符串不能为空",
                        trigger: "blur",
                    },
                ],
                roleName: [
                    { required: true, message: "角色名称不能为空", trigger: "blur" },
                ],
            },
            defaultProps: {
                children: "children",
                label: "menuName",
            },
            table: {
                tableData: [],
                header: [
                    { selection: true, width: "70px" },
                    { prop: "roleName", label: "角色名称", minWidth: "120px" },
                    { prop: "roleKey", label: "权限字符", minWidth: "120px" },
                    //0否｜1是
                    { prop: 'isDisabled', label: "状态", minWidth: "120px", status: true, filters: (val) => val == 0 ? '启用' : '禁用' },
                    { prop: "createTime", label: "创建时间", minWidth: "180px" },
                    {
                        prop: "", label: "操作", width: "120px", control: true, fixed: 'right',
                        tableOption: [
                            { type: "text", label: "修改", size: "mini", methods: "update", },
                            { type: "text", label: "删除", title: "确定删除吗？", size: "mini", methods: "delete", },
                        ]
                    }
                ]
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            getRolePage(this.queryParams).then((res) => {
                this.table.tableData = res.result.records;
                this.pagination.total = res.result.total;
            });
        },
        // 获取菜单信息
        getMenuList() {
            menulist(this.query).then((res) => {
                this.menuOptions = this.handleTree(res.result, "id");
            });
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                dataScope: undefined,
                deptCheckStrictly: undefined,
                description: undefined,
                id: undefined,
                isDisabled: undefined,
                menuCheckStrictly: true,
                roleKey: undefined,
                roleName: undefined,
                menuIds: [],
            };
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.loading = true;
            this.queryParams.pageNum = 1;
            this.queryParams.pageSize = 10;
            this.getList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.dateRange = [];
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                dataScope: undefined,
                deptCheckStrictly: undefined,
                description: undefined,
                id: undefined,
                isDisabled: undefined,
                roleKey: undefined,
                roleName: undefined,
                menuIds: undefined
            };
            this.getList();
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.getMenuList();
            this.open = true;
            this.title = "新增角色";
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map((item) => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        // 修改
        handleUpdate(row) {
            this.getMenuList();
            const dictId = row.id;
            getRoleGetOne(dictId).then((res) => {
                let arr = [];
                res.result.menuIds.forEach((element) => {
                    return arr.push(element * 1);
                });
                this.form = res.result;
                this.form.menuIds = arr;
                this.form.menuList = res.result.menuList;
                this.menuCheckStrictly = true;
                this.$nextTick(() => {
                    this.$refs.menu.setCheckedKeys(arr);
                    this.menuCheckStrictly = false;
                });
                this.open = true;
                this.title = "修改角色";
            });
        },
        // 更改用户状态
        handleStatusChange(row) {
            let text = row.isDisabled == "0" ? "启用" : "禁用";
            this.$confirm(`确定要${text}${row.roleName}用户么`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    PutRoleUpdata(row).then((res) => {
                        this.getList();
                        this.$message({
                            type: res.success ? "success" : "warning",
                            message: res.success ? `${text}成功` : `${text}失败`,
                        });
                    });
                })
                .catch((res) => {
                    row.isDisabled = row.isDisabled == "0" ? "1" : "0";
                    this.getList();
                });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    if (this.title == "新增角色") {
                        var form = {
                            roleName: this.form.roleName,
                            roleKey: this.form.roleKey,
                            menuIds: this.ids,
                            remark: this.form.remark,
                            menuList: this.menuList,
                        };
                        this.form = form;

                        //创建角色接口
                        getRoleCreate(this.form).then((res) => {
                            this.open = false;
                            this.getList();
                            this.reset();
                            this.$message({
                                message: res.errMsg,
                                type: res.success ? "success" : "error",
                            });
                        });
                    } else {
                        this.form.menuIds = this.ids;
                        let arr = [];
                        this.form.menuIds.forEach((v) => {
                            return arr.push(v.toString());
                        });
                        this.form.menuIds = arr;
                        //修改角色接口
                        PutRoleUpdata(this.form).then((res) => {
                            console.log(this.form, 'from');
                            // return
                            this.open = false;
                            this.getList();
                            this.$message({
                                message: res.errMsg,
                                type: res.success ? "success" : "error",
                            });
                        });
                    }
                }
            });
        },
        // 树权限（父子联动）
        handleCheckedTreeConnect(value, type) {
            if (type == "menu") {
                this.form.menuCheckStrictly = value ? true : false;
            } else if (type !== "menu") {
                this.form.deptCheckStrictly = value ? false : true;
            }
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        trees(a, key) {
            let keys = key.halfCheckedKeys;
            this.ids = key.checkedKeys;
            this.ids = this.ids.concat(keys);
            this.menuList = key.checkedNodes;
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
        //表格操作传参
        handButton(val) {
            console.log(val, 'handButton');
            if (val.methods == 'delete') {
                this.deleteTemp = val.row
            } else if (val.methods == 'update') {
                this.handleUpdate(val.row);
            }
        },
        //确认删除
        confirmDel() {
            getRoleDel(this.deleteTemp).then((response) => {
                this.$message({
                    type: response.success ? "success" : "error",
                    message: response.success ? "删除成功" : "删除失败",
                });
                this.getList();
            });
        },
        //批量删除
        confirmDelAll() {
            deleteBatch(this.deleteAllTemp).then(res => {
                this.deleteAllTemp = [];
                this.getList()
            })
        },
        //修改
        handleUpdate(row) {
            this.getMenuList();
            const dictId = row.id;
            getRoleGetOne(dictId).then((res) => {
                let arr = [];
                res.result.menuIds.forEach((element) => {
                    return arr.push(element * 1);
                });
                this.form = res.result;
                this.form.menuIds = arr;
                this.form.menuList = res.result.menuList;
                this.menuCheckStrictly = true;
                this.$nextTick(() => {
                    this.$refs.menu.setCheckedKeys(arr);
                    this.menuCheckStrictly = false;
                });
                this.open = true;
                this.title = "修改角色";
            });
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
            this.getList();
        },
        // 分页器当前页
        handleCurrentChange(val) {
            this.pagination.pageNum = val.currentPage;
            this.getList();
        },

    }
}
</script>

<style>

</style>