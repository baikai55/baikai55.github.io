<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="queryParams" inline ref="queryParams" size="mini">
                    <el-form-item prop="menuName" label="菜单名称">
                        <el-input v-model="queryParams.menuName" placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="visible" label="菜单状态">
                        <el-select v-model="queryParams.visible" placeholder="请选择">
                            <el-option label="正常" value="0"></el-option>
                            <el-option label="停用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-search" @click="handleQuery">查询
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="info" icon="el-icon-refresh" @click="resetQuery">
                            重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 搜索结束 -->
        </div>
        <div class="table-control-main">
            <div class="m_text">
                <p>菜单列表</p>
                <div class="user-control-btn">
                    <div>
                        <el-button id="newstaff" icon="el-icon-plus" size="small" @click="handleAdd">新增</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="table">
            <el-table ref="table" :height="tableHeightComputed" v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" :data="SysMenuList" style="width: 100%; margin-bottom: 20px"
                row-click="" row-key="id" :default-expand-all="false"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column label="菜单名称" prop="menuName" align="left" :show-overflow-tooltip="true"
                    min-width="130" />
                <el-table-column label="权限标识" align="center" prop="perms" :show-overflow-tooltip="true"
                    min-width="106" />
                <el-table-column label="组件路径" align="center" prop="component" :show-overflow-tooltip="true"
                    min-width="106" />
                <el-table-column label="菜单状态" align="center" prop="visible" :show-overflow-tooltip="true" width="106">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.visible == 0 ? 'success' : 'danger'">{{
                        scope.row.visible | getname
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime" width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createTime }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center" class-name="small-padding fixed-width" min-width="106"
                    fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleUpdate(scope.row)">修改
                        </el-button>
                        <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="菜单路径" prop="path">
                    <el-input v-model="form.path" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称" prop="menuName">
                    <el-input v-model="form.menuName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon">
                    <el-input v-model="form.icon" disabled></el-input>
                </el-form-item>
                <el-form-item label="菜单类型" prop="menuType">
                    <!-- <el-input v-model="form.menuType" placeholder="请输入内容"></el-input> -->
                    <el-radio v-model="form.menuType" label="M">目录</el-radio>
                    <el-radio v-model="form.menuType" label="C">菜单</el-radio>
                    <el-radio v-model="form.menuType" label="F">按钮</el-radio>
                </el-form-item>
                <el-form-item label="是否展示" prop="visible">
                    <el-switch v-model="form.visible" active-value="0" inactive-value="1">
                    </el-switch>
                </el-form-item>
                <el-form-item label="父菜单" prop="parentId" v-if="form.menuType !== 'M' && form.menuType == 'C'">
                    <el-select v-model="form.parentId" placeholder="请选择">
                        <el-option v-for="item in this.listM" :key="item.id" :label="item.menuName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="父菜单" prop="parentId" v-if="form.menuType !== 'M' && form.menuType == 'F'">
                    <el-select v-model="form.parentId" placeholder="请选择">
                        <el-option v-for="item in this.listC" :key="item.id" :label="item.menuName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限标识" prop="perms">
                    <el-input v-model="form.perms" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import {
    getMenuList,
    menulist,
    deldata,
    createData,
    putdate,
    getdateone,
} from "@/api/system/menu";
import { initAsyncRouter } from "@/router";
import { routerBase } from '@/api/login';
import store from '@/store';

