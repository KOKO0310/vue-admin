<template>
	<div class="login-wrap">
		<el-form class="login-form" label-position="top" :model="userForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="login">立即登录</el-button>
      </el-form-item>
    </el-form>
	</div>
</template>

<script>
import { saveUserInfo } from '@/assets/js/auth';

export default {
  data() {
    return {
      labelPosition: '',
      userForm: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post('/login', this.userForm);
      const data = res.data;
      if (data.meta.status === 200) {
        saveUserInfo(data.data);
        this.$router.push({
          name: 'home',
        });
        this.$message({
          type: 'success',
          message: '登陆成功',
        });
      }
    },
  },
};
</script>

<style>
.login-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324152;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}

.login-wrap .login-form .login-btn {
  width: 100%
}

</style>
