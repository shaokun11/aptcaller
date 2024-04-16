export default {
  data() {
    return {
      sexList: [
        
      ],
    };
  },
  methods: {
    submitOk(msg: any, cb: any) {
      console.log("submitOk", msg);
      // this.$notify({
      //   title: 'seccess',
      //   message: msg || 'seccess',
      //   type: 'success',
      //   duration: 2000,
      //   onClose: function () {
      //     cb && cb();
      //   },
      // });
    },
    submitFail(msg: string) {
      console.log("submitError", msg);
      // this.$message({
      //   message: msg || 'network errors',
      //   type: 'error',
      // });
    },
  },
};
