import request from "@/utils/request";
function getClassList() {
  return request({
    url: "/sheriff/api/bizParamScore/getParents",
    method: "get",
  });
}
function getLillteClass(data) {
  return request({
    url: "/sheriff/api/bizParamScore/getChildren",
    method: "post",
    data,
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
function update(data) {
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
function getOne(data) {
  return request({
    url: "/sheriff/api/bizParamScore/get/" + data,
    method: "get",
  });
}
export {
  getClassList,
  getLillteClass,
  addParams,
  getParamsList,
  del,
  update,
  deleteBatch,
  getOne,
};
