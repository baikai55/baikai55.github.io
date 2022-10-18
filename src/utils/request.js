import axios from "axios";
import { Message, MessageBox } from "element-ui";
import router from "../router";
import nprogress from "nprogress";

let request = axios.create({
  baseURL: window.global_url.baseURL,
  // baseURL: "http://192.168.50.225:18099/",
  // baseURL: "http://192.168.107.83:18099/",
  // baseURL: "/",
  timeout: 5000,
});
request.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
request.interceptors.request.use(
  (config) => {
    const isToken = (config.headers || {}).isToken === false;
    if (!isToken) {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token"); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    nprogress.start();
    if (config) {
      nprogress.done();
    }
    return config;
    /* 取到数据后 */
  },
  (err) => {
    // nprogress.done()
    Promise.reject(err);
  }
);
request.interceptors.response.use(
  (res) => {
    if (res.data.errCode == 401) {
      localStorage.clear();
      router.replace("/login");
      Message({
        message: "登录过期，请重新登录",
        type: "error",
      });
    }
    if (res.data.errCode != 401 && res.data.errCode != 200) {
      MessageBox.alert(
        `${res.data.errMsg} : <span style='color:red'>${res.data.result}</span> `,
        "通知",
        {
          confirmButtonText: "确定",
          dangerouslyUseHTMLString: true,
        }
      );
    }
    return res.data;
  },
  (err) => {
    Message({
      message: `${err.data.errMsg} : ${err.data.result}`,
      type: "error",
    });
    Promise.reject(err);
  }
);
export default request;
