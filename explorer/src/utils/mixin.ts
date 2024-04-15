export default {
  data() {
    return {
      sexList: [
        { name: "不想说", value: 0 },
        { name: "男", value: 1 },
        { name: "女", value: 2 },
      ],
    };
  },
  methods: {
    // 操作成功消息提醒内容
    submitOk(msg: any, cb: any) {
      console.log("submitOk", msg);
      // this.$notify({
      //   title: '成功',
      //   message: msg || '操作成功！',
      //   type: 'success',
      //   duration: 2000,
      //   onClose: function () {
      //     cb && cb();
      //   },
      // });
    },
    // 操作失败消息提醒内容
    submitFail(msg: string) {
      console.log("submitError", msg);
      // this.$message({
      //   message: msg || '网络异常，请稍后重试！',
      //   type: 'error',
      // });
    },
  },
};
