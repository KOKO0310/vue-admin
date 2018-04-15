<template>
<el-container class="container">
  <el-header class="header">
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="./logo.png" alt="">
        </div>
      </el-col>
      <el-col :offset="16" :span="4">
        <div class="grid-content bg-purple">
          <a href="#" @click.prevent="logout">退出</a>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <el-container class="container">
    <el-aside class="aside" width="200px">
      <el-menu default-active="1-4-1"
      class="el-menu-vertical-demo aside-menu"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
      :unique-opened="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-star-off"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/users">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">角色列表</el-menu-item>
            <el-menu-item index="2-2">权限列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">商品列表</el-menu-item>
            <el-menu-item index="3-2">商品分类</el-menu-item>
            <el-menu-item index="3-3">商品参数</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">订单列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span slot="title">数据统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">数据列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$confirm('are you sure?', '退出提示', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning',
      }).then(() => {
        window.localStorage.removeItem('admin-token');
        this.$router.push({
          name: 'login',
        });
        this.$message({
          type: 'success',
          message: '退出成功!',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出',
        });
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style>
	.container {
		height: 100%;
	}
	.header {
		background-color: #B3C0D1;
    line-height: 60px;
	}

	.aside {
		background-color: #D3DCE6;
	}
	.main {
		background-color: #E9EEF3;
		height: 100%;
	}
  .aside-menu {
    height: 100%;
  }
</style>
