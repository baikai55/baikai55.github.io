(function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports["greenchannel"]=t():e["greenchannel"]=t()})(self,(function(){return function(){var e={3834:function(e,t,n){"use strict";n.r(t),n.d(t,{bootstrap:function(){return X},mount:function(){return z},unmount:function(){return G}});var a=n(6369),o=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"serve-app"}},[t("router-view")],1)},r=[],u=n(1001),i={},s=(0,u.Z)(i,o,r,!1,null,null,null),c=s.exports,d=n(3822);a["default"].use(d.ZP);var l=new d.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}}),m=(n(8131),n(2631)),p=function(){var e=this,t=e._self._c;return t("div",{staticClass:"home"},[t("el-container",{staticStyle:{height:"100%","flex-direction":"column"}},[t("el-container",{staticClass:"content"},[t("Sidebar"),t("el-container",{staticClass:"right"},[t("Tabs"),t("el-container",[t("el-main",[t("router-view",{key:e.key})],1)],1)],1)],1)],1)],1)},_=[],f=function(){var e=this,t=e._self._c;return t("el-tabs",{staticClass:"tabs",attrs:{type:"card",closable:""},on:{"tab-click":e.tabClick,edit:e.handleTabsEdit},model:{value:e.key,callback:function(t){e.key=t},expression:"key"}},e._l(e.editableTabs,(function(n){return t("el-tab-pane",{key:n.name,attrs:{label:n.title,name:n.name},on:{click:function(t){return e.$router.push(n.name)}}})})),1)},h=[],b={data(){return{editableTabsValue:"/index"}},computed:{editableTabs(){return this.$store.state.editableTabs},key:{get(){return this.$route.path},set(){this.editableTabsValue=this.$route.path}}},methods:{tabClick(e){e.name!=this.$router.path&&this.$router.push(e.name)},handleTabsEdit(e,t){if("remove"===t&&"/index"!=e){var n=this.$store.state.editableTabs.findIndex((t=>t.name===e)),a=null;a=n==this.$store.state.editableTabs.length-1?n-1:n+1,this.editableTabs[a].name!=this.$route.path&&this.$router.push(this.editableTabs[a].name),this.$store.commit("del_tabs",n)}}}},g=b,y=(0,u.Z)(g,f,h,!1,null,null,null),v=y.exports,k=function(){var e=this,t=e._self._c;return t("el-aside",{staticClass:"a-side",attrs:{width:"180px"}},[t("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":e.key,"background-color":"#f5f6fa",router:!0}},e._l(e.menuData.children,(function(n){return t("el-menu-item",{key:n.menu_code,staticClass:"menu-item",attrs:{index:n.menu_path}},[t("i",{class:n.menu_icon?n.menu_icon:""}),t("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(n.menu_name))])])})),1)],1)},w=[],C=n(4471);function T(){return(0,C.Z)({method:"get",url:"/get/userMsg/data"})}var M={computed:{key:{get(){const{meta:e,path:t}=this.$route;return e.activeMenu||t},set(){this.editableTabsValue=this.$route.path}}},data(){return{menuData:[]}},mounted(){},created(){this.getSider()},methods:{getSider(){T().then((e=>{this.menuData=e.data.data[0].user_Menu[2],console.log(e.data.data[0].user_Menu[0],"res")})).catch((e=>console.log(e)))},addTabs(e){this.$router.push(e.name)}}},x=M,E=(0,u.Z)(x,k,w,!1,null,null,null),$=E.exports,N={components:{Tabs:v,Sidebar:$},computed:{key:{get(){return this.$route.path},set(){this.editableTabsValue=this.$route.path}}}},O=N,P=(0,u.Z)(O,p,_,!1,null,"ac5c4cec",null),A=P.exports;a["default"].use(m.Z);const j=[{path:"/",redirect:"/permissionMaintain",component:A,children:[{path:"/permissionMaintain",meta:{title:"权限维护",role:1},component:()=>n.e(822).then(n.bind(n,822))},{path:"/timeMaintain",meta:{title:"时间维护",role:1},component:()=>n.e(569).then(n.bind(n,5569))},{path:"/operationMaintain",meta:{title:"业务维护",role:1},component:()=>n.e(697).then(n.bind(n,9697))},{path:"/personnelMaintain",meta:{title:"人员维护",role:1},component:()=>n.e(563).then(n.bind(n,9563))},{path:"/personnelMaintain/:id",meta:{title:"人员维护详情",role:1,activeMenu:"/personnelMaintain"},component:()=>n.e(361).then(n.bind(n,3361))},{path:"/businessQuery",meta:{title:"业务查询",role:1},component:()=>n.e(570).then(n.bind(n,7570))}]}],D=m.Z.prototype.push;m.Z.prototype.push=function(e){return D.call(this,e).catch((e=>e))};var S=j,I=n(8499),Z=n.n(I),L=n(7634),R=n.n(L);let B=R().mock({data:[{id:1,date:"微信公众平台管理系统",name:"Root",address:"/",check:1,children:[{id:11,date:"用户管理",name:"Menu",check:1,address:"/home/userControl",children:[{id:12,date:"事件管理",name:"Menu",check:1,address:"/home/userControl"},{id:21,date:"活动管理",name:"Menu",check:0,address:"/home/userControl"}]},{id:31,date:"蚂蚁管理",name:"Menu",address:"/home/userControl",check:0},{id:32,date:"机构管理",name:"Menu",address:"/home/userControl",check:1},{id:41,date:"角色管理",name:"Menu",address:"/home/userControl",check:0}]}]});var U=B;n(6699);let Q=R().mock({status:200,message:"success",data:[{user_code:"1111111",pass_word:"1111111",user_name:"A@cname",user_rank:"0",user_type:0,dept_code:423423,telephone:/^1[345678]\d{9}$/,status:0,"user_Menu|3":[{menu_code:/\d{6}/,"menu_name|+1":["系统管理","行信应用","清算服务"],"children|+1":[[{menu_name:"用户管理",menu_type:2,menu_icon:"",menu_path:"/userControl"},{menu_name:"机构管理",menu_type:2,menu_icon:"",menu_path:"/management"},{menu_name:"角色管理",menu_type:2,menu_icon:"",menu_path:"/rolemanagement"},{menu_name:"菜单管理",menu_type:2,menu_icon:"",menu_path:"/menuControl"}],[{menu_name:"应用管理",menu_type:2,menu_icon:"",menu_path:"/bank/appControl"},{menu_name:"模块管理",menu_type:2,menu_icon:"",menu_path:"/bank/moduleControl"},{menu_name:"菜单管理",menu_type:2,menu_icon:"",menu_path:"/bank/menuControl"},{menu_name:"可见管理",menu_type:2,menu_icon:"",menu_path:"/bank/visibleControl"},{menu_name:"点击统计",menu_type:2,menu_icon:"",menu_path:"/bank/clickCount"},{menu_name:"点击记录",menu_type:2,menu_icon:"",menu_path:"/bank/clickLog"}],[{menu_name:"权限维护",menu_type:2,menu_icon:"",menu_path:"/permissionMaintain"},{menu_name:"时间维护",menu_type:2,menu_icon:"",menu_path:"/timeMaintain"},{menu_name:"业务维护",menu_type:2,menu_icon:"",menu_path:"/operationMaintain"},{menu_name:"人员维护",menu_type:2,menu_icon:"",menu_path:"/personnelMaintain"},{menu_name:"业务查询",menu_type:2,menu_icon:"",menu_path:"/businessQuery"}]],"menu_type|+1":[1,1,1],"status|0-1":0,"menu_icon|+1":["el-icon-setting","el-icon-office-building","el-icon-toilet-paper"],"menu_path|+1":["","/bank",""]}]}]});var K=Q,Y={login:e=>{let t=JSON.parse(e.body),n={},a=K.data.map((e=>t.user_code===e.user_code&&t.pass_word===e.pass_word&&(n=e,!0)));return a.includes(!0)?{code:200,data:{userList:n,status:200}}:{code:-1,data:{msg:"用户名或密码错误",status:201}}}};let W=R().mock({data:[/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/],xAxisData:["6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]}),q=R().mock({data:[{value:/\d{2,3}/,name:"扫码登陆"},{value:/\d{2,3}/,name:"ID登录"},{value:/\d{2,3}/,name:"邮箱登录"},{value:/\d{2,3}/,name:"手机号登录"},{value:/\d{2,3}/,name:"XXX登录"}]}),F=R().mock({data:[/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/,/\d{2,3}/],xAxisData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]});R().mock(/\/api\/healthPlat\/getRecipe/,"get",{}),R().mock(/\/api\/healthPlat\/getRecipe/,"get",{status:1,"data|100":[{"user_code|1":/\d{7}/,user_name:"@cname","status|0-1":0,"dept_name|+1":["杭州飞云江路支行\t","杭州保俶路支行\t","浙江自贸区杭州钱塘支行\t","杭州市分行","杭州西溪谷支行\t","浙江自贸区杭州萧山桥南支行","杭州望江支行\t","桐庐迎春街支行\t","富阳春江支行\t","浙江自贸区杭州滨江支行","浙江省分行\t","萧山分行\t","杭州萧山开发区支行","杭州萧山瓜沥支行\t","杭州萧山衙前支行\t","杭州萧山临浦支行\t","杭州萧山湘湖支行\t","杭州萧山崇化支行\t","杭州萧山汽车城支行\t","杭州萧山四季花城支行"],"dept_code|2":/\d{4}/,telephone:/^1[35678]\d{9}$/,"isNo|0-1":0,hand:["授权","查看","修改","删除"]}]}),R().mock(/\/api\/rolemana\/getRecipe/,"get",{status:1,"data|10":[{role_code:/\d{7}$/,role_name:"@cname","select|0-1":0,"boss|+1":["全部","本人","本级及下级"],role_memo:"@csentence(8)"}]}),R().mock(/\/api\/appcontrol\/getdata/,"get",{status:1,"data|20":[{app_code:/\d{7}$/,"app_name|+1":["常用工具","经营管理","营销助手","信息交流"],app_id:"wx83ff38f178b048f7",app_key:/\w{32}/,app_url:"@url",date:"@datetime",app_token:/\w{64}/,web_token:/\w{128}/,"status|0-1":0,app_color:"@color",show_number:/\d{2}/}]}),R().mock(/\/api\/moudelcontrol\/getdata/,"get",{status:1,"data|10":[{app_code:/\d{7}$/,"moudel_name|+1":["最近使用","常用工具","最近使用","经营管家","个金掌上通","中银i普惠","最近使用","营销助手","清算服务在线","信息交流"],"app_type|+1":["最近使用","应用菜单","最近使用","应用菜单","应用菜单","应用菜单","最近使用","应用菜单","应用菜单","应用菜单"],app_sort:/\d{1}/,"show_type|0-1":0,app_bgc:"@color",app_font_color:"@color",date:"@datetime","app_name|+1":["常用工具","常用工具","经营管理","经营管理","经营管理","经营管理","营销助手","营销助手","营销助手","信息交流"]}]}),R().mock(/\/api\/menucontrol\/getdata/,"get",{status:1,"data|10":[{menu_code:/\d{7}$/,"menu_name|+1":["我要报修","报修管理报修管理","设备盘点","你问我答","了解员工","渠运管理","值班管理","签到","交接","会议通知"],menu_icon:"@dataImage('100x100', '我是图片')",go_url:"@url",read_url:"@url","menu_type|0-1":0,menu_sort:/\d[1-2]/,fnot_color:"@color","params_type|0-1":0,"ency_type|0-1":0,decode_key:/\w{648}/,impower_ip:"@ip",module_name:"常用工具","menu_status|0-1":0,"msg_type|0-1":0,"search_type|0-2":0,start_time:"@datetime",end_time:"@datetime"}]}),R().mock(/\/api\/visiblecontrol\/getdata/,"get",{status:1,"data|10":[{app_code:/\d{7}/,user_name:"@cname",menu_code:/\d{8}/,menu_name:"刷新令牌","menu_status|0-1":0,moudle_code:/\d{7}/,mudle_name:"常用工具",app_name:"常用工具",date:"@datetime"}]}),R().mock(/\/api\/clicklog\/getdata/,"get",{status:1,data:[{app_code:/\d{7}/,user_name:"@cname",menu_code:/\d{8}/,menu_name:"营销助手","menu_status|0-1":0,moudle_code:/\d{7}/,mudle_name:"常用工具",app_name:"常用工具",date:"@datetime"}]}),R().mock(/\/api\/treeMenu\/getRecipe/,"get",U),R().mock(/\user\/login/,"get",Y.login),R().mock(/\/get\/echarts\/lineData/,"get",W),R().mock(/\/get\/echarts\/pieData/,"get",q),R().mock(/\/get\/echarts\/barData/,"get",F),R().mock(/\/get\/userMsg\/data/,"get",K),a["default"].use(Z()),a["default"].config.productionTip=!1;let J=null,V=null;function H(e={}){const{container:t}=e;console.log(t,"container"),console.log(window.__POWERED_BY_QIANKUN__,"window.__POWERED_BY_QIANKUN__"),J=new m.Z({base:window.__POWERED_BY_QIANKUN__?"/app/serve":"/",mode:"history",routes:S}),V=new a["default"]({router:J,store:l,render:e=>e(c)}).$mount(t?t.querySelector("#serve-app"):"#serve-app")}async function X(){console.log("[vue] vue app bootstraped")}async function z(e){console.log("[vue] props from main framework",e),H(e)}async function G(){V.$destroy(),V.$el.innerHTML="",V=null,J=null}window.__POWERED_BY_QIANKUN__||H(),a["default"].config.productionTip=!1},8131:function(e,t,n){window.__POWERED_BY_QIANKUN__&&(n.p=window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)},4471:function(e,t,n){"use strict";var a=n(6265),o=n.n(a),r=n(8499);let u,i=o().create({baseURL:"/",timeout:5e3});i.interceptors.request.use((function(e){return u=r.Loading.service({lock:!0,text:"加载中……",background:"rgba(255, 255, 255, 0.5)"}),e&&u.close(),e}),(function(e){u.close(),Promise.reject(e)})),i.interceptors.response.use((function(e){return e&&u.close(),e}),(function(e){u.close(),Promise.reject(e)})),t["Z"]=i}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={exports:{}};return e[a].call(r.exports,r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(t,a,o,r){if(!a){var u=1/0;for(d=0;d<e.length;d++){a=e[d][0],o=e[d][1],r=e[d][2];for(var i=!0,s=0;s<a.length;s++)(!1&r||u>=r)&&Object.keys(n.O).every((function(e){return n.O[e](a[s])}))?a.splice(s--,1):(i=!1,r<u&&(u=r));if(i){e.splice(d--,1);var c=o();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[a,o,r]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,a){return n.f[a](e,t),t}),[]))}}(),function(){n.u=function(e){return"static/js/"+e+"."+{361:"33a08162",563:"a687b4d3",569:"ef6da742",570:"415bf101",697:"0f0c9de5",822:"f1bc0099"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"static/css/"+e+"."+{361:"02e22557",563:"02e22557",569:"02e22557",570:"02e22557",697:"02e22557",822:"02e22557"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="greenchannel:";n.l=function(a,o,r,u){if(e[a])e[a].push(o);else{var i,s;if(void 0!==r)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var l=c[d];if(l.getAttribute("src")==a||l.getAttribute("data-webpack")==t+r){i=l;break}}i||(s=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",t+r),i.src=a),e[a]=[o];var m=function(t,n){i.onerror=i.onload=null,clearTimeout(p);var o=e[a];if(delete e[a],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(m.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=m.bind(null,i.onerror),i.onload=m.bind(null,i.onload),s&&document.head.appendChild(i)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/app/greenchannel/"}(),function(){var e=function(e,t,n,a){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var r=function(r){if(o.onerror=o.onload=null,"load"===r.type)n();else{var u=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=u,s.request=i,o.parentNode.removeChild(o),a(s)}};return o.onerror=o.onload=r,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var o=n[a],r=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(r===e||r===t))return o}var u=document.getElementsByTagName("style");for(a=0;a<u.length;a++){o=u[a],r=o.getAttribute("data-href");if(r===e||r===t)return o}},a=function(a){return new Promise((function(o,r){var u=n.miniCssF(a),i=n.p+u;if(t(u,i))return o();e(a,i,o,r)}))},o={143:0};n.f.miniCss=function(e,t){var n={361:1,563:1,569:1,570:1,697:1,822:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=a(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,a){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)a.push(o[2]);else{var r=new Promise((function(n,a){o=e[t]=[n,a]}));a.push(o[2]=r);var u=n.p+n.u(t),i=new Error,s=function(a){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var r=a&&("load"===a.type?"missing":a.type),u=a&&a.target&&a.target.src;i.message="Loading chunk "+t+" failed.\n("+r+": "+u+")",i.name="ChunkLoadError",i.type=r,i.request=u,o[1](i)}};n.l(u,s,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,a){var o,r,u=a[0],i=a[1],s=a[2],c=0;if(u.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(s)var d=s(n)}for(t&&t(a);c<u.length;c++)r=u[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(d)},a=self["webpackJsonp_greenchannel"]=self["webpackJsonp_greenchannel"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[998],(function(){return n(3834)}));return a=n.O(a),a}()}));