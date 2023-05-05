// pages/zhuce/zhuce.js
const db=wx.cloud.database()
const app = getApp()

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    array:["大一","大二","大三","大四","专科"],
    array1:["信息工程学院","财经学院","传媒学院","教师教育学院","艺术学院"],
    index:0,
    openid:'',
    nickName:'',
    avatarUrl:defaultAvatarUrl,
    theme: wx.getSystemInfoSync().theme,
    xy_index:0,
    nj_index:0
  },
  formSubmit(e){
    console.log(e.detail.value)
    if(e.detail.value.username!='' &&e.detail.value.name!=''){
     if(e.detail.value.phone.length == 11 &&(/^1[3-9]\d{9}$/.test(e.detail.value.phone)) ){
    db.collection("user").add({
      data:{ 
        userphoto:this.data.avatarUrl,
        openid: this.data.openid, 
        name:e.detail.value.name,
        nj:this.data.array[this.data.nj_index],
        phone:e.detail.value.phone,
        username:e.detail.value.username,
        xy:this.data.array1[this.data.xy_index],
        isadmin:false,
        _createTime:Date.parse(new Date()),
      },
      success:function(res){
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration:2000,
          success:(res)=>{ 
            const app=getApp() 
            var id=app.globalData.openid
            db.collection("xzxx").add({
              data:{
                openid:id, 
                qdzt:1,
                qt:1,
               _createTime:Date.parse(new Date())
              }
            })
            setTimeout(function(){
              wx.reLaunch({
                url: '../grzx/grzx',
              })
            },2000)
          }
        })
      }
    })
  }else{
    wx.showToast({
      title: '请输入正确的手机号码',
      icon:"none"
    })
  }
  }else{
    wx.showToast({
      title: '请填写完整',
      icon: 'error',
      duration: 2000,
    })
  }
},
  bindchangexy:function(e){
    console.log(e.detail.value)
    this.setData({
      xy_index:e.detail.value
    })
  },
  bindchangenj:function(e){
    console.log(e.detail.value)
    this.setData({
      nj_index:e.detail.value
    })
  },
  bindPickerChangeplace:function(e){
    console.log(e.detail.value)
    this.setData({
      index:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const app=getApp()
    var openid=app.globalData.openid
    this.setData({
      openid:openid
    })
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme
      })
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
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