<template>
  <div class="searchMain">
    <div class="search_top">
      <form action="" class="search_form" >
        <div class="search_com">
          <div class="search_com_input">
            <div style="width: 100%">
              <input class="search_input" placeholder="搜索" v-model.trim="searchValue"   name="universityName">
            </div>
            <div v-if="searchClearBtn&&searchValue!==''" @click="clearSearch">
              <i class="aliiconfont search_voice">&#xe62b;</i>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="panel" v-if="searchClearBtn&&searchValue!==''">
      <div class="panel_bg">
        <div class="universityItem" v-for="(item, index) in universityList" :key="index" v-bind:style="{ backgroundColor:chooseIndex === index ? '#999999': '#ffffff'}" @touchstart="bindTap(index)" @touchend="tapOver" @click="choose(item.name)">
          <div class="universityItem_icon"><i class="aliiconfont search_btn">&#xe627;</i></div>
          <div class="universityItem_name">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import globalStore from '../../store/global-store'
  import {getUniversity, updateUserUniversity} from '../../http/api'
  const delay = (function () {
    let timer = 0
    return function (callback, ms) {
      clearTimeout(timer)
      timer = setTimeout(callback, ms)
    }
  })()
  export default {
    computed: {
      university () {
        return globalStore.state.university
      },
      userInfo () {
        return globalStore.state.userInfo
      }
    },
    data () {
      return {
        chooseIndex: '',
        backgroundColor: '',
        searchValue: '',
        searchClearBtn: false,
        universityList: []
      }
    },
    onShow () {
      this.chooseIndex = ''
      this.searchValue = ''
    },
    methods: {
      bindTap (val) {
        this.chooseIndex = val
      },
      tapOver () {
        this.chooseIndex = ''
      },
      clearSearch () {
        this.searchValue = ''
        this.searchClearBtn = false
      },
      choose (val) {
        this.searchValue = val
        wx.setStorageSync('university', val)
        globalStore.commit('increment', val)
        const req = {
          university: val
        }
        updateUserUniversity(req).then(res => {
          if (this.userInfo) {
            globalStore.commit({
              type: 'updateUserInfoItem',
              key: 'university',
              otherKey: 'school',
              value: val
            })
          }
          wx.navigateBack({
            delta: 1
          })
        })
      },
      fetchData (val) {
        const _this = this
        const req = {
          wd: val
        }
        getUniversity(req).then(res => {
          _this.universityList = res.data
        })
      }
    },
    watch: {
      searchValue () {
        let _this = this
        _this.searchClearBtn = true
        delay(() => {
          _this.fetchData(_this.searchValue)
        }, 300)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .searchMain{
    position: fixed;
    background-color:#E5E5E5 ;
    height: 100%;
    width: 100%;
  }
  .search_com{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .search_voice{
    font-size: 40rpx;
    color: #bfbfbf;
  }
  .search_com_input{
    margin-left: 2%;
    width: 96%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2rpx solid #1FD927;
  }
  .search_input{
    padding:10rpx 20rpx ;
    font-size 28rpx
    color:#888888 ;
  }
  .universityItem{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
  .search_btn{
    font-size: 40rpx;
    color: #BfBfBf;
  }
  .panel{
    background-color: #ffffff;
    min-height: 300rpx;
  }
  .universityItem{
    padding: 20rpx 30rpx;
    border-bottom: 2rpx solid #BBBBBB;
  }
  .universityItem_name{
    color: #888888;
    font-size: 32rpx;
  }
</style>
