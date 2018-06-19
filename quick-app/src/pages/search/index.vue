<template>
  <div class="main">
    <div class="search_top">
      <form action="" class="search_form" >
        <div class="search_com">
          <a href="/pages/school/main">
            <i class="iconfont search_back">&#xe609;</i>
          </a>
          <div class="search_com_input">
            <div>
              <input class="search_input" placeholder="搜索" v-model.trim="searchValue"   autofocus="true" name="universityName">
            </div>
            <div v-if="searchClearBtn&&searchValue!==''" @click="clearSearch">
              <i class="iconfont search_voice">&#xe62b;</i>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="panel" v-if="searchClearBtn&&searchValue!==''">
      <div class="panel_bg">
        <div class="universityItem" v-for="(item, index) in universityList" v-bind:style="{ backgroundColor:chooseIndex === index ? '#999999': '#ffffff'}" @touchstart="bindTap(index)" @touchend="tapOver">
          <div class="universityItem_icon"><i class="iconfont search_btn">&#xe627;</i></div>
          <div class="universityItem_name">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import card from '@/components/card'
  const delay = (function () {
    let timer = 0
    return function (callback, ms) {
      clearTimeout(timer)
      timer = setTimeout(callback, ms)
    }
  })()
  export default {
    data () {
      return {
        chooseIndex: '',
        backgroundColor: '',
        searchValue: '',
        searchClearBtn: false,
        university: '复旦大学',
        universityList: [ {pid: '2', name: '上海师范'}, {pid: '3', name: '合肥师范'} ]
      }
    },

    components: {
      card
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
      fetchData (val) {
        wx.request({
          url: 'http://www.baidu.com',
          data: {},
          header: {},
          success: function (res) {
            this.universityList = [ {pid: '2', name: '上海师范大学'}, {pid: '3', name: '合肥师范学院'} ]
          }
        })
      }
    },
    watch: {
      searchValue () {
        this.searchClearBtn = true
        delay(() => {
          this.fetchData()
        }, 300)
      }
    },
    created () {
    }
  }
</script>

<style scoped>
  .main{
    background-color:#E5E5E5 ;
    min-height: 1000px;
  }
  .search_com{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .search_back{
    font-size: 20px;
  }
  .search_voice{
    font-size: 20px;
    color: #bfbfbf;
  }
  .search_com_input{
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1FD927;
  }
  .search_input{
    padding:5px 10px ;
    color:#888888 ;
  }
  .universityItem{
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
  .search_btn{
    font-size: 20px;
    color: #BfBfBf;
  }
  .panel{
    background-color: #ffffff;
    min-height: 150px;
  }
  .universityItem{
    padding: 10px 15px;
    border-bottom: 1px solid #BBBBBB;
  }
  .universityItem_icon{

  }
  .universityItem_name{
    color: #888888;
    font-size: 16px;
  }
</style>
