<template>
  <div class="user-card-main">
    <div class="user-card-header">
      <div>
        <img v-bind:src="userInfo.avataUrl" alt="" class="user-card-img">
        <div class="user-card-nick-name">{{userInfo.nickName}}</div>
      </div>
    </div>
    <!--学校信息-->
    <div class="user-card-content">
      <div class="user-card-item">
        <div class="user-card-item-icon"><span class="aliiconfont card-item-icon">&#xe955;</span></div>
        <div class="user-card-item-content">{{userInfo.school.university}}</div>
      </div>
      <div class="user-card-item">
        <div class="user-card-item-icon"><span class="aliiconfont card-item-icon">&#xe6ad;</span></div>
        <div class="user-card-item-content">{{userInfo.school.graduationTime?userInfo.school.graduationTime:'暂无'}}@{{userInfo.school.college?userInfo.school.college:'暂无'}} {{userInfo.school.major?userInfo.school.major:'暂无'}}专业</div>
      </div>
    </div>
    <!--联系方式-->
    <div class="user-card-contact">
      <div class="user-card-item" @click="saveToPhoneBook()">
        <div class="user-card-item-icon"><span class="aliiconfont card-item-icon">&#xe744;</span></div>
        <div class="user-card-item-content">{{userInfo.phone?userInfo.phone:'暂无'}} <span class="user-card-more-action" v-if="userInfo.phone">保存到通讯录</span></div>
      </div>
      <div class="user-card-item" >
        <div class="user-card-item-icon"><span class="aliiconfont card-item-icon">&#xe616;</span></div>
        <div class="user-card-item-content">{{userInfo.wechat?userInfo.wechat:'暂无'}} <span class="user-card-more-action" v-if="userInfo.wechat"  @click="clickToCopy()">点击复制</span></div>
      </div>
    </div>
    <!--工作信息-->
    <div class="user-card-job">
      <div class="user-card-item">
        <div class="user-card-item-icon"><span class="aliiconfont card-item-icon">&#xe60d;</span></div>
        <div class="user-card-item-content">{{userInfo.company?userInfo.company:'暂无'}}</div>
      </div>
      <div class="user-card-item">
        <div class="user-card-item-icon"><span class="aliiconfont card-item-icon">&#xe62c;</span></div>
        <div class="user-card-item-content">{{userInfo.job?userInfo.job:'暂无'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'
  import {getSelectUserInfo} from '../../http/api'
  export default {
    name: 'index',
    computed: {
      selectUserId () {
        return globalStore.state.selectUserId
      }
    },
    onShow: function () {
      wx.setNavigationBarTitle({
        title: '校友名片'
      })
      this.getUserInfo()
    },
    data () {
      return {
        userInfo: {
          'openId': '',
          'nickName': '',
          'gender': 1,
          'location': '',
          'avataUrl': '',
          'phone': '',
          'company': '',
          'job': '',
          'wechat': '',
          'school': {
            'university': '',
            'graduationTime': '',
            'college': '',
            'major': ''
          }
        }
      }
    },
    methods: {
      getUserInfo () {
        let _this = this
        let req = {
          userOpenId: _this.selectUserId
        }
        getSelectUserInfo(req).then(res => {
          _this.userInfo = res.data
        })
      },
      saveToPhoneBook () {
        let _this = this
        wx.addPhoneContact({
          firstName: _this.userInfo.nickName,
          mobilePhoneNumber: _this.userInfo.phone,
          remark: '同城校友,来源：校友足迹',
          weChatNumber: _this.userInfo.wechat,
          organization: _this.userInfo.company,
          title: _this.userInfo.job,
          success: function () {
            console.log('添加成功')
          }
        })
      },
      clickToCopy () {
        let _this = this
        wx.setClipboardData({
          data: _this.userInfo.wechat,
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .user-card-main{
    position: fixed;
    background-color: #f4f5f5;
    height: 100%;
    width: 100%;
  }
  .user-card-header{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx 0;
  }
  .user-card-img{
    width: 200rpx;
    height: 200rpx;
    border-radius: 200rpx;
  }
  .user-card-nick-name{
    text-align: center;
  }
  .user-card-content{
    margin: -150rpx 30rpx 20rpx 30rpx;
    background-color: #ffffff;
    -moz-box-shadow:0 0 20rpx rgba(2,127,255,0.3);
    -webkit-box-shadow:0 0 20rpx rgba(2,127,255,0.3);
    box-shadow:0 0 20rpx rgba(2,127,255,0.3);
    height: 160rpx;
    padding: 160rpx 20rpx 20rpx 20rpx;
    border-radius: 8rpx;
  }
  .user-card-item{
    display: flex;
    justify-content: flex-start;
    margin-top: 20rpx;
  }
  .user-card-item-icon{
    color: themeColor;
  }
  .card-item-icon{
    font-size: 38rpx;
  }
  .user-card-item-content{
    padding-left: 20rpx;
    flex: 1;
    font-size: 30rpx;
    color: #999999;
  }
  .user-card-contact{
    margin: 30rpx 30rpx;
    background-color: rgba(255,255,255,0.8);
    -moz-box-shadow:0 4rpx 18rpx rgba(2,127,255,0.3);
    -webkit-box-shadow:0 4rpx 18rpx rgba(2,127,255,0.3);
    box-shadow:0 4rpx 18rpx rgba(2,127,255,0.3);
    height: 160rpx;
    padding: 20rpx;
    border-radius: 8rpx;
  }
  .user-card-job{
    margin: 30rpx 30rpx;
    background-color: rgba(255,255,255,0.8);
    -moz-box-shadow:0 4rpx 18rpx rgba(2,127,255,0.3);
    -webkit-box-shadow:0 4rpx 18rpx rgba(2,127,255,0.3);
    box-shadow:0 4rpx 18rpx rgba(2,127,255,0.3);
    height: 160rpx;
    padding: 20rpx;
    border-radius: 8rpx;
  }
  .user-card-more-action{
    font-size: 26rpx;
    color: #d6d6d6;
    margin-left: 20rpx;
  }
</style>
