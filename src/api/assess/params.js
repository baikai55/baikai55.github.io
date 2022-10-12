import request from "@/utils/request";
function getClassList() {
  return request({
    url: "/sheriff/api/bizParamScore/getParents",
    method: "get",
  });
}
function addParams(data) {
  return request({
    url: "/sheriff/api/bizParamScore/create",
    method: "post",
    data,
  });
}
function getParamsList(data) {
  return request({
    url: "/sheriff/api/bizParamScore/page",
    method: "post",
    data,
  });
}
function del(data) {
  return request({
    url: "/sheriff/api/bizParamScore/delete",
    method: "delete",
    data,
  });
}
function update() {
  return request({
    url: "/sheriff/api/bizParamScore/update",
    method: "put",
    data,
  });
}
function deleteBatch(data) {
  return request({
    url: "/sheriff/api/bizParamScore/deleteBatch",
    method: "delete",
    data,
  });
}
export { getClassList, addParams, getParamsList, del, update, deleteBatch };
