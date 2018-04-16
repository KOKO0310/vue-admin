<template>
  <div class="user-list-wrap">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb class="user-list-breadcrumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="user-list-search">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  async created() {
    this.getUserlist(1);
  },
  data() {
    return {
      tableData: [],
      searchText: '',
      total: 1,
      currentPage: 1,
      pageSize: 2,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      //切换pagesize的时候，重新渲染数据，从第1页显示
      this.getUserlist(1,val);
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.getUserlist(val);
    },
    async getUserlist(page) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: this.pageSize,
        },
      });
      const { users, total } = res.data.data;
      this.tableData = users;
      this.total = total;
    },
  },
};
</script>

<style>
  .user-list-breadcrumb {
    line-height: 2;
  }
  .user-list-search {
    margin-bottom: 10px;
  }
</style>
