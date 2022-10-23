<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="searchFrom" inline ref="searchFrom" size="mini">
                    <el-form-item prop="executor" label="警员姓名">
                        <el-input v-model="searchFrom.executor" placeholder="请输入内容" />
                    </el-form-item>
                    <el-form-item prop="bigTypeId" label="大类选择">
                        <el-select v-model="searchFrom.bigTypeId" placeholder="请选择">
                            <el-option v-for="item in optionsNew" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
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
        <!-- 详细、扣分 -->
        <el-dialog :title="title" :visible.sync="checkTaskDivsi" :before-close="handleClose">
            <div class="content-dia">
                <el-form ref="checkTaskList" :model="checkTaskList" label-width="100px">
                    <el-form-item label="大类" prop="bigTypeId">
                        <el-select v-model="checkTaskList.bigTypeId" :disabled="checkTaskDisabed" placeholder="请选择">
                            <el-option v-for="item in optionsNew" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="小类" prop="smallTypeId">
                        <el-select v-model="checkTaskList.smallTypeId" placeholder="请选择" :disabled="checkTaskDisabed">
                            <el-option v-for="item in littleClass" :key="item.id" :label="item.typeName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务标题" prop="taskTitle">
                        <el-input v-model="checkTaskList.taskTitle" :disabled="checkTaskDisabed">
                        </el-input>
                    </el-form-item>
                    <!--  -->
                    <el-form-item label="任务处理描述" prop="description">
                        <el-input v-model="checkTaskList.description" :disabled="checkTaskDisabed">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="任务附件" prop="fileName">
                        <template v-if="checkTaskList.attachmentVoList">
                            <img :src="item.fileUrl" alt="" v-for="item in checkTaskList.attachmentVoList"
                                :key="item.businessId" width="100" @click="ImgClick(item.fileUrl)" />
                        </template>
                    </el-form-item>
                    <template v-if="title!='详细'">
                        <el-form-item label="所扣分值" prop="score">
                            <el-input v-model="checkTaskList.score">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="考核备注" prop="checkRemake">
                            <el-input type="textarea" v-model="checkTaskList.checkRemake">
                            </el-input>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkTaskComfigCancel">取 消</el-button>
                <el-button v-if="title=='详细'" type="primary" @click="checkTaskDivsi=false">确认</el-button>
                <el-button v-else type="primary" @click="checkTaskComfig">扣分</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisibleImg">
            <img :src="dialogVisibleImgUrl" alt="" class="bigImg" />
        </el-dialog>
    </div>
</template>

