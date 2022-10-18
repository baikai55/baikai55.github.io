<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="searchFrom" inline ref="searchFrom" size="mini">
                    <el-form-item prop="taskState" label="任务状态">
                        <el-select v-model="searchFrom.taskState" placeholder="请选择">
                            <!-- //0:待办｜1:待审核｜2:待申诉｜3:申诉待审核｜99完成 -->
                            <el-option label="待办" value="0"></el-option>
                            <el-option label="待考核" value="1"></el-option>
                            <el-option label="待申诉" value="2"></el-option>
                            <el-option label="申诉待审核" value="3"></el-option>
                            <el-option label="完成" value="99"></el-option>
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
        <!-- 核验 -->
        <el-dialog :title="title" :visible.sync="checkTaskDivsi" :before-close="handleClose">
            <div class="content-dia">
                <el-form ref="formNew" :model="checkTaskList" label-width="100px">
                    <el-form-item label="大类" prop="bigTypeId">
                        <el-select v-model="checkTaskList.bigTypeId" :disabled="checkTaskDisabed" placeholder="请选择" @change="bigClassChange">
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
                        <el-input v-model="checkTaskList.taskTitle" placeholder="请输入内容" :disabled="checkTaskDisabed"></el-input>
                    </el-form-item>
                    <!--  -->
                    <el-form-item label="任务处理描述" prop="description">
                        <el-input v-model="checkTaskList.description" placeholder="请输入内容" :disabled="checkTaskDisabed"></el-input>
                    </el-form-item>
                    <el-form-item label="任务附件" prop="fileName">
                        <template v-if="checkTaskList.attachmentVoList">
                            <img :src="item.fileUrl" alt="" v-for="item in checkTaskList.attachmentVoList"
                                :key="item.businessId" width="100" @click="ImgClick(item.fileUrl)" />
                        </template>
                    </el-form-item>
                    <el-form-item label="考核结果" prop="checkResult">
                        <el-radio-group v-model="checkTaskList.checkResult">
                            <el-radio label="0">通过</el-radio>
                            <el-radio label="1">驳回</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="考核备注" prop="checkRemake">
                        <el-input type="textarea" v-model="checkTaskList.checkRemake" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkTaskComfigCancel">取 消</el-button>
                <el-button type="primary" @click="checkTaskComfig">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增、修改 -->
        <el-dialog :title="title" :visible.sync="dialogVisibleNew" :before-close="handleClose">
            <div class="content-dia">
                <el-form ref="formNew" :model="formNew" label-width="80px">
                    <el-form-item label="大类" prop="bigTypeId">
                        <el-select v-model="formNew.bigTypeId" placeholder="请选择" @change="bigClassChange">
                            <el-option v-for="item in optionsNew" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="小类" prop="smallTypeId">
                        <el-select v-model="formNew.smallTypeId" placeholder="请选择">
                            <el-option v-for="item in littleClass" :key="item.id" :label="item.typeName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务标题" prop="taskTitle">
                        <el-input v-model="formNew.taskTitle" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <!--  -->
                    <el-form-item label="执行类型" prop="belonging">
                        <el-radio-group v-model="formNew.belonging">
                            <el-radio label="1">机构</el-radio>
                            <el-radio label="0">个人</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template>
                        <el-form-item label="执行机构" prop="organizationId">
                            <el-select v-model="formNew.organizationId" placeholder="请选择" filterable>
                                <el-option v-for="item in deptlist" :key="item.id" :label="item.orgName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="执行人" prop="executor" v-if="formNew.belonging == 0">
                            <el-select v-model="formNew.executor" placeholder="请选择" filterable>
                                <el-option v-for="item in userlist" :key="item.id" :label="item.realName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </template>

                    <el-form-item label="起止时间" prop="date">
                        <el-date-picker v-model="date" type="datetimerange" range-separator="至" start-placeholder="开始日期"
                            end-placeholder="结束日期" @change="timeChange">
                        </el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item label="分值" prop="otherScore">
                        <el-input v-model="formNew.otherScore" placeholder="请输入内容"></el-input>
                    </el-form-item> -->
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newParamsComfigCancel">取 消</el-button>
                <el-button type="primary" @click="newParamsComfig">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisibleImg" width="80vw">
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
            //新增
            dialogVisibleNew: false,
            formNew: {
                bigTypeId: "",
                smallTypeId: "",
                taskTitle: "",
                belonging: "",
                executor: "",
                otherScore: "",
                organizationId: "",
            },
            optionsNew: [],
            littleClass: [],
            userlist: [],
            deptlist: [],
            searchFrom: {
                taskState: "",
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
                    { prop: "taskTitle", label: "任务标题", minWidth: "120px" },
                    {
                        prop: "bigTypeId",
                        label: "大类",
                        minWidth: "120px",
                        status: true,
                        filters: (val) => {
                            let name = "";
                            this.optionsNew.forEach((item) => {
                                if (item.value == val) {
                                    name = item.label;
                                }
                            });
                            return name;
                        },
                    },
                    // { prop: "smallTypeId", label: "小类", minWidth: "120px" },
                    {
                        prop: "taskState",
                        label: "任务状态",
                        minWidth: "120px",
                        status: true,
                        //0:待办｜1:待审核｜2:待申诉｜3:申诉待审核｜99完成
                        filters: (val) => {
                            let name = "";
                            switch (val) {
                                case 0:
                                    name = "待办";
                                    break;
                                case 1:
                                    name = "待考核";
                                    break;
                                case 2:
                                    name = "待申诉";
                                    break;
                                case 3:
                                    name = "申诉待审核";
                                    break;
                                case 99:
                                    name = "完成";
                                    break;
                            }
                            return name;
                        },
                    },
                    {
                        prop: "executor",
                        label: "执行人",
                        minWidth: "120px",
                        status: true,
                        filters: (val) => {
                            let name = "";
                            this.userlist.forEach((item) => {
                                if (item.id == val) {
                                    name = item.realName;
                                }
                            });
                            return name;
                        },
                    },
                    { prop: "startTime", label: "开始时间", minWidth: "120px" },

                    { prop: "deadline", label: "超期时间", minWidth: "120px" },

                    {
                        prop: "",
                        label: "操作",
                        width: "160px",
                        control: true,
                        fixed: "right",
                        tableOption: [
                            { type: "text", label: "修改", size: "mini", methods: "update" },
                            { type: "text", label: "核验", size: "mini", methods: "check" },
                            {
                                type: "text",
                                label: "删除",
                                title: "确定删除吗？",
                                size: "mini",
                                methods: "delete",
                            },
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
    },
    methods: {
        //图片放大
        ImgClick(val) {
            console.log(val);
            this.dialogVisibleImg = true;
            this.dialogVisibleImgUrl = val;
        },
        //时间
        timeChange(val) {
            let temp = val.map((item) => {
                let mouth =
                    item.getMonth() + 1 < 10 ? "0" + (item.getMonth() + 1) : item.getMonth() + 1;
                let day = item.getDate() < 10 ? "0" + item.getDate() : item.getDate();
                let hour = item.getHours() < 10 ? "0" + item.getHours() : item.getHours();
                let minute = item.getMinutes() < 10 ? "0" + item.getMinutes() : item.getMinutes();
                let second = item.getSeconds() < 10 ? "0" + item.getSeconds() : item.getSeconds();
                let formatTime2 =
                    item.getFullYear() +
                    "-" +
                    mouth +
                    "-" +
                    day +
                    " " +
                    hour +
                    ":" +
                    minute +
                    ":" +
                    second;
                return formatTime2;
            });
            this.formNew.startTime = temp[0];
            this.formNew.deadline = temp[1];
        },
        // 选择大类
        bigClassChange(val) {
            this.formNew.smallTypeId = "";
            getLillteClass({ id: val }).then((res) => {
                console.log(res, "小类");
                this.littleClass = res.result;
            });
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
            let temp = Object.assign(this.searchFrom, this.pagination);
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
                this.checkTask(val);
            }
        },
        // 核验
        checkTask(val) {
            this.title = "核验";
            if (val.row.taskState == 1) {
                this.checkTaskDivsi = true;
                this.checkTaskDisabed = true;
                AppTaskCheckList(val.row.id).then((res) => {
                    this.checkTaskList = res.result;
                    getLillteClass({ id: res.result.bigTypeId }).then((res) => {
                        this.littleClass = res.result;
                    });
                });
            } else {
                this.$message({
                    message: "该任务不可核验",
                    type: "warning",
                });
            }
        },
        checkTaskComfigCancel() {
            this.checkTaskDivsi = false;
        },
        //核验确认
        checkTaskComfig() {
            const { id, checkRemake, checkResult } = this.checkTaskList;
            let temp = {
                taskId: id,
                checkRemake,
                checkResult,
            };
            checkTask(temp).then((res) => {
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
        //修改
        updateTable(val) {
            this.title = "修改";
            this.dialogVisibleNew = true;
            getOne(val.id).then((res) => {
                this.formNew = res.result;
                getLillteClass({ id: res.result.bigTypeId }).then((res) => {
                    this.littleClass = res.result;
                });
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
        //新增
        newParams() {
            this.title = "新增";
            this.dialogVisibleNew = true;
        },
        // 新增-确认
        newParamsComfig() {
            this.dialogVisibleNew = false;
            const { id } = this.formNew;
            if (id == undefined) {
                addParams(this.formNew).then((res) => {
                    this.resetForm();
                    if (res.errCode == 200) {
                        this.successMsg(res.errMsg);
                        this.getTable();
                    }
                });
            } else {
                update(this.formNew).then((res) => {
                    console.log(res);
                    this.resetForm();
                    if (res.errCode == 200) {
                        this.successMsg(res.errMsg);
                        this.getTable();
                    }
                });
            }
        },
        //成功提示
        successMsg(val) {
            this.$message({
                message: val,
                type: "success",
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
                operationType: "",
                paramGrade: "0",
                remark: "",
                scoreValue: "",
                sequence: "",
                typeName: "",
                parentId: "",
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
