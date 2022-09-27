
const dept = {
    path: '/system/dept',
    component: () => import('@/views/system/dept'),
}
const user = {
    path: '/system/user',
    component: () => import('@/views/system/user'),
}
const permission = {
    path: '/system/permission',
    component: () => import('@/views/system/permission'),
}
const roles = {
    path: '/system/roles',
    component: () => import('@/views/system/roles'),
}
const white = {
    path: '/system/white',
    component: () => import('@/views/system/white'),
}
const asyncRouetr =
{
    '/system/dept': dept,
    '/system/user': user,
    '/system/permission': permission,
    '/system/roles': roles,
    '/system/white': white,
}
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },
// {
//     path: '/index',
//     component: () => import('@/views/index')
// },

export default asyncRouetr