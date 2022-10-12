import request from "@/utils/request";
// 角色信息
export function getRoleMenu(data) {
  return request({
    url: "/sheriff/api/sysRole/bindMenu",
    method: "post",
    data,
  });
}
// 信息创建
export function getRoleCreate(data) {
  return request({
    url: "/sheriff/api/sysRole/create",
    method: "post",
    data,
  });
}

// 信息批量创建
export function getRoleBatch(data) {
  return request({
    url: "/sheriff/api/sysRole/createBatch",
    method: "post",
    data,
  });
}

// 删除信息
export function getRoleDel(data) {
  return request({
    url: "/sheriff/api/sysRole/delete",
    method: "delete",
    data,
  });
}

// 批量删除
export function deleteBatch(data) {
  return request({
    url: "/sheriff/api/sysRole/deleteBatch",
    method: "delete",
    data,
  });
}
// 单个获取
export function getRoleGetOne(dictId) {
  return request({
    url: "/sheriff/api/sysRole/get/" + dictId,
    method: "get",
  });
}
// 列表获取
export function getRoleList(data) {
  return request({
    url: "/sheriff/api/sysRole/list",
    method: "post",
    data,
  });
}

// 分页查询
export function getRolePage(data) {
  return request({
    url: "/sheriff/api/sysRole/page",
    method: "post",
    data,
  });
}

// 批量保存
export function PutRoleBatch(data) {
  return request({
    url: "/iot/api/sysRole/saveBatch",
    method: "put",
    data,
  });
}

// 信息更新
export function PutRoleUpdata(data) {
  return request({
    url: "/sheriff/api/sysRole/update",
    method: "put",
    data,
  });
}

// 绑定菜单
export function bindMenu(data) {
  return request({
    url: "/sheriff/api/sysRole/bindMenu",
    method: "post",
    data
  });
}
