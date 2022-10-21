<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="searchFrom" inline ref="searchFrom" size="mini">
                    <el-form-item prop="executorStr" label="警员姓名">
                        <el-input v-model="searchFrom.executorStr" placeholder="请输入姓名"></el-input>
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
                <p>考核列表</p>
                <div class="user-control-btn">
                    <div>
                        <template>
                            <el-button v-if="deleteAllTemp.length <= 0" size="small" @click="deleteAll">批量不扣分
                            </el-button>
                            <el-popconfirm v-else title="确认完成选中的数据？" @confirm="confirmDelAll">
                                <el-button slot="reference" id="deleteAll" size="small">批量不扣分
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
                    <el-form-item label="大类" prop="bigTypeStr">
                        <div class="detail">{{formNew.bigTypeStr}}</div>
                    </el-form-item>
                    <el-form-item label="小类" prop="smallTypeStr">
                        <div class="detail">{{formNew.smallTypeStr}}</div>
                    </el-form-item>
                    <el-form-item label="警员" prop="executorStr">
                        <div class="detail">{{formNew.executorStr}}</div>
                    </el-form-item>
                    <template v-if="title != '详情'">
                        <el-form-item label="所扣分值" prop="score">
                            <el-input v-model="formNew.score" placeholder="请输入分值"></el-input>
                        </el-form-item>
                        <el-form-item label="扣分描述" prop="describe">
                            <el-input v-model="formNew.describe" type="textarea" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer" v-if="title != '详情'">
                <el-button @click="newParamsComfigCancel">取 消</el-button>
                <el-button type="danger" @click="newParamsComfig">扣 分</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import { addParams, getParamsList, del, deleteBatch, update, getOne } from '@/api/police/msg';
import { getClassList, getLillteClass } from '@/api/assess/score';
import {
    addParams,
    getParamsList,
    del,
    deleteBatch,
    update,
    getOne,
    checkTask as koufen,
    changeStatus
} from "@/api/assessment/task";
export default {
    data() {
        return {
            title: '',
            deletelTemp: [],
            deleteAllTemp: [],
            //新增
            dialogVisibleNew: false,
            formNew: {
                'id': '',
                "executorStr": '',
                "score": '',
                "type": "0",
                "bigTypeStr": "",
                "smallTypeStr": "",
                "describe": ""
            },
            optionsNew: [],
            searchFrom: {
                executorStr: '',
            },
            pagination: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                taskType: 1
            },
            table: {
                tableData: [],
                header: [
                    { selection: true, width: "70px" },
                    // {
                    //     prop: "bigTypeId",
                    //     label: "大类",
                    //     minWidth: "120px",
                    //     status: true,
                    //     filters: (val) => {
                    //         let name = "";
                    //         this.optionsNew.forEach((item) => {
                    //             if (item.value == val) {
                    //                 name = item.label;
                    //             }
                    //         });
                    //         return name;
                    //     },
                    // },
                    { prop: "bigTypeStr", label: "大类", minWidth: "120px" },
                    { prop: "smallTypeStr", label: "小类", minWidth: "180px" },
                    { prop: "executorStr", label: "警员", minWidth: "120px" },
                    {
                        prop: "taskState", label: "操作", width: "180px", control: true, fixed: 'right',
                        tableOption: [
                            { type: "primary", label: "详情", size: "mini", methods: "detail", },
                            { type: "danger", label: "扣分", size: "mini", methods: "check",disabled: (val) => val == 2 ? true : val == 99 ? true : false },
                            { type: "success", label: "不扣分", title: "确定不扣分吗？", size: "mini", methods: "delete", disabled: (val) => val == 2 ? true : val == 99 ? true : false },
                        ]
                    }
                ]
            }
        };
    },
    created() {
        this.getTable();
        this.classList();
    },
    methods: {
        // 获取大类
        classList() {
            getClassList().then((res) => {
                let temp = res.result.map((item) => {
                    let tempData = {
                        value: item.id,
                        label: item.typeName,
                    };
                    return tempData;
                });
                this.optionsNew = temp;
            });
        },
        reset() {
            this.searchFrom = {
                paramGrade: "",
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
            } else if (val.methods == 'detail') {
                this.updateTable(val.row)
            } else if (val.methods == 'check') {
                this.checkTask(val.row);
            }
        },
        //确认删除
        confirmDel() {
            const { id } = this.deletelTemp
            let temp = [id]
            console.log(temp, 'sdadas');
            changeStatus(temp).then(res => {
                console.log(res, 'deleteTable');
                if (res.errCode == 200) {
                    this.successMsg(res.errMsg)
                    this.getTable()
                }
            })
        },
        //批量删除
        confirmDelAll() {
            changeStatus(this.deleteAllTemp).then(res => {
                console.log(res, 'deleteAll');
                this.deleteAllTemp = []
                if (res.errCode == 200) {
                    this.successMsg(res.errMsg)
                    this.getTable()
                }
            })
        },
        // 扣分
        checkTask(val) {
            this.title = "扣分";
            getOne(val.id, val.taskType).then((res) => {
                if (res.errCode == 200) {
                    console.log('formNew');
                    this.dialogVisibleNew = true;
                    this.formNew = res.result
                    getLillteClass({ id: res.result.bigTypeId }).then((res) => {
                        this.littleClass = res.result;
                    });
                }
            });
        },
        //详情
        updateTable(val) {
            this.title = '详情';
            getOne(val.id, val.taskType).then(res => {
                this.dialogVisibleNew = true;
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
        //成功提示
        successMsg(val) {
            this.$message({
                message: val,
                type: 'success'
            });
        },
        // 取消-详情-扣分
        newParamsComfigCancel() {
            this.dialogVisibleNew = false
            this.resetForm()
        },
        // 确认-详情=扣分
        newParamsComfig() {
            const { id, score, describe } = this.formNew
            let temp = {
                taskId: id,
                checkRemake: describe,
                score
            }
            koufen(temp).then((res) => {
                if (res.errCode == 200) {
                    this.$message({
                        message: res.errMsg,
                        type: "success",
                    });
                    this.dialogVisibleNew = false;
                    this.getTable();
                }
            });
        },
        // 重置表单
        resetForm() {
            this.formNew = {
                'id': '',
                "executorStr": '',
                "score": '',
                "type": "0",
                "bigTypeStr": "",
                "smallTypeStr": "",
                "describe": ""
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
.detail {
    margin-left: 10px;
}

.el-dialog__body {
    padding: 30px 50px;
}
</style>