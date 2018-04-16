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
      dialogFormVisible: false,
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      // 切换pagesize的时候，重新渲染数据，从第1页显示
      this.getUserlist(1, val);
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.getUserlist(val);
    },
    handleSearch() {
      this.getUserlist(1);
    },
    async handleAddUser() {
      // 添加用户
      const res = await this.$http.post('users', {
        username: this.userForm.username,
        password: this.userForm.password,
        email: this.userForm.email,
        mobile: this.userForm.mobile,
      });
      // console.log(res);
      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加成功',
        });
        this.dialogFormVisible = false;
        this.getUserlist(this.currentPage);
        for (const key in this.userForm) {
          this.userForm[key] = '';
        }
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(row) {
      const id = row.id;
      console.log(id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await this.$http.delete(`users/${id}`);
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.getUserlist(this.currentPage);
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    async handleStateChange(state, user) {
      // 改变状态
      const { id: userId } = user;
      const res = await this.$http.put(`users/${userId}/state/${state}`);
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `用户状态${state ? '启用' : '禁用'}`,
        });
      }
    },
    async getUserlist(page) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: this.pageSize,
          query: this.searchText,
        },
      });
      const { users, total } = res.data.data;
      this.tableData = users;
      this.total = total;
    },
  },
};
