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

export { login, routerBase };
