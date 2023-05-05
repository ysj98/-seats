// pages/zwyd/zwyd.js
const db = wx.cloud.database()
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
var times = require('../../utils/times.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dateTime: '',
    list_id: '',
    rmbs: '',
    userinfo: '',
    openid: '',
    list: '',
    sjxx: '',
    endday: '',
    startDate: '',
    startTime: '',
    stopTime: '',
    wxtz: '预约成功，请准时签到',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var userinfo = wx.getStorageSync('userinfo')
    this.setData({
      list_id: options.list_id,
      userinfo: userinfo,
      openid: userinfo[0].openid
    })
    wx.cloud.callFunction({
      name: 'getzwlist',
      data: {
        listid: options.list_id
      },
      complete: res => {
        console.log(res.result.list)
        this.setData({
          rmbs: res.result.list
        })
      }
    })
    var date = new Date();
    var year = date.getFullYear() //年
    var month = date.getMonth() + 1 //月
    var day = date.getDate() //日
    var hours = date.getHours()
    var minte = date.getMinutes()
    var second = date.getSeconds()
    var endday = date.getDate() + 7
    console.log(year + '-' + month + '-' + day + ' ' + hours + ':' + minte + ':' + second)
    this.setData({
      startDate: year + '-' + month + '-' + day + ' ' + hours + ':' + minte + ':' + second,
      endday: year + '-' + month + '-' + endday + ' ' + hours + ':' + minte + ':' + second
    })
  },
  qrxz1() {
    // 订阅消息
    wx.requestSubscribeMessage({
      tmplIds: ['iTwwZn0HGdJH-wOIC3hm1Ob1_IOLEwZYfm-uHMSMe1U'],
    })
    this.sendApplyNotice();
    const app = getApp()
    var id = app.globalData.openid
    // 获取当前用户的选座信息
    wx.cloud.callFunction({
      name: 'getxz',
      data: {
        openid: id
      },
      complete: res => {
        if (this.data.startTime != '' && this.data.stopTime != '') {
          // 没有选座信息或者已经签退了才能继续预约
          if (res.result.list[0] === undefined || (res.result.list[0].qt == 1 && this.data.startTime != '' && this.data.stopTime != '')) {
            db.collection("xzxx").add({
              data: {
                openid: this.data.openid,
                zxzw: this.data.list_id,
                startTime: this.data.startTime,
                stopTime: this.data.stopTime,
                qdzt: 0,
                qt: 0,
                _createTime: Date.parse(new Date())
              }
            }).then(res => {
              wx.showToast({
                title: '选座成功',
                icon: 'success',
                duration: 2000,
                success: () => {
                  db.collection("tsgzw").doc(this.data.list_id).update({
                    data: {
                      dateTime: this.data.stopTime,
                      zwzt: 2
                    },
                  }).then(res => {
                    setTimeout(function () {
                      wx.reLaunch({
                        url: '../index/index',
                      })
                    }, 3000)
                  })
                }
              })
            })
            // 没有签退,已经有一个预约座位了
          } else if (res.result.list[0].qt == 0) {
            wx.showToast({
              title: '请勿多选',
              icon: 'error'
            })
          }
        } else {
          wx.showToast({
            title: '请选择日期',
            icon: 'error'
          })
        }
      }
    })
  },
  sendApplyNotice() {
    wx.cloud.callFunction({
      name: 'sendtz',
      data: {
        place: this.data.rmbs[0].bh, // 图书馆座位编号
        startTime: this.data.startTime,
        stopTime: this.data.stopTime,
        wxts: this.data.wxtz,
        zt: '已预约',
        templateId: 'iTwwZn0HGdJH-wOIC3hm1Ob1_IOLEwZYfm-uHMSMe1U',
        openid: this.data.openid
      }
    }).then(res => {
      console.log(res);
    })
  },
  bindDateChangestart: function (e) {
    console.log('开始时间：', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },
  bindDateChangestop: function (e) {
    console.log('结束时间', e.detail.value)
    this.setData({
      stopTime: e.detail.value
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
  onHide: function () {},

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