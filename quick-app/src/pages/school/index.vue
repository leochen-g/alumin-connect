<template>
  <div class="container" >
    <div class="schoolMain">
      <div class="school-info" @click="bindViewTap">
        <!--<div class="header-nav">-->
          <!--<div>-->
            <!--<a href="/pages/index/main">-->
              <!--<i class="iconfont search_back">&#xe609;</i>-->
            <!--</a>-->
          <!--</div>-->
          <!--<div>-->
            <!--<p class="title">选择院校</p>-->
          <!--</div>-->
          <!--<div></div>-->
        <!--</div>-->
        <div >
          <p class="title">选 择 院 校</p>
        </div>
        <p class="iconfont universityIcon" >&#xe955;</p>
        <div class="userinfo-nickname">
          <p class="university">{{university}}</p>
        </div>
        <div class="university-input">
          <input type="text" v-model="university" disabled placeholder="搜索" class="search-input" @click="toSearch">
        </div>
        <div class="button-finish">
          <a  class="finish" href="" @tap="saveUniversity">完成</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import card from '@/components/card'

  export default {
    data () {
      return {
        university: ''
      }
    },
    components: {
      card
    },

    methods: {
      toSearch: function () {
        wx.navigateTo({
          url: '../search/main'
        })
      },
      getUniversityName () {
        var value = wx.getStorageSync('university')
        console.log(value)
        if (value) {
          this.university = value
        } else {
          this.university = '请选择'
        }
      },
      saveUniversity () {
        var _this = this
        var oid = wx.getStorageSync('openId')
        wx.request({
          url: this.GLOBAL.serverPath + '/api/user/updateUniversity',
          method: 'POST',
          data: {
            oid: oid,
            university: _this.university
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded '
          },
          success: function (res) {
            const url = '../charts/main'
            wx.navigateTo({ url })
            console.log('保存成功')
          }
        })
      }
    },
    mounted () {
      this.getUniversityName()
    },
    created () {
    }
  }
</script>

<style scoped>
  .schoolMain{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 1334rpx;
    box-sizing: border-box;
    background-image: url('https://lg-me0h2lia-1256919187.cos.ap-shanghai.myqcloud.com/bg2.jpg');
    background-size: 100%;
  }
  .header-nav{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .search_back{
    font-size: 40rpx;
  }
  .title{
    margin-top: 80rpx ;
    font-size: 28rpx;
    color: #ffffff;
  }
  .universityIcon{
    margin-top: 94rpx;
    font-size: 200rpx;
    color: #FFFFFF;
  }
  .school-info {
    background-color: rgba(0,0,0,0.85);
    height: 1334rpx;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .university{
    margin-top: 85rpx;
    font-size: 36rpx;
    letter-spacing: 6rpx;
  }
  .userinfo-nickname {
    color: #ffffff;
  }
  .university-input{
    margin: 48rpx auto;
  }
  .button-finish{
    margin-top:210rpx ;
  }
  .finish {
    width: 164rpx;
    padding: 10rpx 20rpx;
    color: #FFFFFF;
    background-color: #5687e7 ;
    border-radius: 15rpx;
    font-size: 28rpx ;
    text-align: center;
  }
  .search-input{
    width: 400rpx ;
    border: 2rpx solid #5687e7;
    font-size: 22rpx;
    text-align: center;
    padding: 8rpx 20rpx;
    border-radius: 10rpx;
    color: #aaa;
  }
</style>
