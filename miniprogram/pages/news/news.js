// pages/index/index.js
const db=wx.cloud.database()
var times=require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    rmb:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("xwtz").get({
      success:res=>{
        for(var i=0;i<res.data.length;i++){
          res.data[i]["_updateTime"]=times.toDate(res.data[i]["_updateTime"])
        }
        this.setData({
          rmb:res.data
        })
      }
    })
  },
  sjowbs:function(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../newsxq/newsxq?text_id='+e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})