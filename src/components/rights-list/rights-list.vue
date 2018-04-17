<template>
  <el-row>
    <el-col :span="24">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="list-wrap">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {

  },
};
</script>

<style>
.list-wrap {
  line-height: 3;
  background-color: #778;
}
</style>
