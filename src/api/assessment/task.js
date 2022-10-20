import request from "@/utils/request";
function addParams(data) {
  return request({
    url: "/sheriff/api/bizTask/create",
    method: "post",
    data,
  });
}
function getParamsList(data) {
  return request({
    url: "/sheriff/api/bizTask/page",
    method: "post",
    data,
  });
}
function del(data) {
  return request({
    url: "/sheriff/api/bizTask/delete",
    method: "delete",
    data,
  });
}
function update(data) {
  return request({
    url: "/sheriff/api/bizTask/update",
    method: "put",
    data,
  });
}
function deleteBatch(data) {
  return request({
    url: "/sheriff/api/bizTask/deleteBatch",
    method: "delete",
    data,
  });
}
function getOne(data, params) {
  return request({
    url: `/sheriff/api/bizTask/oneById/${data}/${params}`,
    method: "get",
  });
}
function checkTask(data) {
  return request({
    url: "/sheriff/api/bizTaskCheck/checkTask",
    method: "post",
    data,
  });
}
function AppTaskCheckList(data) {
  return request({
    url: `/sheriff/api/bizTaskCheck/checkTask`,
    method: "post",
    data,
  });
}
export {
  addParams,
  getParamsList,
  del,
  update,
  deleteBatch,
  getOne,
  checkTask,
  AppTaskCheckList,
};
