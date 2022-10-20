import request from "@/utils/request";
function createData(data) {
  return request({
    url: "/sheriff/api/bizAnnouncement/create",
    method: "post",
    data,
  });
}
function getTableList(data) {
  return request({
    url: "/sheriff/api/bizAnnouncement/page",
    method: "post",
    data,
  });
}
function update(data) {
  return request({
    url: "/sheriff/api/bizAnnouncement/update",
    method: "put",
    data,
  });
}

function del(data) {
  return request({
    url: "/sheriff/api/bizAnnouncement/delete",
    method: "delete",
    data,
  });
}
function deleteBatch(data) {
  return request({
    url: "/sheriff/api/bizAnnouncement/deleteBatch",
    method: "delete",
    data,
  });
}
function getOne(data) {
  return request({
    url: "/sheriff/api/bizAnnouncement/get/" + data,
    method: "get",
  });
}
function userList(data) {
  return request({
    url: "/sheriff/api/bizAnnouncement/list",
    method: "post",
    data
  });
}
export { createData, getTableList, update, del, deleteBatch, getOne, userList };
