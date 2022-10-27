import request from "@/utils/request";

function getData(data) {
  return request({
    url: "/sheriff/api/sysUser/ranking",
    method: "post",
    data,
  });
}
export { getData };
