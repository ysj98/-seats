// pages/addzw/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      index:0,
      tsgwzlc:[],
      zwzt:['不可预约','可预约','已预约'],
      lc:0,
      zwbh:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    db.collection("tsgwz").get().then(res=>{
      console.log(res.data)
      var lc = []
      for (var i = 0; i < res.data.length; i++) {
        var lssz = {};
        lssz.name = res.data[i].tsglc;
        lc.push(lssz);
      } 
      console.log(lc)
      this.setData({
        tsgwzlc: lc
      })
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      lc: e.detail.value
    })
  },
  check(e){
    wx.showToast({
      title: '功能开发中',
      duration:2000,
    })
  },
  formip(e) {
    console.log(e.detail.value)
    this.setData({
      zwbh: e.detail.value
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

  }
})