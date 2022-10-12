import request from "@/utils/request";
function createData(data) {
  return request({
    url: "/sheriff/api/sysUser/create",
    method: "post",
    data,
  });
}
function getTableList(data) {
  return request({
    url: "/sheriff/api/sysUser/page",
    method: "post",
    data,
  });
}
function update(data) {
  return request({
    url: "/sheriff/api/sysUser/update",
    method: "put",
    data,
  });
}

function del(data) {
  return request({
    url: "/sheriff/api/sysUser/delete",
    method: "delete",
    data,
  });
}
function deleteBatch(data) {
  return request({
    url: "/sheriff/api/sysUser/deleteBatch",
    method: "delete",
    data,
  });
}
function getOne(data) {
  return request({
    url: "/sheriff/api/sysUser/get/" + data,
    method: "get",
  });
}
function userList(data) {
  return request({
    url: "/sheriff/api/sysUser/list",
    method: "post",
    data
  });
}
export { createData, getTableList, update, del, deleteBatch, getOne, userList };
