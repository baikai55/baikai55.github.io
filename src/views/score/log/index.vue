<template>
    <div class="table-form">
        <!-- <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
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
        </div> -->
        <div class="table-control-main">
            <div class="m_text">
                <p>分数记录列表</p>
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
                        <template v-if="title != '详细' && title != '抽查'">
                            <el-upload class="upload-demo" action="#" :http-request="upload" :on-remove="handleRemove"
                                :file-list="fileList" list-type="picture" :on-success="successTask" multiple>
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </template>
                    </el-form-item>

                    <div class="steps" v-if="title != '办理' && title != '申诉'">
                        <el-form-item class="label" label="任务进度" prop="fileName"></el-form-item>
                        <el-steps :space="200" :active="checkTaskList.taskState" finish-status="success"
                            style="width: 100%; margin-left: 20px">
                            <el-step title="进行中"></el-step>
                            <el-step title="已完成"></el-step>
                            <el-step v-if="checkTaskList.taskType == 1" title="待申诉"></el-step>
                            <el-step title="完成"></el-step>
                        </el-steps>
                    </div>
                    <template v-if="title != '详细' && title != '办理' && title != '申诉'">
                        <el-form-item label="所扣分值" prop="score">
                            <el-input v-model="checkTaskList.score"> </el-input>
                        </el-form-item>
                        <el-form-item label="考核备注" prop="checkRemake">
                            <el-input type="textarea" v-model="checkTaskList.checkRemake"> </el-input>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="checkTaskComfigCancel">取 消</el-button>
                <el-button v-if="title == '详细'" type="primary" @click="checkTaskDivsi = false">确认</el-button>
                <el-button v-if="title == '抽查'" type="primary" @click="checkTaskComfig">扣分</el-button>
                <el-button v-if="title == '办理'" type="primary" @click="submitTaskComfig">办理</el-button>
                <el-button v-if="title == '申诉'" type="primary" @click="appealTaskComfig">申诉</el-button>
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
    submitTask,
    getOne,
    checkTask,
    AppTaskCheckList,
    checkTaskNew,
} from "@/api/assessment/task";
import { deptList } from "@/api/system/dept";
import { userList } from "@/api/system/user";
import { uploadAll } from "@/api/upload";
import { mapState } from "vuex";
import { createData } from "@/api/assessment/appeal";
import { getUserTypeList } from "@/api/system/user.js";
import request from "@/utils/request";
import headers from "./tableConfig";
import { getData } from '@/api/score/score'
export default {
    computed: {
        ...mapState(["userType"]),
    },
    data() {
        return {
            dialogVisibleNew: false,
            //放大图片
            dialogVisibleImg: false,
            dialogVisibleImgUrl: "",
            checkTaskDisabed: false,
            // 校验任务
            checkTaskDivsi: false,
            checkTaskList: {},
            date: [],
            title: "",
            formNew: {
                bigTypeId: "",
                smallTypeId: "",
                taskTitle: "",
                description: "",
                startTime: "",
            },
            deletelTemp: "",
            deleteAllTemp: [],
            initLittleClass: [],
            optionsNew: [],
            littleClass: [],
            userlist: [],
            deptlist: [],
            searchFrom: {
                executor: "",
                bigTypeId: "",
            },
            pagination: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                taskType: 1,
                taskState: 2,
            },
            table: {
                tableData: [],
                header: headers,
            },
            fileList: [],
            fileIds: [],
            userListData: [],
        };
    },
    created() {
        this.getTable();
        this.getUserList();
        this.classList();
    },
    methods: {
        // 新增-获取大类
        classList() {
            getClassList().then((res) => {
                console.log(res, 'classList');
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
        getUserList() {
            getUserTypeList("5").then((res) => {
                if (res.errCode == 200) {
                    this.userListData = res.result;
                }
            });
        },
        //shangchaun
        upload(file) {
            let filelist = new FormData();
            //添加参数
            console.log(file, "file");
            filelist.append("files", file.file);
            // filelist.append("name", file.filename);
            request
                .post("/sheriff/api/sysAttachment/plural/upload", filelist, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((res) => {
                    console.log(res, "res");
                    const { id, fileUrl, fileOriginalName } = res.result[0];
                    let temp = {
                        name: fileOriginalName,
                        id: id,
                        url: fileUrl,
                    };
                    this.fileList.push(temp);
                    this.fileIds.push(id);
                });
        },
        handleRemove(row, index) {
            // this.fileList.splice(index, 1);
            console.log(row, index);
        },
        successTask(response, file, fileList) {
            console.log(response, file, fileList, "response, file, fileList");
        },
        // 放大图片
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
        bigClassChange(val) {
            getLillteClass({ id: val }).then((res) => {
                console.log(res, "小类");
                this.littleClass = res.result;
            });
        },


        //图片放大
        ImgClick(val) {
            console.log(val);
            this.dialogVisibleImg = true;
            this.dialogVisibleImgUrl = val;
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
            } else if (val.methods == "submit") {
                this.submitTaskCheck(val.row);
            } else if (val.methods == "appeal") {
                this.appealTask(val.row);
            }
        },
        //申诉
        appealTask(row) {
            this.title = "申诉";
            getOne(row.operator, 1).then((res) => {
                console.log(res, "res");
                if (res.errCode == 200) {
                    this.checkTaskDivsi = true;
                    this.checkTaskDisabed = false;
                    this.checkTaskList = res.result;
                    getLillteClass({ id: res.result.bigTypeId }).then((res) => {
                        this.littleClass = res.result;
                    });
                }
            });
        },
        //申诉-确认
        appealTaskComfig() {
            this.checkTaskDivsi = false;
            const { id, description } = this.checkTaskList;

            let temp = {
                taskId: id,
                appealReason: description,
                fileIds: this.fileIds
            };
            createData(temp).then((res) => {
                console.log(res);
                if (res.errCode == 200) {
                    this.$message({
                        message: `${res.errMsg}`,
                        type: "success",
                    });
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
        // 获取表格数据
        getTable() {
            getData(this.pagination).then((res) => {
                let temp = res.result.records.map((item) => {
                    let tempData = {
                        id: item.id,
                        bigTypeStr: item.bigTypeStr,
                        smallTypeStr: item.smallTypeStr,
                        operationType: item.operationType,
                        isAppeal: item.isAppeal,
                        score: item.score,
                        caozuo: item.isAppeal,
                        operator: item.operator,
                        userId: item.userId,
                        oldScore: item.oldScore,


                    };
                    return tempData;
                });
                this.table.tableData = temp;
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
        checkTaskComfigCancel() {
            this.checkTaskDivsi = false;
            this.resetForm();
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
                taskState: null,
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

.steps {
    display: flex;
}
</style>
