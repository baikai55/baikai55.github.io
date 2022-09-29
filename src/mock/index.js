// 使用Mock
const Mock = require('mockjs')
Mock.setup({
    timeout: '500-1000'
})

// 用户信息
const users = [
    {
        id: 1,
        username: 'zhangsan',
        password: '123456',
        photo: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2667925509,1048662418&fm=11&gp=0.jpg',
        token: 'zhangsan-token',
        role: 'zhangsan',
        rights: []
    },
    {
        id: 2,
        username: 'admin',
        password: '123456',
        photo: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2364244149,3298797080&fm=26&gp=0.jpg',
        token: 'admin-token',
        role: 'admin',
        rights: []
    }
]

// 权限信息 将权限信息从用户信息中抽离出来 不同身份对应不同的路由信息
// 这样方便了后期的维护 否则以后每加一个页面就需要在每个用户信息中做更改 十分的不方便 如果用户多了更是增添了不必要的麻烦
// 将用户直接分为不同身份 然后对不同身份做处理 这样比较合理
const roles = {
    zhangsan: [
        {
            id: 189,
            title: '系统管理',
            icon: 'el-icon-connection',
            children: [
                {
                    id: 11,
                    title: '用户管理',
                    icon: 'el-icon-s-grid',
                    path: '/system/user',
                },]
        },
        {
            id: 1,
            title: '基本页面',
            icon: 'el-icon-connection',
            children: [
                {
                    id: 11,
                    title: '表格页面',
                    icon: 'el-icon-s-grid',
                    path: 'table',
                    rights: ['view']
                },
                {
                    id: 12,
                    authName: '素材页面',
                    icon: 'el-icon-s-marketing',
                    path: 'image',
                    rights: ['view']
                }
            ]
        }
    ],
    admin: [
        {
            id: 1,
            "path": "/system",
            "title": "系统管理",
            icon: 'el-icon-connection',
            "children": [
                {
                    id: 11,
                    title: '机构管理',
                    icon: 'el-icon-s-grid',
                    path: '/system/dept',
                }, {
                    id: 113,
                    title: '⽤户管理',
                    icon: 'el-icon-s-grid',
                    path: '/system/user',
                }, {
                    id: 112,
                    title: '权限管理',
                    icon: 'el-icon-s-grid',
                    path: '/system/permission',
                }, {
                    id: 111,
                    title: '⻆⾊管理',
                    icon: 'el-icon-s-grid',
                    path: '/system/roles',
                },
                {
                    id: 12,
                    title: '⽩名单管理',
                    icon: 'el-icon-s-marketing',
                    path: '/system/white',
                }
            ]
        },
        {
            id: 2,
            title: '考核模型参数管理',
            icon: 'el-icon-connection',
            path: "/assess",
            children: [
                {
                    id: 212,
                    title: '参数管理',
                    icon: 'el-icon-s-marketing',
                    path: '/assess/params',
                },
                {
                    id: 2121,
                    title: '考核类型管理',
                    icon: 'el-icon-s-marketing',
                    path: '/assess/type',
                },
                {
                    id: 2112,
                    title: '考核分值管理',
                    icon: 'el-icon-s-marketing',
                    path: '/assess/score',
                },
            ]
        },
        {
            id: 33,
            title: '社区⺠警管理',
            icon: 'el-icon-connection',
            path: "/police",
            children: [
                {
                    id: 312,
                    title: '派出所管理',
                    icon: 'el-icon-s-marketing',
                    path: '/police/dept',
                },
                {
                    id: 3121,
                    title: '派出所考评管理',
                    icon: 'el-icon-s-marketing',
                    path: '/police/score',
                },
                {
                    id: 3112,
                    title: '⺠警信息管理',
                    icon: 'el-icon-s-marketing',
                    path: '/police/msg',
                },
            ]
        },
        {
            id: 43,
            title: '考核管理',
            icon: 'el-icon-connection',
            path: "/assessment",
            children: [
                {
                    id: 412,
                    title: '考核任务管理',
                    icon: 'el-icon-s-marketing',
                    path: '/assessment/task',
                },
                {
                    id: 4121,
                    title: '考核任务发布',
                    icon: 'el-icon-s-marketing',
                    path: '/assessment/update',
                },
                {
                    id: 4112,
                    title: '考核任务完成情况',
                    icon: 'el-icon-s-marketing',
                    path: '/assessment/details',
                }, {
                    id: 4122,
                    title: '考核分值项录⼊',
                    icon: 'el-icon-s-marketing',
                    path: '/assessment/score',
                },
            ]
        },
        {
            id: 53,
            title: '公告管理',
            icon: 'el-icon-connection',
            path: "/notice",
            children: [
                {
                    id: 512,
                    title: '公告管理',
                    icon: 'el-icon-s-marketing',
                    path: '/notice/control',
                },
                {
                    id: 5121,
                    title: '公告发布',
                    icon: 'el-icon-s-marketing',
                    path: '/notice/update',
                },
            ]
        },
        {
            id: 63,
            title: '排名统计',
            icon: 'el-icon-connection',
            path: "/ranking",
            children: [
                {
                    id: 6112,
                    title: '数据详细查询',
                    icon: 'el-icon-s-marketing',
                    path: '/ranking/details',
                },
                {
                    id: 612,
                    title: '数据管理',
                    icon: 'el-icon-s-marketing',
                    path: '/ranking/control',
                },
                {
                    id: 6121,
                    title: '派出所均分排名',
                    icon: 'el-icon-s-marketing',
                    path: '/ranking/meanscore',
                },
                {
                    id: 6113,
                    title: '社区⺠警得分排名',
                    icon: 'el-icon-s-marketing',
                    path: '/ranking/scorerank',
                },
            ]
        },
        {
            id: 3,
            path: "*",
        },
    ]
}

// 表格信息
const tables = [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
}, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
}, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
}, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
}, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
}, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
}, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
}, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
}, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
}, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
}, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
}, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}]

// 用户登录
Mock.mock('/login', 'post', option => {
    const { username, password } = JSON.parse(option.body)
    const user = users.find(item => {
        return item.username === username && item.password === password
    })
    return user
})

// 用户权限信息
Mock.mock('/roles', 'post', option => {
    return roles[option.body]
})

// 获取表格信息
Mock.mock('/tabledata', 'get', () => {
    // 这里是获取session中token 然后验证token是否正确 如果不正确则不返回数据
    const token = sessionStorage.getItem('token')
    // 由于这里是Mock数据 所以将用户的token在这里写死了 然后验证token是否正确
    if (token === 'admin-token' || token === 'zhangsan-token') {
        return tables
    } else {
        // 如果将session中token更改为错误的token 则展示这个信息
        alert('无效token')
        // 关闭弹出信息后返回401 之后通过响应拦截器跳转到登录页面
        return {
            status: 401
        }
    }
})

// 删除表格信息
Mock.mock('/tabledata', 'delete', option => {
    console.log(option)
    return {
        msg: '删除成功'
    }
})
