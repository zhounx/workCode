import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import { useStore } from "../store/user";
import baseURL from "./env";
import router from "../router";
const mode = import.meta.env.MODE;
// 创建axios的实例
const service = axios.create({
  baseURL: baseURL[mode],
  timeout:60000, // 超时时间
});

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const user = useStore();
    config.headers["Authorization"] = "Bearer " + user.token;
    return config;
  },
  (err: any) => {
    Promise.reject(err);
  }
);
let apiWhite = ["/abroad-merchant/front/user/login"];

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    let { data } = response;
    
    data.status = response.status;
    let config: any = response.config;
    const headers = response.headers;

    if (headers["content-type"].includes("application/octet-stream")) {
      return data;
    }
    if (data.code === 200) {
      return data;
    } else if ([700, 777, 401].includes(data.code)) {
      const user = useStore();
      user.$patch((state) => {
        {
          (state.userInfo = {}), (state.token = "");
        }
      });
      router.replace("/login");
    } else {
      if (apiWhite.includes(config.url)) {
        return data;
      } else {
        if (
          config.url.indexOf("/abroad-merchant/front/baseweb/thirdpart") === -1
        ) {
          ElMessage({
            message: data.message,
            type: "error",
            duration: 5 * 1000,
          });
        }
      }
    }
  },
  (err: any) => {
    if (err) {
      ElMessage({
        message:err.message,
        type: "error",
        duration: 5 * 1000,
      });
    }
    return Promise.reject(err);
  }
);
export default service;
