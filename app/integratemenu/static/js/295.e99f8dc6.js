"use strict";(self["webpackJsonp_integratemenu"]=self["webpackJsonp_integratemenu"]||[]).push([[295],{7295:function(e,t,a){a.r(t),a.d(t,{default:function(){return h}});var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"app-control"},[e._m(0),t("div",{staticClass:"app-control-nav"},[t("div",{staticClass:"table-control-search"},[t("el-form",{ref:"searchFrom",attrs:{model:e.searchFrom,inline:""}},[t("div",{staticClass:"search-left"},[t("el-form-item",{attrs:{prop:"userId",label:"员工序号："}},[t("el-input",{model:{value:e.searchFrom.userId,callback:function(t){e.$set(e.searchFrom,"userId",t)},expression:"searchFrom.userId"}})],1)],1),t("div",{staticClass:"search-content"},[t("el-form-item",{attrs:{prop:"userId",label:"员工姓名："}},[t("el-input",{model:{value:e.searchFrom.userId,callback:function(t){e.$set(e.searchFrom,"userId",t)},expression:"searchFrom.userId"}})],1)],1),t("div",{staticClass:"search-right"},[t("el-form-item",[t("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-search"}},[e._v("查询可见")])],1),t("el-form-item",[t("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-plus"}},[e._v("添加可见")])],1)],1)])],1)]),t("div",{staticClass:"table-control-main"},[e._m(1),t("div",{staticClass:"m-content"},[t("el-table",{ref:"table",attrs:{data:e.tableData.slice((e.currentPage-1)*e.pageSize,e.currentPage*e.pageSize),"row-key":e.tableData.app_code,stripe:"","highlight-current-row":!0,border:"",id:"table",height:e.tableHeightComputed,width:"100%"}},[t("el-table-column",{attrs:{prop:"app_code",align:"center",label:"员工序号",width:"150px"}}),t("el-table-column",{attrs:{prop:"user_name",align:"center",width:"120px",label:"员工姓名"}}),t("el-table-column",{attrs:{prop:"menu_code",align:"center",width:"120px",label:"菜单编码","show-overflow-tooltip":!0}}),t("el-table-column",{attrs:{prop:"menu_name",align:"center",width:"120px",label:"菜单名称","show-overflow-tooltip":!0}}),t("el-table-column",{attrs:{prop:"menu_status",width:"120px",align:"center","show-overflow-tooltip":!0,label:"菜单状态",formatter:e.menu_status}}),t("el-table-column",{attrs:{prop:"moudle_code",align:"center",width:"120px",label:"模块编码","show-overflow-tooltip":!0}}),t("el-table-column",{attrs:{prop:"mudle_name",align:"center",width:"120px",label:"模块名称"}}),t("el-table-column",{attrs:{prop:"moudle_code",align:"center",width:"120px",label:"应用编码"}}),t("el-table-column",{attrs:{prop:"app_name",align:"center",label:"应用名称",width:"120px"}}),t("el-table-column",{attrs:{prop:"date",align:"center",label:"创建时间",width:"170px"}}),t("el-table-column",{attrs:{align:"center",label:"操作",fixed:"right"}},[[t("el-button",{attrs:{type:"text",size:"small"}},[e._v("删除可见")])]],2)],1)],1),t("div",{staticClass:"block"},[t("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,40],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.tableData.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)]),t("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("span",[e._v(e._s(e.propsMsg))]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)])],1)},i=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"search-control-header"},[t("p",[e._v("查询条件")])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"m_text"},[t("p",[e._v("可见管理")])])}],s=a(4471),r={data(){return{searchFrom:{searchRegion:"",searchName:"",searchPhone:"",userId:"",checkMana:""},select:[{id:1,label:"全部",value:""},{id:2,label:"已绑定",value:"1"},{id:3,label:"未绑定",value:"0"}],tableData:[],currentPage:1,pageSize:10,dialogVisible:!1,propsMsg:"",itemHeight:1,itemHeaderHeight:1,tableHeight:document.documentElement.clientHeight/1.8}},computed:{tableHeightComputed(){return console.log(this.tableHeight-this.itemHeaderHeight),this.tableHeight-this.itemHeaderHeight}},watch:{itemHeaderHeight(e,t){console.log(e,t),this.resize(e,t)}},mounted(){this.tableHeight=this.tableHeight-this.itemHeaderHeight,addEventListener("resize",this.resize)},destroyed(){removeEventListener("resize",this.resize)},created(){this.getTableData(),this.$nextTick((()=>{let e=document.documentElement.clientHeight,t=this.$refs["table"].$el.getBoundingClientRect().top;this.tableHeight=e-t-60,console.log(this.tableHeight,t,"this.tableHeight - this.itemHeaderHeight")}))},methods:{resize(){let e=document.documentElement.clientHeight,t=this.$refs.table.$el.getBoundingClientRect().top;this.tableHeight=e-t-60},menu_status(e){return 0===e.menu_status?"部分可见":"全部可见"},getTableData(){s.Z.get("/api/visiblecontrol/getdata").then((e=>{this.tableData=e.data.data,console.log(this.tableData,"this.tableData")}))},handleSizeChange(e){this.pageSize=e},handleCurrentChange(e){this.currentPage=e}}},n=r,o=a(1001),c=(0,o.Z)(n,l,i,!1,null,"38e37bc0",null),h=c.exports}}]);