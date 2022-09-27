import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import Layout from '@/views/layout'
import asyncRouetr from './aynsc'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/index')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    let token = sessionStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
});

export function initAsyncRouter() {
  // 根据二级权限 对路由规则进行动态的添加
  const currentRoutes = router.options.routes
  const rightList = store.state.userRole
  rightList.forEach(item => {
    if (item.path) {
      const temp = asyncRouetr[item.path]
      // 路由规则中添加元数据meta
      if (temp) {
        currentRoutes[1].children.push(temp)
      }
    }

    item.children.forEach(item => {
      // item 二级权限
      const temp = asyncRouetr[item.path]
      if (temp) {
        currentRoutes[1].children.push(temp)
      }
    })
  })
  currentRoutes[1].children.push({ path: '*', component: () => import('@/views/404') })
  console.log(currentRoutes, 'currentRoutes');
  router.addRoute(...currentRoutes);
  console.log(router);
}
export default router
