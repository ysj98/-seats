const db=wx.cloud.database()
var times=require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mglist:'',
    msgList:''
  },
  onLoad(options) {
    wx.cloud.callFunction({
      name: 'open',
      success: (res) => {
        var usid = res.result.openid
        console.log(usid)
        this.setData({
          openid: res.result.openid,
        })
        getApp().globalData.openid = res.result.openid
        db.collection("user").where({ openid: res.result.openid }).get().then(res => {
          console.log(res.data,'11111')
          this.setData({ 
            userInfo: res.data
          })
          wx.setStorageSync('userinfo', res.data)
        })
        wx.setStorageSync('openid', res.result.openid)
      },
    })
    db.collection("banner").get({
      success:res=>{
        console.log(res, '======')
        this.setData({
          mglist:res.data
        })
      }
    })
    db.collection("tzgg").get({
      success:res=>{
        this.setData({
          msgList:res.data
        })
      }
    })
  },
  zwyy:function(e){
      wx.navigateTo({
        url: '../zwyy/zwyy',
      })
  },
  dkqd:function(e){
      wx.navigateTo({
        url: '../dkqd/dkqd',
      })
  },
  jdjb:function(e){
      wx.navigateTo({
        url: '../jdjb/jdjb',
      })
  },
  swzl:function(e){
      wx.navigateTo({
        url: '../swzl/swzl',
      })
  },
  hdbm:function(e){
      wx.navigateTo({
        url: '../hdbm/hdbm',
      })
  },
  tsjs:function(e){
      wx.navigateTo({
        url: '../tsjs/tsjs',
      })
  },
  news:function(e){
    wx.navigateTo({
      // url: '../news/news',
      url: '../news/news'
    })
  },
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