export default {
    filters: {
        getname(row) {
            return row == 0 ? "可见" : "不可见";
        },
    },

    data() {
        return {
            //目录
            listM: [],
            //菜单
            listC: [],
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
            SysMenuList: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 日期范围
            dateRange: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                //组件路径
                component: undefined,
                //其他描述
                description: undefined,
                //菜单图标
                icon: undefined,
                //是否缓存（0缓存｜1不缓存）
                isCache: undefined,
                //是否为外链（0是｜1否）
                isFrame: undefined,
                //菜单名称
                menuName: undefined,
                //菜单类型(｜M目录｜C菜单｜F按钮)
                menuType: undefined,
                //显示顺序
                orderNum: undefined,
                //父菜单ID
                parentId: undefined,
                //路由地址
                path: undefined,
                //权限标识
                perms: undefined,
                //路由参数
                query: undefined,
                //菜单状态（0显示 1隐藏）
                visible: undefined,
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                component: [
                    { required: true, message: "组件路径不能为空", trigger: "blur" },
                ],
                description: [{ message: "其他描述不能为空", trigger: "blur" }],
                icon: [{ message: "菜单图标不能为空", trigger: "blur" }],
                isCache: [
                    {
                        required: true,
                        message: "是否缓存（0缓存｜1不缓存）不能为空",
                        trigger: "blur",
                    },
                ],
                isFrame: [
                    {
                        required: true,
                        message: "是否为外链（0是｜1否）不能为空",
                        trigger: "blur",
                    },
                ],
                menuName: [
                    { required: true, message: "菜单名称不能为空", trigger: "blur" },
                ],
                menuType: [
                    {
                        required: true,
                        message: "菜单类型(｜M目录｜C菜单｜F按钮)不能为空",
                        trigger: "blur",
                    },
                ],
                orderNum: [
                    { required: true, message: "显示顺序不能为空", trigger: "blur" },
                ],
                parentId: [
                    { required: true, message: "父菜单ID不能为空", trigger: "blur" },
                ],
                path: [
                    { required: true, message: "路由地址不能为空", trigger: "blur" },
                ],
                perms: [
                    { required: true, message: "权限标识不能为空", trigger: "blur" },
                ],
                query: [
                    { required: true, message: "路由参数不能为空", trigger: "blur" },
                ],
                visible: [
                    {
                        required: true,
                        message: "菜单状态（0显示 1隐藏）不能为空",
                        trigger: "blur",
                    },
                ],
            },
            searchFrom: {
                paramGrade: '',
                name: '',
            },
            pagination: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
            },
            tableHeight: 0,
            itemHeaderHeight: 0,
        };
    },
    computed: {
        /* 计算表格高度 */
        tableHeightComputed() {
            return this.tableHeight - this.itemHeaderHeight + 'px';
        },
    },
    mounted() {
        addEventListener("resize", this.resize);
    },
    destroyed() {
        removeEventListener("resize", this.resize);
        //表格动态高度销毁
    },
    created() {
        this.getList();
        this.$nextTick(() => {
            let clientHeight = document.documentElement.clientHeight;
            let itemHeaderHeight =
                this.$refs["table"].$el.getBoundingClientRect().top + 50;
            this.tableHeight = clientHeight - itemHeaderHeight;
        });
    },
    methods: {
        //高度监听
        resize() {
            let itemheight = document.documentElement.clientHeight;
            let boundingheight = this.$refs["table"].$el.getBoundingClientRect().top + 50;
            this.tableHeight = itemheight - boundingheight;
        },
        search() {

        },
        handleAdd() {
            this.open = true;
            this.title = "新增";
        },
        reset() {
            this.resetForm('searchFrom')
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        /** 查询字典类型列表 */
        getList() {
            this.loading = true;
            menulist({}).then((res) => {
                if (res.errCode == 200) {
                    console.log(res);
                    // 修改菜单下拉框
                    this.listM = res.result.filter(item => item.menuType == 'M')
                    this.listC = res.result.filter(item => item.menuType == 'C')
                    this.SysMenuList = this.handleTree(res.result, "id");
                    this.total = res.result.total;
                    this.loading = false;
                }
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
                component: undefined,
                description: undefined,
                icon: undefined,
                id: undefined,
                isCache: undefined,
                isFrame: undefined,
                menuName: undefined,
                menuType: undefined,
                orderNum: undefined,
                parentId: undefined,
                path: undefined,
                perms: undefined,
                query: undefined,
                visible: undefined,
            };
            //   this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.loading = true;
            this.queryParams.pageNum = 1;
            menulist(this.queryParams).then((res) => {
                this.SysMenuList = this.handleTree(res.result, "id");
                this.loading = false;
            });
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.dateRange = [];
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                component: undefined,
                description: undefined,
                icon: undefined,
                id: undefined,
                isCache: undefined,
                isFrame: undefined,
                menuName: undefined,
                menuType: undefined,
                orderNum: undefined,
                parentId: undefined,
                path: undefined,
                perms: undefined,
                query: undefined,
                visible: undefined,
            };
            this.getList();
        },

        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "新增";
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map((item) => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            const id = row.id;
            getdateone(id).then((response) => {
                this.form = response.result;
                this.open = true;
                this.title = "修改";
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    if (this.form.id != undefined) {
                        putdate(this.form).then((response) => {
                            if (response.errCode == 200) {
                                this.open = false;
                                this.getList();
                                this.$message({
                                    message: response.errMsg,
                                    type: response.success ? "success" : "error",
                                });
                                routerBase().then(res => {
                                    console.log(res, 'res');
                                    store.commit('set_userRole', res.result);
                                    initAsyncRouter();
                                })
                            }
                        });
                    } else {
                        createData(this.form).then((response) => {
                            if (response.errCode == 200) {
                                this.open = false;
                                this.getList();
                                this.$message({
                                    message: response.errMsg,
                                    type: response.success ? "success" : "error",
                                });
                                routerBase().then(res => {
                                    store.commit('set_userRole', res.result);
                                    initAsyncRouter();
                                })
                            }
                        });
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const ids = row.id || this.ids;
            this.$confirm(`是否要删除${row.menuName}`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    deldata(row).then((response) => {
                        if (response.errCode == 200) {
                            this.getList();
                            this.$message({
                                message: response.errMsg,
                                type: response.success ? "success" : "error",
                            });
                            routerBase().then(res => {
                                store.commit('set_userRole', res.result);
                                initAsyncRouter();
                            })
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
    }
}
</script>

<style>

</style>