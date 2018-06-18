<template>
  <div class="main">
    <div class="search_top">
      <form action="" class="search_form" >
        <div class="search_com">
          <div>
            <i class="iconfont search_back">&#xe609;</i>
          </div>
          <div class="search_com_input">
            <div>
              <input class="search_input" placeholder="搜索"   autofocus="true" name="universityName">
            </div>
            <div v-show="searchClearBtn">
              <i class="iconfont search_voice">&#xe62b;</i>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="panel" v-show="searchClearBtn">
      <div class="panel_bg">
        <div class="universityItem" v-for="(item, index) in universityList" v-bind:style="{ backgroundColor: backgroundColor }" @touchstart="bindTap" @touchend="tapOver">
          <div class="universityItem_icon"><i class="iconfont search_btn">&#xe627;</i></div>
          <div class="universityItem_name">{{item.name}}</div>
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
        backgroundColor: '',
        searchValue: '',
        searchClearBtn: true,
        university: '复旦大学',
        universityList: [ {pid: '2', name: '上海师范'}, {pid: '3', name: '合肥师范'} ]
      }
    },

    components: {
      card
    },

    methods: {
      bindTap () {
        this.backgroundColor = '#999999'
        console.log('tap')
      },
      tapOver () {
        this.backgroundColor = '#ffffff'
        console.log('tapover')
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
