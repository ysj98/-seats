// pages/grzx/grzx.js
const app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userphoto: '../../images/photoMan.png',
    userInfo:'',
    openid:''
    },
  info:function(e){
    wx.navigateTo({
      url: '../info/info',
    })
  },
  gywm:function(e){
    wx.navigateTo({
      url: '../gywm/gywm',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  zhuce:function(e){
    wx.navigateTo({
      url: '../zhuce/zhuce',
    })
  },
  goadmin:function (e) {
    wx.navigateTo({
      url: '../admin/index',
    })
  },
  onLoad(options) {
    let user=wx.getStorageSync('openid')
    var userinfo =wx.getStorageSync('userinfo')
    this.setData({
      openid:user,
      userInfo:userinfo
    })
    getApp().globalData.openid = user
    if(this.data.userInfo==''){
      db.collection("user").where({ openid: user }).get().then(res => {
        console.log(res.data)
        this.setData({
          userInfo: res.data
        })
        wx.setStorageSync('userinfo', res.data)
      })
    }
  },
  wdyy:function (e) {
    wx.navigateTo({
      url: '../wdyy/wdyy',
    })
  },
  yjfk:function (e) {
    wx.navigateTo({
      url: '../yjfk/yjfk',
    })
  },
  robot:function(e){
      wx.navigateTo({
        url: '../robot/index',
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onRefresh:function(){
    //导航条加载动画
    wx.showNavigationBarLoading()
    //loading 提示框
    wx.showLoading({
      title: 'Loading...',
    })

    setTimeout(function () {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 2000)
  },

})