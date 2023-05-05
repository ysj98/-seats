// pages/zwyy/zwyy.js
const db = wx.cloud.database()
Page({
  data: {
    index: 0,
    placearr: [],
    index1: 0,
    ztarr: ['全部', '已预约', '未预约', '不可预约'],
    rmb: '',
    tswz: '',
    yyzt: '',
    userid: [],
    xzxx:'',
    stopTime:''
  },
  bindPickerChangeplace: function (e) {
    console.log(e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChangezt: function (e) {
    console.log(e.detail.value)
    this.setData({
      index1: e.detail.value,
      yyzt: 5
    })
    if (e.detail.value == 0) {
      wx.cloud.callFunction({
        name: "getzw",
        complete: res => {
          console.log(res.result.data)
          this.setData({
            rmb: res.result.data
          })
        }
      })
    } else if (e.detail.value == 1) {
      //已预约
      this.setData({
        yyzt: 2
      })
    } else if (e.detail.value == 2) {
      //可预约
      this.setData({
        yyzt: 0
      })
    } else {
      this.setData({
        yyzt: 1
      })
    }
    if (this.data.yyzt != 5) {
      var zt = this.data.yyzt
      db.collection("tsgzw").where({
        zwzt: parseInt(zt)
      }).get().then(res => {
        console.log(res)
        this.setData({
          rmb: res.data
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name: "getzw",
      complete: res => {
        console.log(res.result.data)
        this.setData({
          rmb: res.result.data
        })
      }
    })
    db.collection("tsgwz").get().then(res => {
      console.log(res)
      this.setData({
        tswz: res.data
      })
      var arr = ['查看全部']
      for (var i = 0; i < res.data.length; i++) {
        arr.push(res.data[i].tsglc);
      }
      console.log(arr)
      this.setData({
        placearr: arr
      })
    })
  },
  show: function (e) {
    const app = getApp()
    var id = app.globalData.openid
    db.collection("user").get().then(res => {
      console.log(res)
      var arr = []
      for (var i = 0; i < res.data.length; i++) {
        arr.push(res.data[i].openid);
      }
      console.log(arr)
      if (arr.includes(id)) {
        // console.log("已登录")
        console.log(e.currentTarget.id)
        db.collection("tsgzw").doc(e.currentTarget.id).get().then(res => {
          console.log(res.data.zwzt)
          if (res.data.zwzt == 0) {
            wx.navigateTo({
              url: '../zywd/zwyd?list_id=' + e.currentTarget.id,
            })
          } else if (res.data.zwzt == 2) {
            wx.showToast({
              title: '该座位已预约',
              icon: 'error',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '该座位不可预约',
              icon: 'error',
              duration: 2000
            })
          }
        })
      } else {
        wx.showToast({
          title: '请先登录',
          icon: 'error',
          duration: 2000,
          success: (res) => {
            setTimeout(function () {
              wx.navigateTo({
                url: '../zhuce/zhuce',
              })
            }, 2000);
          }
        })
      }
    })
  },
  getlist: function () {
    wx.cloud.callFunction({
      name: "getzw",
      complete: res => {
        console.log(res.result.data)
        this.setData({
          rmb: res.result.data
        })
      }
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
    this.getlist()
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
    this.getlist()
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