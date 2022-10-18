import request from "@/utils/request";
// 定时任务调度表

// 定时任务修改
// export function putJob(data) {
//     return request({
//         url: "/iot/api/sysJob/changeStatus",
//         method: "put",
//         data
//     })
// }


// 信息创建 
export function getJob(data) {
    return request({
        url: "/sheriff/api/sysJob/create",
        method: "post",
        data
    })
}

// 删除信息
export function delJob(data) {
    return request({
        url: "/sheriff/api/sysJob/delete",
        method: "delete",
        data
    })
}

// 定时任务删除
export function deleteBatch(jobIds) {
    return request({
        url: "/sheriff/api/sysJob/deleteBatch/" + jobIds,
        method: "delete",
    })
}

// 导出
export function putJobExport() {
    return request({
        url: "/sheriff/api/sysJob/export",
        method: "post",
    })
}

// 单个获取
export function getJobGet(data) {
    return request({
        url: "/sheriff/api/sysJob/get",
        method: "post",
        data
    })
}

// 列表获取
export function getJobList(data) {
    return request({
        url: "/sheriff/api/sysJob/list",
        method: "post",
        data
    })
}
// 分页获取
export function getJobPage(data) {
    return request({
        url: "/sheriff/api/sysJob/page",
        method: "post",
        data
    })
}

// 定时任务执行
export function putJobRun(data) {
    return request({
        url: "/sheriff/api/sysJob/run",
        method: "put",
        data
    })
}

// 信息更新
export function putJobUpdata(data) {
    return request({
        url: "/sheriff/api/sysJob/update",
        method: "put",
        data
    })
}
