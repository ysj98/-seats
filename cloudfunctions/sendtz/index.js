const cloud = require('wx-server-sdk')

cloud.init({
  env: 'dev-4gaqqsz72106d5ae'
})
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, //要发送用户的openid
      page: 'pages/index/index', //用户通过消息通知点击进入小程序的页面
      lang: 'zh_CN', //进入小程序查看”的语言类型，支持zh_CN(简体中文)、en_US(英文)、zh_HK(繁体中文)、zh_TW(繁体中文)，默认为zh_CN
      data: { //发送的数据模板
        // 预约地点          
        thing2: {
          value: event.place // 图书馆座位编号
        },
        time22: {
          value: event.startTime // 开始时间
        },
        time23: {
          value: event.stopTime // 结束时间
        },
        thing8: {
          value: event.wxts // 温馨提示
        },
        phrase45: {
          value: event.zt // 状态
        },
      },
      templateId: event.templateId, //订阅消息模板ID
    })
    return result.errCode
  } catch (err) {
    return err
  }
}