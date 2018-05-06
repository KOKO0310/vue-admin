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
      <!-- @open="handleOpen"
      @close="handleClose" -->
      <el-menu default-active="1-4-1"
      class="el-menu-vertical-demo aside-menu"
      :router="true"
      :unique-opened="true">
        <el-submenu v-for="(level1Menu,index) in menuList"
        :key="index"
        :index="index.toString()">
          <template slot="title">
            <i class="el-icon-star-off"></i>
            <span slot="title">{{ level1Menu.authName }}</span>
          </template>
          <el-menu-item-group
          v-for="(level2Menu,index) in level1Menu.children"
          :key="index">
            <el-menu-item :index="level2Menu.path">{{ level2Menu.authName }}</el-menu-item>
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
import { removeUserInfo } from '@/assets/js/auth';

export default {
  created() {
    this.loadMenu();
  },
  data() {
    return {
      menuList: [],
    };
  },
  methods: {
    logout() {
      this.$confirm('确定退出吗?', '退出提示', {
        confirmButtonText: 'yes',
        cancelButtonText: 'no',
        type: 'warning',
      }).then(() => {
        removeUserInfo();
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
    async loadMenu() {
      const res = await this.$http.get('menus');
      const { data, meta } = res.data;
      if (meta.status === 200) {
        this.menuList = data;
      }
    },
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
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
