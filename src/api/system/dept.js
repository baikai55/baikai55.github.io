import request from "@/utils/request";

function addParams(data) {
  return request({
    url: "/sheriff/api/sysOrganization/create",
    method: "post",
    data,
  });
}
function getParamsList(data) {
  return request({
    url: "/sheriff/api/sysOrganization/page",
    method: "post",
    data,
  });
}
function del(data) {
  return request({
    url: "/sheriff/api/sysOrganization/delete",
    method: "delete",
    data,
  });
}
function update(data) {
  return request({
    url: "/sheriff/api/sysOrganization/update",
    method: "put",
    data,
  });
}
function deleteBatch(data) {
  return request({
    url: "/sheriff/api/sysOrganization/deleteBatch",
    method: "delete",
    data,
  });
}
function deptList(data) {
  return request({
    url: "/sheriff/api/sysOrganization/list",
    method: "post",
    data,
  });
}
export { addParams, getParamsList, del, update, deleteBatch, deptList };