<script>
import { getClassList, getLillteClass } from "@/api/assess/score";
import {
    addParams,
    getParamsList,
    del,
    deleteBatch,
    update,
    getOne,
    checkTask,
    AppTaskCheckList,
} from "@/api/assessment/task";
import { deptList } from "@/api/system/dept";
import { userList } from "@/api/system/user";
export default {
    data() {
        return {
            //放大图片
            dialogVisibleImg: false,
            dialogVisibleImgUrl: "",
            checkTaskDisabed: false,
            // 校验任务
            checkTaskDivsi: false,
            checkTaskList: {},
            date: [],
            title: "",
            deletelTemp: "",
            deleteAllTemp: [],
            initLittleClass: [],
            optionsNew: [],
            littleClass: [],
            userlist: [],
            deptlist: [],
            searchFrom: {
                executor: "",
                bigTypeId: ""
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
                    {
                        prop: "bigTypeStr",
                        label: "大类",
                        minWidth: "120px",
                    },
                    {
                        prop: "smallTypeStr", label: "小类", minWidth: "200px",
                    },
                    {
                        //（0:待办｜1:待审核｜2:待申诉｜3:申诉待审核｜99完成）
                        prop: "taskState", label: "任务状态", minWidth: "130px", status: true,
                        filters: (val) => {
                            if (val == 0) {
                                return "待办"
                            } else if (val == 1) {
                                return "待审核"
                            } else if (val == 2) {
                                return "待申诉"
                            } else if (val == 3) {
                                return "申诉待审核"
                            } else if (val == 99) {
                                return "完成"
                            }
                        }
                    },
                    {
                        prop: "executorStr",
                        label: "办理警员",
                        minWidth: "120px",
                    },
                    { prop: "completeTime", label: "完成时间", minWidth: "120px" },

                    { prop: "score", label: "所扣分值", minWidth: "120px" },
                    {
                        prop: "taskState",
                        label: "操作",
                        width: "160px",
                        control: true,
                        fixed: "right",
                        tableOption: [
                            { type: "text", label: "详细", size: "mini", methods: "update", disabled: false },
                            { type: "text", label: "扣分", size: "mini", methods: "check", disabled: (val) => val == 2 ? false : true },
                        ],
                    },
                ],
            },

        };
    },
    created() {
        this.classList();
        this.getTable();
        this.getdeptList();
        this.getuserList();
        this.getLittleClass()
    },
    methods: {
        //图片放大
        ImgClick(val) {
            console.log(val);
            this.dialogVisibleImg = true;
            this.dialogVisibleImgUrl = val;
        },

        // 获取小类
        getLittleClass() {
            getLillteClass({}).then(res => {
                this.initLittleClass = res.result
            })
        },
        // 机构
        getdeptList() {
            deptList({}).then((res) => {
                this.deptlist = res.result;
            });
        },
        getuserList() {
            userList({}).then((res) => {
                this.userlist = res.result;
            });
        },
        reset() {
            this.searchFrom = {
                paramGrade: "",
            };
            this.getTable();
        },
        search() {
            let temp = Object.assign({}, this.searchFrom, this.pagination);
            console.log(temp);
            console.log(this.pagination, this.searchFrom);
            getParamsList(temp).then((res) => {
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
        //表格操作传参
        handButton(val) {
            console.log(val, "handButton");
            if (val.methods == "delete") {
                this.deletelTemp = val.row;
            } else if (val.methods == "update") {
                this.updateTable(val.row);
            } else if (val.methods == "check") {
                this.checkTask(val.row);
            }
        },
        // 扣分
        checkTask(val) {
            this.title = "扣分";
            getOne(val.id, val.taskType).then((res) => {
                if (res.errCode == 200) {
                    this.checkTaskDivsi = true;
                    this.checkTaskDisabed = true
                    this.checkTaskList = res.result;
                    getLillteClass({ id: res.result.bigTypeId }).then((res) => {
                        this.littleClass = res.result;
                    });
                }
            });
        },
        checkTaskComfigCancel() {
            this.checkTaskDivsi = false;
            this.resetForm();
        },
        //核验确认
        checkTaskComfig() {
            const { id, score, checkRemake } = this.checkTaskList
            let temp = {
                taskId: id,
                score,
                checkRemake
            }
            AppTaskCheckList(temp).then((res) => {
                if (res.errCode == 200) {
                    this.$message({
                        message: res.errMsg,
                        type: "success",
                    });
                    this.checkTaskDivsi = false;
                    this.getTable();
                }
            });
        },
        //确认删除
        confirmDel() {
            del(this.deletelTemp).then((res) => {
                console.log(res, "deleteTable");
                if (res.errCode == 200) {
                    this.successMsg(res.errMsg);
                    this.getTable();
                }
            });
        },
        //批量删除
        confirmDelAll() {
            deleteBatch(this.deleteAllTemp).then((res) => {
                console.log(res, "deleteAll");
                this.deleteAllTemp = [];
                if (res.errCode == 200) {
                    this.successMsg(res.errMsg);
                    this.getTable();
                }
            });
        },
        //详细
        updateTable(val) {
            this.title = "详细";
            console.log(val, "updateTable");
            getOne(val.id, val.taskType).then((res) => {
                if (res.errCode == 200) {
                    this.checkTaskDivsi = true;
                    this.checkTaskDisabed = true
                    this.checkTaskList = res.result;
                    getLillteClass({ id: res.result.bigTypeId }).then((res) => {
                        this.littleClass = res.result;
                    });
                }
            });
        },
        // 新增-获取大类
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
        // 获取表格数据
        getTable() {
            getParamsList(this.pagination).then((res) => {
                this.table.tableData = res.result.records;
                this.pagination.total = res.result.total;
            });
        },
        //成功提示
        successMsg(val) {
            this.$message({
                message: val,
                type: "success",
            });
        },
        // 重置表单
        resetForm() {
            this.checkTaskList = {
                bigTypeId: "",
                smallTypeId: "",
                taskTitle: "",
                description: "",
                fileName: "",
                score: "",
                checkRemake: "",
            };
        },
        //离开弹出框
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    this.resetForm();
                    done();
                })
                .catch((_) => { });
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

<style lang="scss" scoped>
.bigImg {
    width: 100%;
    height: 100%;
}
</style>
