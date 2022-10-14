import request from "@/utils/request";
function addParams(data) {
  return request({
    url: "/sheriff/api/bizPoliceUser/create",
    method: "post",
    data,
  });
}
function getParamsList(data) {
  return request({
    url: "/sheriff/api/bizPoliceUser/page",
    method: "post",
    data,
  });
}
function del(data) {
  return request({
    url: "/sheriff/api/bizPoliceUser/delete",
    method: "delete",
    data,
  });
}
function update(data) {
  return request({
    url: "/sheriff/api/bizPoliceUser/update",
    method: "put",
    data,
  });
}
function deleteBatch(data) {
  return request({
    url: "/sheriff/api/bizPoliceUser/deleteBatch",
    method: "delete",
    data,
  });
}
function getOne(data) {
  return request({
    url: "/sheriff/api/bizPoliceUser/get/" + data,
    method: "get",
  });
}
export { addParams, getParamsList, del, update, deleteBatch, getOne };
