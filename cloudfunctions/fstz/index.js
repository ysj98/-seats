// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'dev-4gaqqsz72106d5ae'
})
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event, 'eventeventeventeventevent')
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, //要推送给那个用户
      page: 'pages/dkqd/dkqd', //要跳转到那个小程序页面
      data: { //推送的内容
        // 签到方式
        phrase12: {
          value: event.type
        },
        // 签到时间
        time3: {
          value: event.time
        },
        // 签到地点
        thing4: {
          value: event.bh
        },
        // 签到状态
        phrase21: {
          value: event.wz
        },
        // 签到人
        name6: {
          value: event.name
        },
      },
      templateId: 'i0zm2ILQEVj83sX39AoBeWjjWIjGA1KKXQAROSjoHYU' //模板id
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}