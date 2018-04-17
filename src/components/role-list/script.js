export default {
  created() {
    this.loadRoles();
  },
  data() {
    return {
      roleList: [],
    };
  },
  methods: {
    async loadRoles() {
      const res = await this.$http.get('roles');
      this.roleList = res.data.data;
    },
    handleEdit(user) {
      console.log(user);
    },
  },
};
