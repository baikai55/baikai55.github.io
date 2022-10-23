<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="queryParams" ref="queryForm" :inline="true" size="mini" v-show="showSearch"
                    label-width="68px">
                    <el-form-item label="任务名称" prop="jobName">
                        <el-input v-model="queryParams.jobName" placeholder="请输入任务名称" clearable
                            @keyup.enter.native="handleQuery" />
                    </el-form-item>
                    <el-form-item label="任务组名" prop="jobGroup">
                        <el-input v-model="queryParams.jobGroup" placeholder="请输入任务组名" clearable
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
                <p>任务列表</p>
                <div class="user-control-btn">
                    <el-row :gutter="10" class="mb8">
                        <el-col :span="1.5">
                            <el-button class="handleAdd" type="primary" plain icon="el-icon-plus" size="mini"
                                @click="handleAdd">新增
                            </el-button>
                        </el-col>
                        <el-col :span="1.5">
                            <el-button class="handleDelete" plain icon="el-icon-delete" size="mini" :disabled="multiple"
                                @click="handleDeleteAll">批量删除
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>


        <!-- table表格-->
        <el-table v-loading="loading" element-loading-text="拼命加载中" ref="table" :height="tableHeightComputed"
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(9, 56, 84, .5)"
            :data="SysAttachmentList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="任务名称" align="center" prop="jobName" :show-overflow-tooltip="true" />
            <el-table-column label="目标字符串" align="center" prop="invokeTarget" :show-overflow-tooltip="true" />
            <el-table-column label="执行表达式" align="center" prop="cronExpression" :show-overflow-tooltip="true" />
            <el-table-column label="任务组名" align="center" prop="jobGroup" :show-overflow-tooltip="true" />
            <el-table-column label="是否禁用" align="center" prop="isEnabled" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isEnabled == '0'" type="success">正常</el-tag>
                    <el-tag v-else type="danger">暂停</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" :show-overflow-tooltip="true" />
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200px">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="handleCheck(scope.row)">查看
                    </el-button>
                    <el-button size="mini" type="text" @click="handleUpdate(scope.row)">修改
                    </el-button>
                    <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="queryParams.pageNum" background :page-sizes="[10, 20, 30, 40]"
                :page-size="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
                v-show="total > 0" />
        </div>


        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
            <div class="content-dia">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="任务名称" prop="jobName">
                        <el-input v-model="form.jobName" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="是否并发" prop="concurrent">
                        <el-radio v-model="form.concurrent" label="0">允许</el-radio>
                        <el-radio v-model="form.concurrent" label="1">禁止</el-radio>
                    </el-form-item>
                    <el-form-item label="cron表达式" prop="cronExpression">
                        <el-input v-model="form.cronExpression" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="目标字符" prop="invokeTarget">
                        <el-input v-model="form.invokeTarget" placeholder="请输入其他描述" />
                    </el-form-item>
                    <el-form-item label="任务组名" prop="jobGroup">
                        <el-input v-model="form.jobGroup" placeholder="请输入其他描述" />
                    </el-form-item>
                    <el-form-item label="是否禁用" prop="isEnabled">
                        <el-radio v-model="form.isEnabled" :label="0">否</el-radio>
                        <el-radio v-model="form.isEnabled" :label="1">是</el-radio>
                    </el-form-item>
                    <el-form-item label="执行计划" prop="misfirePolicy">
                        <el-radio v-model="form.misfirePolicy" label="1">立即执行</el-radio>
                        <el-radio v-model="form.misfirePolicy" label="2">执行一次</el-radio>
                        <el-radio v-model="form.misfirePolicy" label="3">放弃执行</el-radio>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="title" :visible.sync="openCheck" width="500px" append-to-body>
            <div class="content-dia">
                <el-form ref="form" :model="form" label-width="80px" style="color: #999">
                    <el-form-item label="任务名称" prop="jobName">
                        <span>{{ form.jobName }}</span>
                    </el-form-item>
                    <el-form-item label="是否并发" prop="concurrent">
                        <span v-if="form.concurrent == 0">允许</span>
                        <span v-else-if="form.concurrent == 1">禁止</span>
                    </el-form-item>
                    <el-form-item label="cron表达式" prop="cronExpression">
                        <span>{{ form.cronExpression }}</span>
                    </el-form-item>
                    <el-form-item label="目标字符" prop="invokeTarget">
                        <span>{{ form.invokeTarget }}</span>
                    </el-form-item>
                    <el-form-item label="任务组名" prop="jobGroup">
                        <span>{{ form.jobGroup }}</span>
                    </el-form-item>
                    <el-form-item label="是否禁用" prop="isEnabled">
                        <span v-if="form.isEnabled == 0">否</span>
                        <span v-else-if="form.isEnabled == 1">是</span>
                    </el-form-item>
                    <el-form-item label="执行计划" prop="misfirePolicy">
                        <span v-if="form.misfirePolicy == 1">立即执行</span>
                        <span v-else-if="form.misfirePolicy == 2">执行一次</span>
                        <span v-else>放弃执行</span>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeCheck">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import {
    getJobPage,
    getJobList,
    delJob,
    getJob,
    getJobGet,
    putJobUpdata,
    deleteBatch,
} from "@/api/system/timming";
// import Dict from "@/views/System/sysDictData";

