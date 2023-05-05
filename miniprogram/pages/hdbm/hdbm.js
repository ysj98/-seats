// pages/hdbm/hdbm.js
const db=wx.cloud.database()
var times=require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    rmb:'',
    rmb1:'',
    userInfo:'',
    number:''
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
    db.collection("user").where({openid:this.data.openid}).get().then(res=>{
      console.log(res.data)
      this.setData({
        userInfo:res.data
      })
    }),
    db.collection("hdbm").get().then(res=>{
      console.log(res.data)
      this.setData({
        rmb:res.data
      })
    })
    db.collection("hdyy").where({openid:this.data.openid}).get().then(res=>{
      console.log(res.data)
      var lins=this.data.rmb
      for(let i=0;i<res.data.length;i++){
        for(let k=0;k<lins.length;k++){
          if(res.data[i].hd==lins[k]._id){
            console.log(res.data[i].hd+"对比"+lins[k]._id)
            lins[k]._yyzt=1
          }
        }
      }
      this.setData({
        rmb1:res.data,
        rmb:lins
      })
    })
  },
  hdyy(e){
    console.log(e.currentTarget.id)
    db.collection("hdyy").get({
      success:res=>{
        console.log(res.data.length)
        if(res.data.length<=30){
          db.collection("hdyy").add({
            data:{
              openid:this.data.openid,
              hd:e.currentTarget.id,
              lxfs:this.data.userInfo[0].phone,
              name:this.data.userInfo[0].username,
              _createTime: Date.parse(new Date()),
            },
            success:res=>{
              wx.showToast({
                title: '报名成功',
                icon: 'success',
                duration: 2000,
                success:res=>{
                  db.collection("hdyy").where({openid:this.data.openid}).get().then(res=>{
                    console.log(res.data)
                    var lins=this.data.rmb
                    for(let i=0;i<res.data.length;i++){
                      for(let k=0;k<lins.length;k++){
                        if(res.data[i].hd==lins[k]._id){
                          console.log(res.data[i].hd+"对比"+lins[k]._id)
                          lins[k]._yyzt=1
                        }
                      }
                    }
                    this.setData({
                      rmb1:res.data,
                      rmb:lins
                    })
                  })
                }
              })
            }
          })
        }else{
          wx.showToast({
            title: '报名人数已满',
            icon:'error'
          })
        }
      }
    })
  },
  qxyy(e){
    console.log(e.currentTarget.id)
    db.collection("hdyy").where({openid:this.data.openid,hd:e.currentTarget.id}).remove({
      success: res => {
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          duration: 2000,
          success:res=>{
            db.collection("hdyy").where({openid:this.data.openid}).get().then(res=>{
              console.log(res.data)
              var lins=this.data.rmb
              for(let i=0;i<res.data.length;i++){
                for(let k=0;k<lins.length;k++){
                  if(res.data[i].hd==lins[k]._id){
                    console.log(res.data[i].hd+"对比"+lins[k]._id)
                    lins[k]._yyzt=1
                  }
                }
              }
              this.setData({
                rmb1:res.data,
                rmb:lins
              })
            })
          }
        })
      },
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