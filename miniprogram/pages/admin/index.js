
const db = wx.cloud.database()
// pages/admin/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'https://dev-4gaqqsz72106d5ae-1318034780.tcloudbaseapp.com/wx-cms/#/project/home'
  },
  addzw:function (e) {
  wx.navigateTo({
    url: '../addzw/index',
  })
},
addnews:function (e) {
  wx.showToast({
    title: '功能开发中',
    duration:2000
  })
},
addts:function (e) {
  wx.showToast({
    title: '功能开发中',
    duration:2000
  })
},
admin:function (e) {
  // wx.navigateTo({
  //   url: 'https://dev-4gaqqsz72106d5ae-1311420973.tcloudbaseapp.com/wx-cms/#/home',
  // })
  wx.redirectTo({
    url: 'https://dev-4gaqqsz72106d5ae-1311420973.tcloudbaseapp.com/wx-cms/#/home',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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

  }
})