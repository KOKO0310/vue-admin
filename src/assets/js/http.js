import axios from 'axios';
import { getToken } from './auth';

// 给axios设置一个基本url地址
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/',
});

// 使用请求拦截器，判断如果请求的路径不是login就要统一添加请求头，设置token
http.interceptors.request.use((config) => {
  if (config.url !== '/login') {
    config.headers.Authorization = getToken();
  }
  return config;
}, error => Promise.reject(error));

// 将上面的http设置添加给vue的实例，做成vue的插件

const httpPlugin = {};
// 2. 为插件对象添加一个成员：install
//    install 是一个函数
//    该函数接收两个参数：Vue、options
//
//   Vue.use(httpPlugin) 会来调用 install 方法

httpPlugin.install = function abc(Vue) {
  Vue.prototype.$http = http;
};

export default httpPlugin;
