import request from "@/utils/request";

function getData(data) {
  return request({
    url: "/sheriff/api/bizScoreRecord/page",
    method: "post",
    data
  });
}
export { getData };
