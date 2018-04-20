export default {
  created() {
    this.loadRoles();
  },
  data() {
    return {
      roleList: [],
      addRoleForm: {
        roleName: '',
        roleDesc: '',
      },
      editRoleForm: {
        roleName: '',
        roleDesc: '',
      },
      treeData: [],
      treeProps: {
        children: 'children',
        label: 'authName',
      },
      currentRole: null,
      treeCheckedKeys: [],
      dialogAddFormVisible: false, // 添加角色弹框
      dialogEditFormVisible: false, // 编辑角色弹框
      editRightsListVisible: false, // 树形权限列表弹框
    };
  },
  methods: {
    async loadRoles() {
      const res = await this.$http.get('roles');
      this.roleList = res.data.data;
    },
    /**
     * 添加角色
     */
    async handleAddRole() {
      const res = await this.$http.post('roles', this.addRoleForm);
      // console.log(res);
      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加成功',
        });
        this.dialogAddFormVisible = false;
        this.loadRoles();
      }
    },
    /**
     * 修改角色
     */
    async handleEditRole(user) {
      this.dialogEditFormVisible = true;
      const id = user.id;
      const res = await this.$http.get(`roles/${id}`);
      if (res.data.meta.status === 200) {
        this.editRoleForm = res.data.data;
      }
    },
    async handleEditRoleok(id) {
      const res = await this.$http.put(`roles/${id}`, { roleName: this.editRoleForm.roleName }, this.editRoleForm);
      if (res.data.meta.status === 200) {
        this.dialogEditFormVisible = false;
        this.$message({
          type: 'success',
          message: '修改成功',
        });
        this.loadRoles();
      }
    },
    /**
     * 删除角色
     */
    async handleDeleteRole(user) {
      const id = user.id;
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await this.$http.delete(`roles/${id}`);
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功',
          });
          this.loadRoles();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    /**
     * 授权
     */
    async handleEditRights(role) {
      this.currentRole = role;
      // console.log(user);
      const res = await this.$http.get('rights/tree');
      if (res.data.meta.status === 200) {
        this.treeData = res.data.data;
        const rightList = role.children;
        this.treeCheckedKeys = this.getLevel3Ids(rightList);
        this.editRightsListVisible = true;
      }
    },
    async handleEditRightsok() {
      const id = this.currentRole.id;
      const res = await this.$http.post(`roles/${id}/rights`, {
        rids: this.$refs.rightsTree.getCheckedKeys().concat(this.$refs.rightsTree.getHalfCheckedKeys()).toString(),
      });
      if (res.data.meta.status === 200) {
        this.editRightsListVisible = false;
        this.$message({
          type: 'success',
          message: '更改权限成功',
        });
        this.loadRoles();
      }
    },
    /**
     * 获取三级菜单的id，因为二级的选中状态是由三级决定的，一级由二级决定的
     */
    getLevel3Ids(rightList) {
      const arr = [];
      function f(rightList) {
        rightList.forEach((element) => {
          if (!element.children) {
            arr.push(element.id);
          } else {
            f(element.children);
          }
        });
      }
      f(rightList);
      return arr;
    },
    /**
     * 删除指定权限
     */
    async handleRemoveRight(role, right) {
      // console.log(role, right);
      const roleId = role.id;
      const rightId = right.id;
      const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`);
      const { data } = res.data;
      if (res.data.meta.status === 200) {
        // res.data.data 就是删除某项权限后的最新的权限数据，重新赋值给role.children，会自动更新权限显示
        // 角色的children 就是角色的权限列表数据，参见第104行和template.html中的leve1,2,3,循环输出的的时候leve1 in scope.children
        role.children = data;
        this.$message({
          type: 'success',
          message: '删除权限成功',
        });
      }
    },
  },
};
