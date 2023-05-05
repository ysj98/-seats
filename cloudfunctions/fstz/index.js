// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:'dev-4gaqqsz72106d5ae'
})
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, //要推送给那个用户
      page: 'pages/dkqd/dkqd', //要跳转到那个小程序页面
      data: {//推送的内容
        time5: {
          value: event.time
        },
        phrase6: {
          value: event.wz
        },
        date4: {
          value: event.sj
        },
        thing14: {
          value: event.bh
        },
        thing2: {
          value: event.xzsjd
        },
      },
      templateId: 'i0zm2ILQEVj83sX39AoBebrF8PO6YUMo3WGSOfJVKVY' //模板id
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}