import request from "@/utils/request";
function uploadAll(data) {
  return request({
    url: "/sheriff/api/sysAttachment/plural/upload",
    method: "post",
    data,
  });
}
export { uploadAll };
