import request from "@/utils/request";
function createData(data) {
  return request({
    url: "/sheriff/api/bizTaskAppeal/create",
    method: "post",
    data,
  });
}
function getTableList(data) {
  return request({
    url: "/sheriff/api/bizTaskAppeal/page",
    method: "post",
    data,
  });
}
function update(data) {
  return request({
    url: "/sheriff/api/bizTaskAppeal/update",
    method: "put",
    data,
  });
}

function del(data) {
  return request({
    url: "/sheriff/api/bizTaskAppeal/delete",
    method: "delete",
    data,
  });
}
function deleteBatch(data) {
  return request({
    url: "/sheriff/api/bizTaskAppeal/deleteBatch",
    method: "delete",
    data,
  });
}
function getOne(data) {
  return request({
    url: "/sheriff/api/bizTaskAppeal/get/" + data,
    method: "get",
  });
}
function userList(data) {
  return request({
    url: "/sheriff/api/bizTaskAppeal/list",
    method: "post",
    data,
  });
}

export { createData, getTableList, update, del, deleteBatch, getOne, userList };
