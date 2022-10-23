import request from "@/utils/request";
function login(data) {
  return request({
    url: "/sheriff/login",
    method: "post",
    data,
  });
}
function routerBase() {
  return request({
    url: "/sheriff/getRouters",
    method: "get",
  });
}
function changePassword(data) {
  return request({
    url: "/sheriff/changePassword",
    method: "post",
    data
  });
}

export { login, routerBase, changePassword };
