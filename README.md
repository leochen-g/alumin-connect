# 《校友足迹》小程序扫码体验
![](https://user-gold-cdn.xitu.io/2018/8/7/165134f207caa589?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# 灵感
小程序开发进行的热火朝天，自己申请小程序账号也有一段时间了，但是一直没有有所作为，苦于没有一个好点子，不知道该做些什么，基本想到的都有人做了；怎么办？！

一次校友聚会后给了我新的想法，因为大家谈到了一个问题，就是怎么把一个城市的校友聚合在一起，回来后我就想到了小程序，现在基本每个人都会有微信，那么就用大家最常用的方式来找到校友，微信小程序即用即走，不用下载，而且受众面很广，很适合来聚合校友；既然想法有了，就开始实际行动吧

关于本小程序的其他详细信息，我已经发布到掘金专栏：
[mpvue小程序《校友足迹》成长记（一）](https://juejin.im/post/5b693f046fb9a04fd8359481)

也可查看 [小程序详情](alumni-detail.md)

# 小程序使用说明

    # git clone git@github.com:gengchen528/alumin-connect.git
    # cd quick-app
    # npm install
    # npm run start
    打开微信开发者工具，选择quick-app目录

# 后端服务
    需要配合mysql数据库
    # cd server
    # npm install
    npm run start
    
# 更新日记
* 2018-12-04 增加校友圈子评论回复界面
* 2018-12-03 构建校友圈子页面，拆分组件