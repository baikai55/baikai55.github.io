<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="searchFrom" inline ref="searchFrom" size="mini">
                    <el-form-item prop="paramGrade" label="运算类型">
                        <el-select v-model="searchFrom.paramGrade" placeholder="请选择">
                            <el-option label="小类" value="1"></el-option>
                            <el-option label="大类" value="0"></el-option>
                        </el-select>
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
                    <el-form-item label="类型" prop="paramGrade">
                        <el-radio-group v-model="formNew.paramGrade">
                            <el-radio label="0">大类</el-radio>
                            <el-radio label="1">小类</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="formNew.paramGrade==1">
                        <el-form-item label="大类" prop="parentId">
                            <el-select v-model="formNew.parentId" placeholder="请选择">
                                <el-option v-for="item in optionsNew" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="序号" prop="sequence">
                            <el-input v-model="formNew.sequence" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </template>
                    <el-form-item label="名称" prop="typeName">
                        <el-input v-model="formNew.typeName" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="分值" prop="scoreValue">
                        <el-input v-model="formNew.scoreValue" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="总分值" prop="total">
                        <el-input v-model="formNew.total" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="任务类型" prop="taskType">
                        <el-radio-group v-model="formNew.taskType">
                            <el-radio label="1">自动下发</el-radio>
                            <el-radio label="0">手工录入</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="运算类型" prop="operationType">
                        <el-radio-group v-model="formNew.operationType">
                            <el-radio label="1">+</el-radio>
                            <el-radio label="0">-</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="其他备注" prop="remark">
                        <el-input type="textarea" resize="none" :rows="7" placeholder="请输入内容" v-model="formNew.remark"
                            show-word-limit maxlength="500">
                        </el-input>
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
import { getClassList, addParams, getParamsList, del, deleteBatch, update, getOne } from '@/api/assess/score';
export default {
    data() {
        return {
            title: '',
            deletelTemp: '',
            deleteAllTemp: [],
            //新增
            dialogVisibleNew: false,
            formNew: {
                "operationType": "",
                "paramGrade": "0",
                "remark": "",
                "scoreValue": '',
                "sequence": '',
                "typeName": "",
                "parentId": '',
                "total": '',
                taskType: '',
            },

            optionsNew: [],
            searchFrom: {
                paramGrade: '',
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
                    { prop: "typeName", label: "类型名称", minWidth: "260px" },
                    { prop: "sequence", label: "序号", minWidth: "120px" },
                    { prop: "scoreValue", label: "分值", minWidth: "120px" },
                    { prop: "total", label: "总分值", minWidth: "120px" },
                    {
                        prop: "operationType", label: "运算类型", width: "120px", status: true, filters: (val) => val === '1' ? '+' : val === '0' ? '-' : val
                    },
                    {
                        prop: "paramGrade", label: "参数等级", width: "110px", status: true, filters: (val) => val == 1 ? '小类' : '大类'
                    },
                    {
                        prop: "parentId", label: "所属大类", minWidth: "120px", status: true, filters: (val) => {
                            let name = '';
                            this.optionsNew.forEach(item => {
                                if (item.value == val) {
                                    name = item.label;
                                }
                            })
                            return name;
                        }
                    },
                    { prop: "remark", label: "其他备注", minWidth: "120px" },

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
        this.classList()
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
        // 新增-获取大类
        classList() {
            getClassList().then(res => {
                let temp = res.result.map(item => {
                    let tempData = {
                        value: item.id,
                        label: item.typeName
                    }
                    return tempData
                })
                this.optionsNew = temp
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
            const { typeName, sequence, scoreValue, operationType, paramGrade, parentId, remark, id, total, taskType } = this.formNew
            let bigClass = {
                typeName, sequence, scoreValue, operationType, paramGrade, remark, id, total, taskType
            }
            let littleClass = {
                typeName, sequence, scoreValue, operationType, paramGrade, parentId, remark, id, total, taskType
            }
            let temp = paramGrade == 0 ? bigClass : littleClass
            if (id == undefined) {
                addParams(temp).then(res => {
                    this.resetForm()
                    if (res.errCode == 200) {
                        this.successMsg(res.errMsg)
                        this.getTable()
                        this.classList()
                    }
                })
            } else {
                update(temp).then(res => {
                    console.log(res)
                    this.resetForm()
                    if (res.errCode == 200) {
                        this.successMsg(res.errMsg)
                        this.getTable()
                        this.classList()
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
                "operationType": "",
                "paramGrade": "0",
                "remark": "",
                "scoreValue": '',
                "sequence": '',
                "typeName": "",
                "parentId": '',
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