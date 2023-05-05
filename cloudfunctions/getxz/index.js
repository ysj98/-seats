// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'dev-4gaqqsz72106d5ae'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var text = event.openid
  return await db.collection('xzxx').aggregate().match({openid:text})
  .lookup({
    from:'tsgzw',
    localField:'zxzw',
    foreignField:'_id',
    as:'zwList'
  })
  .sort({
    // _updateTime: -1 // 倒序
     _createTime:-1 
  })
  .end()
}