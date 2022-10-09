<template>
    <div class="table-form">
        <div class="search-control-header m_text">
            <p>查询条件</p>
        </div>
        <div class="user-control-nav" ref="itemHeader">
            <!-- 搜索开始 -->
            <div class="table-control-search">
                <el-form :model="searchFrom" inline ref="searchFrom" size="mini">
                    <el-form-item prop="userId" label="员工工号：">
                        <el-input v-model="searchFrom.userId"></el-input>
                    </el-form-item>
                    <el-form-item prop="userName" label="员工名称：">
                        <el-input v-model="searchFrom.userName"></el-input>
                    </el-form-item>
                    <el-form-item prop="telephone" label="手机号码：">
                        <el-input v-model="searchFrom.telephone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" icon="el-icon-search">查询
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="info" icon="el-icon-refresh">
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
                        <el-button id="newstaff" icon="el-icon-plus" size="small">新增</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="table">
            <Table :table="table" ref="table" @handButton="handButton"></Table>
        </div>
        <div class="pagination">
            <Pagination background @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
                :total="pagination.total" :page="pagination.page" :pageSizes="pagination.pageSizes">
            </Pagination>
        </div>
    </div>
</template>

<script>
import { getTableData } from '@/api/table';

export default {
    data() {
        return {
            searchFrom: {
                userId: '',
                userName: '',
                telephone: '',
            },
            pagination: {
                total: 0,
                page: 1,
                pageSizes: 10,
            },
            table: {
                tableData: [],
                header: [
                    { prop: "date", label: "员工工号", width: "120px" },
                    { prop: "name", label: "员工姓名", width: "110px" },
                    { prop: "address", label: "所属机构", minWidth: "120px" },
                    {
                        prop: "", label: "操作", width: "120px", control: true,
                        tableOption: [
                            { type: "text", label: "修改", size: "mini", methods: "update", },
                            { type: "text", label: "删除", size: "mini", methods: "delete", },
                        ]
                    }
                ]
            }
        };
    },
    created() {
        this.tableData()
    },
    methods: {
        //表格操作传参
        handButton(val) {
            console.log(val, 'handButton');
        },
        // 分页器一页显示多少条
        handleSizeChange(val) {
            console.log(val, 'handleSizeChange');
            this.pagination.pageSizes = val.pageSize;
        },
        // 分页器当前页
        handleCurrentChange(val) {
            console.log(val, 'handleCurrentChange');
            this.pagination.page = val.currentPage;
        },
        // 获取表格数据
        tableData() {
            getTableData().then(res => {
                console.log(res, 'res');
                this.table.tableData = res.data
                this.pagination.total = res.data.length
            })
        }
    }
}
</script>

<style>

</style>