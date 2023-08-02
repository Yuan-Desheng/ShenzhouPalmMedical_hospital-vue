import axios from "axios";
// import { toast } from "~/composables/util";
// import { getToken } from "~/composables/auth";
// import store from "./store";

//导入ElementUI的消息通知组件，下面封装全局Ajax的时候处理异常的时候需要弹出通知
import {
    ElMessage
} from 'element-plus'
import router from "../router";

//后端项目的URL根路径
let baseUrl = "http://localhost:8092/hospital-api"

const service = axios.create({
    // baseURL: "/api",
    baseURL: baseUrl,
    timeout: 1000,
});

// 添加请求拦截器
service.interceptors.request.use(
    function (config) {
        // 在header头中自动添加token
        // 存储token和用户相关信息
        // const token = getToken("admin-token");
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["token"] = token;
        }

        // 在发送请求之前做些什么
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        // return response.data.data;
        if (response.data.code == 200) {

            // fun(resp)
            return response.data
        } else {
            ElMessage.error({
                message: response.data.msg,
                duration: 1200
            });
        }

    },
    function (error) {
        // const msg = error.response.data.msg || "请求失败";
        //
        // if (msg == "非法token，请先登录！") {
        //     store.dispatch("logout").finally(() => location.reload());
        // }
        //
        // toast(msg, "error");
        //
        // return Promise.reject(error);

        if (error.status == undefined) {
            ElMessage.error({
                message: "前端页面错误",
                duration: 1200
            });
        } else {
            let status = error.status
            if (status == 401) {
                router.push({
                    name: 'Login'
                })
            } else {
                ElMessage.error({
                    message: error.responseText,
                    duration: 1200
                });
            }
        }

    }
);

export default service;
