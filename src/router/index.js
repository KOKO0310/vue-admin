import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/login'; // @ 是 src 路径的别名，webpack 配置的
import Home from '@/components/home/home';
import UserList from '@/components/user-list/user-list';
import { getUserInfo } from '@/assets/js/auth';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login,
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList,
        },
      ],
    },
  ],
});

// 1. 添加路由拦截器（导航钩子、守卫）
//    接下来所有的视图导航都必须经过这道关卡
//    一旦进入这道关卡，你得告诉路由守卫，
//    to 我要去哪里
//    from 我从哪儿来的
//    next 用来放行的

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next();
  } else {
    const token = getUserInfo();
    if (!token) {
      next({
        name: 'login',
      });
    } else {
      next();
    }
  }
});

export default router;
