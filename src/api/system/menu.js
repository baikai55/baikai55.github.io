import request from "@/utils/request";
// 分页查询
export function getMenuList(data) {
    return request({
        url: "/sheriff/api/sysMenu/page",
        method: "post",
        data
    })
}
// 列表查询
export function menulist(data) {
    return request({
        url: "/sheriff/api/sysMenu/list",
        method: 'post',
        data
    })
}

// 删除
export function deldata(data) {
    return request({
        url: "/sheriff/api/sysMenu/delete",
        method: 'delete',
        data
    })
}
// 信息创建
export function createData(data) {
    return request({
        url: "/sheriff/api/sysMenu/create",
        method: 'post',
        data
    })
}
// 信息更新
export function putdate(data) {
    return request({
        url: "/sheriff/api/sysMenu/update",
        method: "put",
        data
    })
}
// 单个获取
export function getdateone(ids) {
    return request({
        url: "/sheriff/api/sysMenu/get/" + ids,
        method: "get",
    })
}
