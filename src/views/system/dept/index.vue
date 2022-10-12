<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="searchFrom" inline ref="searchFrom" size="mini">
                    <el-form-item prop="orgName" label="机构名称">
                        <el-input v-model="searchFrom.orgName" placeholder="请输入机构名称"></el-input>
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
                    </div>
                </div>
            </div>
        </div>
        <div class="table">
            <el-table ref="table" :height="tableHeightComputed" :data="tableData"
                style="width: 100%; margin-bottom: 20px" row-click="" row-key="id" :default-expand-all="false"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column label="机构名称" prop="orgName" align="left" :show-overflow-tooltip="true" />
                <el-table-column label="机构得分" align="center" prop="orgScore" :show-overflow-tooltip="true" />
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="updateTable(scope.row)">修改
                        </el-button>
                        <div class="inline">
                            <el-popconfirm title="确认删除选中的数据？" @confirm="confirmDel">
                                <el-button slot="reference" id="deleteAll" type="text" size="small"
                                    @click="deleteTable(scope.row)">删除
                                </el-button>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="title" :visible.sync="dialogVisibleNew" :before-close="handleClose">
            <div class="content-dia">
                <el-form ref="formNew" :model="formNew" label-width="100px">
                    <el-form-item label="机构名称" prop="orgName">
                        <el-input v-model="formNew.orgName" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="选择父机构" prop="parentId">
                        <el-select v-model="formNew.parentId" placeholder="请选择">
                            <el-option v-for="item in tableData" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="机构代码" prop="orgCode">
                        <el-input v-model="formNew.orgCode" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人员" prop="headUserId">
                        <el-select v-model="formNew.headUserId" placeholder="请选择">
                            <el-option v-for="item in userData" :key="item.id" :label="item.realName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="机构得分" prop="orgScore">
                        <el-input v-model="formNew.orgScore" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newParamsComfigCancel">取 消</el-button>
                <el-button v-if="title=='新增'" type="primary" @click="newParamsComfig">确 定</el-button>
                <el-button v-else type="primary" @click="updateComfig">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { addParams, getParamsList, del, deptList, update } from '@/api/system/dept';
import { userList } from '@/api/system/user';
export default {
    data() {
        return {
            title: '',
            deletelTemp: '',
            deleteAllTemp: [],
            //新增
            dialogVisibleNew: false,
            formNew: {
                "headUserId": "",
                "orgCode": "",
                "orgName": "",
                "orgScore": "",
                "parentId": ""
            },
            optionsNew: [],
            searchFrom: {
                orgName: '',
            },
            pagination: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
            },
            tableData: [],
            userData: [],
            userlist: {},
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
        this.getTable()
        this.getUserList()
        this.$nextTick(() => {
            let clientHeight = document.documentElement.clientHeight;
            let itemHeaderHeight =
                this.$refs["table"].$el.getBoundingClientRect().top + 60;
            this.tableHeight = clientHeight - itemHeaderHeight;
        });
    },
    methods: {
        //负责人员
        getUserList() {
            userList(this.userlist).then(res => {
                console.log(res);
                this.userData = res.result
            })
        },
        handleUpdate(val) { console.log(val); },
        handleDelete(val) { console.log(val); },
        //高度监听
        resize() {
            let itemheight = document.documentElement.clientHeight;
            let boundingheight = this.$refs["table"].$el.getBoundingClientRect().top + 60;
            this.tableHeight = itemheight - boundingheight;
        },
        reset() {
            this.searchFrom = {
                orgName: '',
            }
            this.getTable()
        },
        search() {
            let temp = Object.assign(this.searchFrom, this.pagination)
            console.log(temp);
            console.log(this.pagination, this.searchFrom);
            deptList(temp).then(res => {
                this.tableData = res.result
                this.pagination.total = res.result.total
            })
        },

        deleteTable(val) {
            this.deletelTemp = val
        },
        //确认删除
        confirmDel() {
            del(this.deletelTemp).then(res => {
                if (res) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }
                this.getTable()
            })
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
        //修改
        updateTable(val) {
            this.title = '修改';
            this.dialogVisibleNew = true;
            console.log(val, 'updateTable');
            this.formNew = val;
        },

        // 获取表格数据
        getTable() {
            deptList(this.pagination).then(res => {
                this.tableData = this.handleTree(res.result, "id");
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
            addParams(this.formNew).then(res => {
                console.log(res)
                this.resetForm()
                if (res.errCode == 200) {
                    this.$message({
                        message: `${res.errMsg}`,
                        type: 'success'
                    });
                    this.getTable()
                } else {
                    this.$message({
                        message: `${res.errMsg}`,
                        type: 'error'
                    });
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