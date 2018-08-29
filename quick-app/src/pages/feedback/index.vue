<template>
  <div class="container" >
    <div class="feedBackMain">
      <form action="">
        <div class="contentWrap">
          <div class="content-main">
            <textarea class="textarea" name="content" v-bind="content"  placeholder="为了带给您更好的体验,期待您的任何反馈,我将会不断改进" />
          </div>
          <div class="content-phone">
            <input class="phone" name="phone" v-bind="phone"  placeholder="您的手机号或者邮箱，方便我及时给您回复" />
          </div>
          <div class="content-button">
            <button formType="submit" hover-class="hover" >提交</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'
  export default {
    computed: {
      nickName () {
        return globalStore.state.nickName
      }
    },
    data () {
      return {
        tap: false,
        userInfo: {},
        city: '',
        location: ''
      }
    },
    onShow: function () {
      wx.setNavigationBarTitle({
        title: '意见反馈'
      })
    },
    methods: {

      saveTips () {
        wx.showModal({
          title: '温馨提示',
          showCancel: false,
          content: '请先选择你的院校',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../search/main'
              })
            }
          }
        })
      },
      // 提交用户反馈
      sendFeedBack (obj) {
        var _this = this
        var oid = wx.getStorageSync('openId')
        wx.request({
          url: _this.GLOBAL.serverPath + '/api/user/updateUserBase',
          method: 'POST',
          data: {
            nickName: obj.nickName,
            avatarUrl: obj.avatarUrl,
            country: obj.country,
            gender: obj.gender,
            openid: oid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded '
          },
          success: function (res) {
            console.log('保存成功')
          }
        })
      },
      toSearch: function () {
        wx.navigateTo({
          url: '../search/main'
        })
      }
    }
  }
</script>

<style scoped>
  .feedBackMain{
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
   background-color: #efefef ;
  }
  form{
    width: 100%;
  }
  .contentWrap{
    width: 100%;
  }
  .content-phone{
    margin-top: 40rpx;
  }
  .phone{
    width: 100%;
    height: 80rpx;
    background-color: #ffffff;
  }
  .content-button{
    margin-top: 40rpx;
  }
  .textarea{
    height: 400rpx;
    width: 100%;
    background-color: #ffffff;
  }
  button{
    background-color: #5687e7;
    color: #FFFFFF;
  }
  .hover{
    background-color: #5CA1E7;
  }
</style>
