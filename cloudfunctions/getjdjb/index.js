// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'dev-4gaqqsz72106d5ae'
})
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var listid=event.listid
    return await db.collection('jdjb').aggregate().match({
      openid:listid
    })
    .lookup({
      from:'tsgzw',
      localField:'jbzw',
      foreignField:'_id',
      as:'zwlist'
    })
    .end()
}