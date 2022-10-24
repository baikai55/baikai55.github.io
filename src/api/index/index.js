import request from "@/utils/request";

function getStatisticsTask() {
  return request({
    url: "/sheriff/api/bizTask/statisticsTask",
    method: "get",
  });
}
// function getTaskList(data) {
//   return request({
//     url: "/",
//     method: "post",
//     data,
//   });
// }
export { getStatisticsTask };
