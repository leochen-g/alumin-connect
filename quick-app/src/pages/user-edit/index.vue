<template>
  <div class="alumni-main">
    <div class="edit-main">
      <div class="edit-content">
        <!--修改项-->
        <!--昵称修改-->
        <div v-if="editType==='user'">
          <div class="edit-item">
            <div class="edit-title">昵称</div>
            <div class="edit-input">
              <input type="text" v-model="userInfo.nickName" @click="focusClick('nickName')" @blur="moveClick">
            </div>
            <div class="edit-btn-group" v-if="type==='nickName'">
              <a href="" class="save" @click="updateUserInfo('nickName',userInfo.nickName)">保存</a>
              <a href="" class="cancel" @click="cancel">取消</a>
            </div>
          </div>
          <div class="edit-item">
            <div class="edit-title">微信号</div>
            <div class="edit-input">
              <input type="text" v-model="userInfo.wechat" @click="focusClick('wechat')" @blur="moveClick">
            </div>
            <div class="edit-btn-group" v-if="type==='wechat'">
              <a href="" class="save" @click="updateUserInfo('wechat',userInfo.wechat)">保存</a>
              <a href="" class="cancel" @click="cancel">取消</a>
            </div>
          </div>
          <div class="edit-item">
            <div class="edit-title">联系方式</div>
            <div class="edit-input">
              <input type="text" v-model="userInfo.phone" @click="focusClick('phone')" @blur="moveClick">
            </div>
            <div class="edit-btn-group" v-if="type==='phone'">
              <a href="" class="save" @click="updateUserInfo('phone',userInfo.phone)">保存</a>
              <a href="" class="cancel" @click="cancel">取消</a>
            </div>
          </div>
        </div>
        <!--学校信息修改-->
        <div v-if="editType==='school'">
          <div class="edit-item">
            <div class="edit-title">学校</div>
            <div class="edit-input">
              <input type="text" v-model="userInfo.school.university" @click="goSearchSchool()" >
            </div>
          </div>
          <div class="edit-item">
            <div class="edit-title">毕业时间</div>
            <div class="edit-input">
              <picker mode="date" :value="userInfo.school.graduationTime" fields="year" @change="bindDateChange">
                <div class="picker">{{userInfo.school.graduationTime}}</div>
              </picker>
            </div>
          </div>
          <div class="edit-item">
            <div class="edit-title">院系</div>
            <div class="edit-input">
              <input type="text" v-model="userInfo.school.college" @click="focusClick('college')" @blur="moveClick">
            </div>
            <div class="edit-btn-group" v-if="type==='college'">
              <a href="" class="save" @click="updateUserInfo('college',userInfo.school.college)">保存</a>
              <a href="" class="cancel" @click="cancel">取消</a>
            </div>
          </div>
          <div class="edit-item">
            <div class="edit-title">专业</div>
            <div class="edit-input">
              <input type="text" v-model="userInfo.school.major" @click="focusClick('major')" @blur="moveClick">
            </div>
            <div class="edit-btn-group" v-if="type==='major'">
              <a href="" class="save" @click="updateUserInfo('major',userInfo.school.major)">保存</a>
              <a href="" class="cancel" @click="cancel">取消</a>
            </div>
          </div>
        </div>
        <!--公司信息修改-->
        <div v-if="editType==='company'">
          <div class="edit-item">
            <div class="edit-title">公司</div>
            <div class="edit-input">
              <input type="text" v-model="userInfo.company" @click="focusClick('company')" @blur="moveClick">
            </div>
            <div class="edit-btn-group" v-if="type==='company'">
              <a href="" class="save" @click="updateUserInfo('company',userInfo.company)">保存</a>
              <a href="" class="cancel" @click="cancel">取消</a>
            </div>
          </div>
          <div class="edit-item">
            <div class="edit-title">职位</div>
            <div class="edit-input">
              <input type="text" v-model="userInfo.job" @click="focusClick('job')" @blur="moveClick">
            </div>
            <div class="edit-btn-group" v-if="type==='job'">
              <a href="" class="save" @click="updateUserInfo('job',userInfo.job)">保存</a>
              <a href="" class="cancel" @click="cancel">取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'
  import {getUserInfo, updateUserInfo} from '../../http/api'

  export default {
    name: 'index',
    computed: {
      editType () {
        return globalStore.state.editType
      }
    },
    data () {
      return {
        focusInput: false,
        userInfo: '',
        date: '',
        type: ''
      }
    },
    onShow: function () {
      wx.setNavigationBarTitle({
        title: '信息修改'
      })
      this.getUserInfo()
    },
    methods: {
      getUserInfo () {
        let _this = this
        getUserInfo().then(res => {
          _this.userInfo = res.data
          globalStore.commit('updateUserInfo', _this.userInfo)
        })
      },
      updateUserInfo (type, val) {
        let _this = this
        let req = {
          type: type,
          value: val
        }
        updateUserInfo(req).then(res => {
          if (res.head.code === 0) {
            _this.getUserInfo()
            _this.type = ''
            wx.showToast({
              title: '保存成功',
              icon: 'none',
              duration: 1000
            })
          }
        })
      },
      goSearchSchool () {
        wx.navigateTo({
          url: '../search/main'
        })
      },
      focusClick (type) {
        let _this = this
        _this.type = type
        _this.focusInput = true
      },
      moveClick () {
        let _this = this
        _this.focusInput = false
      },
      bindDateChange (e) {
        this.date = e.target.value
        this.updateUserInfo('graduationTime', this.date)
      },
      cancel () {
        this.type = ''
      }
    }

  }
</script>

<style scoped>
  .alumni-main{
    background-color: #f4f5f5;
    height: 100%;
    width: 100%;
  }
  .edit-main{
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #F2F2F2;
  }
  .edit-content{
    padding: 10rpx 20rpx;
    background-color: #ffffff;
  }
  .edit-item:first-child{
    border-top: none!important;
  }
  .edit-item{
    border-top: 2rpx solid #e1e1e1;
    display: flex;
    justify-content: flex-start;
    position: relative;
    height: 60rpx;
    line-height: 60rpx;
    background-color: #ffffff;
    padding: 20rpx;
  }
  .edit-title{
    font-size: 24rpx;
  }
  .edit-input{
    margin-left: 20rpx;
    height: 60rpx;
    width: 60%;
  }
  .edit-input input{
    width: 100%;
    height: 60rpx;
    display: block;
    color: #aaaaaa;
  }
  .edit-btn-group{
    margin-left: 40rpx;
    width: 110rpx;
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .cancel{
    color: #c8c8c8;
  }
  .save{
    color: #027fff
  }
  .picker{
    color: #c8c8c8;
  }
</style>
