import router from "@/router";


// export function initDynamicRoutes() {
//     // console.log(router)
//     // 根据二级权限 对路由规则进行动态的添加
//     const currentRoutes = router.options.routes
//     // currentRoutes[2].children.push()
//     const rightList = store.state.rightList
//     // console.log(rightList)
//     rightList.forEach(item => { // 如果是没有子路由的话 就直接添加进去 如果有子路由的话就进入二级权限遍历
//         // console.log(item, 'item-1')
//         if (item.path) {
//             const temp = ruleMapping[item.path]
//             // 路由规则中添加元数据meta
//             temp.meta = item.rights
//             currentRoutes[1].children.push(temp)
//         }

//         item.children.forEach(item => {
//             // item 二级权限
//             // console.log(item, 'item-2')
//             const temp = ruleMapping[item.path]
//             // 路由规则中添加元数据meta
//             temp.meta = item.rights
//             currentRoutes[1].children.push(temp)
//         })
//     })
//     // console.log(currentRoutes)
//     router.addRoutes(currentRoutes)
// }