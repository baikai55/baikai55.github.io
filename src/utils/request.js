import axios from "axios";
import { MessageBox } from "element-ui";
import router from "../router";
import nprogress from "nprogress";

let request = axios.create({
  // baseURL: window.global_url.baseURL,
  baseURL: "/",
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
    // nprogress.start();
    if (config) {
      // nprogress.done()
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
    // console.log("结束加载", res.data);
    // let code = res.data.code
    // if (code !== null) {
      // nprogress.done()
    // }
    // if (res.data.code == 401) {
    //   console.log(401, router);
    //   localStorage.clear()
    //   router.replace('/')
    //   MessageBox.alert(`登陆已过期,请重新登录！`, '通知', {
    //     confirmButtonText: '确定',
    //   });
    // }

    return res.data;
  },
  (err) => {
    // nprogress.done()
    MessageBox.alert(`${err.message}`, "通知", {
      confirmButtonText: "确定",
    });
    Promise.reject(err);
  }
);
export default request;
