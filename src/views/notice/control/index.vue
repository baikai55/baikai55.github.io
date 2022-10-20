<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="queryParams" inline ref="queryParams" size="mini">
                    <el-form-item label="公告标题" prop="title">
                        <el-input v-model="queryParams.title" placeholder="请输入公告标题" clearable style="width: 150px" />
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
                <p>公告列表</p>
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
                <el-form ref="formNew" :model="formNew" label-width="80px" :rules="rules">
                    <el-form-item label="发布人" prop="userId">
                        <el-input placeholder="请输入内容" v-model="formNew.userId">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input placeholder="请输入内容" v-model="formNew.title">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <el-input placeholder="请输入内容" v-model="formNew.content">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newParamsComfigCancel">取 消</el-button>
                <el-button v-if="title=='新增'" type="primary" @click="newParamsComfig('formNew')">确 定</el-button>
                <el-button v-else type="primary" @click="updateComfig">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    createData, getTableList, update, del, deleteBatch, getOne
} from '@/api/notice/control';
export default {
    data() {
        return {
            title: '',
            deletelTemp: '',
            deleteAllTemp: [],
            //新增
            dialogVisibleNew: false,
            formNew: {
                content: "",
                createBy: "",
                createTime: "",
                description: "",
                id: 0,
                releaseTime: "",
                sortOrder: 0,
                status: 0,
                title: "",
                updateBy: "",
                updateTime: "",
                userId: ""
            },
            rules: {
                organizationId: [
                    { required: true, message: '请选择机构', trigger: 'blur' },
                ],
            },
            optionsNew: [],
            queryParams: {
                title: "",
                isDisabled: "",
            },
            pagination: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
            },
            table: {
                tableData: [],
                header: [
                    { selection: true, width: "70px" },
                    { prop: "userId", label: "公告发布人", minWidth: "120px" },
                    { prop: "title", label: "公告标题", minWidth: "120px" },
                    { prop: "content", label: "公告内容", minWidth: "180px" },
                    { prop: "createTime", label: "发布时间", minWidth: "150px" },
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
    mounted() {
        
    },
    created() {
        this.getTable()
    },
    methods: {
        reset() {
            this.queryParams = {
                title: "",
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
            // getOne(val.id).then(res => {
            //     if (res.errCode == 200) {
            //         console.log('lala',res.result)
            //         let tempId = []
            //         this.formNew = res.result
            //         res.result.forEach(element => {
            //             return tempId.push(element.id)
            //         })
            //         this.formNew = tempId
            //         this.dialogVisibleNew = true;
            //     }
            // })
            this.dialogVisibleNew = true;
            getOne(val.id).then(res => {
                this.formNew = res.result
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
                content: "",
                createBy: "",
                createTime: "",
                description: "",
                id: 0,
                releaseTime: "",
                sortOrder: 0,
                status: 0,
                title: "",
                updateBy: "",
                updateTime: "",
                userId: ""
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