export default {
    // components: { Dict },
    dicts: ["status_normal_invalid"],

    data() {
        return {
            //控制查看弹框
            openCheck: false,
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
            SysAttachmentList: [],
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
                //其他描述
                description: undefined,
                //文件名称
                jobName: undefined,
                //文件类型
                jobGroup: undefined,
                // 文件地址
                invokeTarget: undefined,
                //文件类型
                fileType: undefined,
                //状态
                status: 0,
                //顺序
                sortOrder: undefined,
                // 执行表达式
                cronExpression: undefined,
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                businessId: [
                    { required: true, message: "业务ID不能为空", trigger: "blur" },
                ],
                description: [
                    { required: true, message: "其他描述不能为空", trigger: "blur" },
                ],
                fileName: [
                    { required: true, message: "文件名称不能为空", trigger: "blur" },
                ],
                fileOriginalName: [
                    { required: true, message: "附件原名称不能为空", trigger: "blur" },
                ],
                fileSize: [
                    { required: true, message: "附件大小不能为空", trigger: "blur" },
                ],
                fileSrc: [
                    { required: true, message: "附件存储目录不能为空", trigger: "blur" },
                ],
                fileType: [
                    { required: true, message: "文件类型不能为空", trigger: "blur" },
                ],
                fileUrl: [
                    { required: true, message: "访问地址不能为空", trigger: "blur" },
                ],
                remark: [
                    { required: true, message: "附件备注不能为空", trigger: "blur" },
                ],
                thumbnailUrl: [
                    {
                        required: true,
                        message: "略缩图访问地址不能为空",
                        trigger: "blur",
                    },
                ],
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
    destroyed() {
        removeEventListener("resize", this.resize);
        //表格动态高度销毁
    },
    mounted() {
        addEventListener("resize", this.resize);
        this.getList();
    },
    created() {
        this.$nextTick(() => {
            let clientHeight = document.documentElement.clientHeight;
            let itemHeaderHeight =
                this.$refs["table"].$el.getBoundingClientRect().top + 33;
            this.tableHeight = clientHeight - itemHeaderHeight;
        });
    },
    methods: {
        //高度监听
        resize() {
            let itemheight = document.documentElement.clientHeight;
            let boundingheight = this.$refs["table"].$el.getBoundingClientRect().top + 33;
            this.tableHeight = itemheight - boundingheight;
        },
        /** 查询字典类型列表 */
        getList() {
            this.loading = true;
            getJobPage(this.queryParams).then((res) => {
                this.SysAttachmentList = res.result.records;
                this.total = res.result.total;
                this.loading = false;
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
                businessId: undefined,
                description: undefined,
                fileName: undefined,
                fileOriginalName: undefined,
                fileSize: undefined,
                fileSrc: undefined,
                fileType: undefined,
                fileUrl: undefined,
                id: undefined,
                remark: undefined,
                thumbnailUrl: undefined,
            };
            //   this.resetForm("form");
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
                businessId: undefined,
                description: undefined,
                fileName: undefined,
                fileOriginalName: undefined,
                fileSize: undefined,
                fileSrc: undefined,
                fileType: undefined,
                fileUrl: undefined,
                id: undefined,
                remark: undefined,
                thumbnailUrl: undefined,
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
            this.reset();
            const id = row.id || this.ids;
            getJobGet(row).then((response) => {
                this.form = response.result;
                this.open = true;
                this.title = "修改";
            });
        },
        //查看弹框
        handleCheck(row) {
            this.openCheck = true;
            this.title = "详情";
            this.form = row;
        },
        closeCheck() {
            this.openCheck = false;
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    if (this.form.id != undefined) {
                        putJobUpdata(this.form).then((response) => {
                            this.open = false;
                            this.getList();
                            this.$message({
                                message: response.errMsg,
                                type: response.success ? "success" : "error",
                            })

                        });
                    } else {
                        getJob(this.form).then((response) => {
                            this.$message({
                                message: response.errMsg,
                                type: response.success ? "success" : "error",
                            })
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const ids = row.id || this.ids;
            this.$confirm(`是否要删除${row.jobName}的信息`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    delJob(row).then((response) => {
                        this.$message({
                            type: response.success ? "success" : "error",
                            message: response.success ? "删除成功" : "删除失败",
                        });
                        this.getList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        // 批量删除
        handleDeleteAll() {
            const ids = this.ids;
            this.$confirm(`是否要删除${ids}的信息`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    deleteBatch(ids).then((response) => {
                        this.$message({
                            type: response.success ? "success" : "error",
                            message: response.success ? "删除成功" : "删除失败",
                        });
                        this.getList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },

        // 每页多少条数据
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.queryParams.pageSize = val;
            this.getList();
        },
        // 当前第几页
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.queryParams.pageNum = val;
            this.getList();
        },
        handleStatusChange(row) {
            // console.log(row, "row");
        },
    },
};
</script>
  
  
<style lang="scss" scoped>
.link-type {
    color: rgba(50, 92, 169);
    text-decoration: none;
}

.link-type:hover {
    color: rgb(42, 170, 228);
}

.el-pagination {
    text-align: center;
}

.pagination {
    background-color: #fff;
}
</style>
  
  