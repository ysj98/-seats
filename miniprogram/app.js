// app.js
var plugin = requirePlugin("chatbot");
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
         env: 'dev-4gaqqsz72106d5ae',
        traceUser: true,
      });
    }
    this.globalData = {};
    plugin.init({
      appid: "ahuahNYsfLsAWUYBmo2wd8v9RC7I52", //小程序示例账户，仅供学习和参考
      openid: wx.getStorageSync('openid'), //用户的openid，必填项，可通过wx.login()获取code，然后通过后台接口获取openid
      userHeader: "", // 用户头像
      userName: "", // 用户昵称
      anonymous: false, // 是否允许匿名用户评价，默认为false，设为true时，未传递userName、userHeader两个字段时将弹出登录框
      success: () => {}, //非必填
      fail: (error) => {}, //非必填
  });
  },
  
  onPullDownRefresh:function(){
    this.onRefresh();
  },
onRefresh:function(){
    //导航条加载动画
    wx.showNavigationBarLoading();
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 2000);
  }
});