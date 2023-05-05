# 图书馆座位预约小程序

#### 介绍
图书馆座位预约小程序，采用腾讯云开发，功能有座位预约，签到打卡，扫码签到，监督举报，失物招领，图书检索，新闻公告等功能

#### 流程:
1. 座位预约:在座位预约页面进行座位预约,只能够预约状态为可预约的座位,预约的开始时间为今天,结束时间为今天起的七天内.一次只能预约一个座位.
   可根据位置和状态筛选座位

2. 打卡签到:预约成功后会在打卡签到页面展示近期预约.点击签到打卡,扫描座位上唯一的二维码(每个座位的二维码是复制对应座位的文档ID,用草料二维码生成的),即可签到成功,半个小时内再次扫码签到会提示重复签到.半个小时后可以再次签到.意味着第一次扫码签到,第二次扫码签退.只有按照完成签退后该座位状态才会由下次可预约变成可预约.

   预约的座位如果没有签到,会展示暂未签到

3. 我的预约:人口为:个人中心->我的预约.该页面会展示自己的预约信息.包含是否签到.需要取消预约则点击取消按钮,取消原因暂有三种,1.有课2.生病3.其他.取消预约后,座位的预约状态由下次可预约变成可预约.


#### 效果预览
![输入图片说明](https://github.com/ysj98/seats/blob/master/scan/Snipaste_2023-04-29_04-47-15.png)
![输入图片说明](https://github.com/ysj98/seats/blob/master/scan/Snipaste_2023-04-29_04-47-15.png)


#### 打卡签到
![输入图片说明](https://github.com/ysj98/seats/blob/master/scan/1-001-图书馆一楼.png)
![输入图片说明](https://github.com/ysj98/seats/blob/master/scan/1-002-图书馆一楼.png)
![输入图片说明](https://github.com/ysj98/seats/blob/master/scan/1-003-图书馆一楼.png)
![输入图片说明](https://github.com/ysj98/seats/blob/master/scan/2-001-图书馆二楼.png)
![输入图片说明](https://github.com/ysj98/seats/blob/master/scan/2-002-图书馆二楼.png)
![输入图片说明](https://github.com/ysj98/seats/blob/master/scan/3-001-图书馆三楼.png)
![输入图片说明](https://github.com/ysj98/seats/blob/master/scan/3-002-图书馆三楼.png)



