// pages/qxyy/qxyy.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [{
        name: '有课',
        value: '有课',
        checked: true
      },
      {
        name: '生病',
        value: '生病'
      },
      {
        name: '其他',
        value: '其他'
      }
    ],
    xzyy:'',
    list_id:'',
    userInfo:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app=getApp()
    var openid=app.globalData.openid
    this.setData({
      openid:openid
    })
    console.log(options.id)
    this.setData({
      list_id:options.id
    })
    db.collection("user").where({openid:this.data.openid}).get().then(res=>{
      console.log(res.data)
      this.setData({
        userInfo:res.data
      })
    })
  },
  radioChange(e){
    console.log(e.detail.value)
    this.setData({
      xzyy:e.detail.value
    })
  },
  submitForm(){
    db.collection('qxdd').add({
      data:{
        yyxx:this.data.list_id,
        qxyy:this.data.xzyy,
        lxfs:this.data.userInfo[0].phone,
        name:this.data.userInfo[0].username,
        openid:this.data.openid,
        _createTime: Date.parse(new Date()),
      },
      success: (res)=> {
        db.collection('xzxx').doc(this.data.list_id).update({
          data:{
            qx:1,
            _updateTime: Date.parse(new Date()),
          },
          success:(res=>{
            db.collection('xzxx').doc(this.data.list_id).get().then(res=>{
              console.log(res.data.zxsj)
              var zwid=res.data.zxzw
              db.collection('tsgzw').doc(zwid).update({
                data:{ 
                  zwzt:0, 
                  _updateTime: Date.parse(new Date()),
                },
                success:(res=>{
                  db.collection('xzxx').doc(this.data.list_id).update({
                    data:{
                      qt:1,
                      _updateTime: Date.parse(new Date()),
                    }
                  })
                  wx.showToast({
                    title: '取消成功',
                    icon:'success',
                    duration:2000,
                    success:(res)=>{
                      setTimeout(function(){
                        wx.navigateTo({
                          url: '../wdyy/wdyy',
                        })
                      },2000)
                    }
                  })
                })
              })
            })
          })
        })
      }
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