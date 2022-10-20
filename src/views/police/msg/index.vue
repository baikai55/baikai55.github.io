<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="searchFrom" inline ref="searchFrom" size="mini">
                    <el-form-item prop="name" label="警员姓名">
                        <el-input v-model="searchFrom.name" placeholder="请输入姓名"></el-input>
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
                <p>员工列表</p>
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
                    <el-form-item label="警种" prop="type">
                        <el-radio-group v-model="formNew.type">
                            <el-radio label="0">辅警</el-radio>
                            <el-radio label="1">民警</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formNew.name" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="得分" prop="score">
                        <el-input v-model="formNew.score" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newParamsComfigCancel">取 消</el-button>
                <el-button type="primary" @click="newParamsComfig">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { addParams, getParamsList, del, deleteBatch, update, getOne } from '@/api/police/msg';
export default {
    data() {
        return {
            title: '',
            deletelTemp: '',
            deleteAllTemp: [],
            //新增
            dialogVisibleNew: false,
            formNew: {
                'id': '',
                "name": '',
                "score": '',
                "type": '0'
            },
            optionsNew: [],
            searchFrom: {
                name: '',
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
                    { prop: "name", label: "姓名", minWidth: "120px" },
                    { prop: "score", label: "得分", minWidth: "120px" },
                    {
                        //（0:辅警｜1:民警）
                        prop: "type", label: "警种", width: "120px", status: true, filters: (val) => val == 0 ? '辅警' : '民警'

                    },
                    {
                        prop: "", label: "操作", width: "120px", control: true, fixed: 'right',
                        tableOption: [
                            { type: "text", label: "修改", size: "mini", methods: "update", },
                            { type: "text", label: "删除", title: "确定删除吗？", size: "mini", methods: "delete", },
                        ]
                    }
                ]
            },
        };
    },
    created() {
        this.getTable()
    },
    methods: {
        reset() {
            this.searchFrom = {
                paramGrade: '',
            }
            this.getTable()
        },
        search() {
            let temp = Object.assign(this.searchFrom, this.pagination)
            console.log(temp);
            console.log(this.pagination, this.searchFrom);
            getParamsList(temp).then(res => {
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
            console.log(val, 'handButton');
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
                if (res.errCode == 200) {
                    this.successMsg(res.errMsg)
                    this.getTable()
                }
            })
        },
        //批量删除
        confirmDelAll() {
            deleteBatch(this.deleteAllTemp).then(res => {
                console.log(res, 'deleteAll');
                this.deleteAllTemp = []
                if (res.errCode == 200) {
                    this.successMsg(res.errMsg)
                    this.getTable()
                }
            })
        },
        //修改
        updateTable(val) {
            this.title = '修改';
            this.dialogVisibleNew = true;
            getOne(val.id).then(res => {
                this.formNew = res.result
            })
        },
        // 获取表格数据
        getTable() {
            getParamsList(this.pagination).then(res => {
                this.table.tableData = res.result.records
                this.pagination.total = res.result.total
            })
        },
        //新增
        newParams() {
            this.title = '新增'
            this.dialogVisibleNew = true
        },
        // 新增-确认
        newParamsComfig() {
            this.dialogVisibleNew = false
            const { id, name, type, score } = this.formNew
            let temp = {name, type, score}
            if (id == undefined) {
                addParams(temp).then(res => {
                    this.resetForm()
                    if (res.errCode == 200) {
                        this.successMsg(res.errMsg)
                        this.getTable()
                    }
                })
            } else {
                update(temp).then(res => {
                    console.log(res)
                    this.resetForm()
                    if (res.errCode == 200) {
                        this.successMsg(res.errMsg)
                        this.getTable()
                    }
                })
            }
        },
        //成功提示
        successMsg(val) {
            this.$message({
                message: val,
                type: 'success'
            });
        },
        // 新增-取消
        newParamsComfigCancel() {
            this.dialogVisibleNew = false
            this.resetForm()
        },
        // 重置表单
        resetForm() {
            this.formNew = {
                'id': '',
                "name": '',
                "score": '',
                "type": 0
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