/**
 *自定义业务函数模块
 *auth.js
 *封装和用户授权相关函数
*/
const userInfoKey = 'user-info';

// export default 导出的成员的加载方式
// import xxx from '模块表示'
export function saveUserInfo(userInfo = {}) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
}

export function getUserInfo() {
  return window.localStorage.getItem(userInfoKey);
}

export function getToken() {
  return JSON.parse(getUserInfo()).token;
}

export function removeUserInfo() {
  window.localStorage.removeItem(userInfoKey);
}
