# police

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


###  项目文件结构

├── src                       		 // 源代码

│    ├── api                    	// 网络请求

│    ├── assets                  // 图片等静态资源

│    ├── utils 					 //存放封装后的js

│    ├── mock			 		//未与后端通信时的假数据

│	   ├── components        // 存放组件

│    ├── router                   // 路由

│    ├── store                     // 全局 store管理

│    ├── App.vue               // 入口页面

│    ├── main.js                // 入口 加载组件 初始化等

│    ├── views                   // 页面文件

│    ├──────── system      // 系统管理

│    ├──────── assess      // 考核模型参数管理

│    ├──────── police      // 社区⺠警管理

│    ├──────── assessment      // 考核管理

│    ├──────── notice      // 公告管理

│    ├──────── ranking      // 排名统计



### 表格封装

对 element Table 进行二次封装

```
  /**
   * 表格接收参数      类型          例                          备注
   * table           Object       table:{tableData:[],header:[]}  tableData为传入表格数据/header表头数据
   * pageSize        Number       10                            页显示数据
   * currentPage     Number       1                             当前第几页
   *
   *header表头数据接收参数
   *prop             String        与element Table一致
   *label            String        与element Table一致
   *min-width        String        与element Table一致
   *width            String        与element Table一致
   *fixed            String        与element Table一致
   *tableOption      Array         [{type: "text",label: "授权",size: "mini",methods: "powerClick",}]
   *
   *
   *特殊配置
   *selection        Boolean        selection:true               多选
   *dia              Boolean        dia:true                     弹窗
   *status           Boolean        status:true                  状态0-n
   *color            Boolean        color:true                   颜色色块
   *colorBtn         Boolean        colorBtn:true                颜色按钮
   *control          Boolean        control:true                 操作
   */
```
