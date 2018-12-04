<template>
<div class="activity-item shadow">
    <div class="alumni-topic-item">
      <div class="alumni-topic-header-row">
        <div class="account-group">
          <div class="user-popover-box">
            <img class="user-avataUrl" v-bind:src="todo.userInfo.avataUrl" alt="">
          </div>
          <div class="header-content">
            <div class="user-nickName">{{todo.userInfo.nickName}}</div>
            <div class="user-meta-box">
              <div class="university-info ellipsis" >{{todo.userInfo.graduationTime}} @ {{todo.userInfo.college}}
              </div>
              <div class="dot">·</div>
              <div>{{todo.userInfo.major}}</div>
            </div>
          </div>
        </div>
        <div class="header-action">
        </div>
      </div>
      <div class="alumni-topic-content-row">
        <div class="content-box">
          <span>
            {{todo.content}}
          </span>
        </div>
        <div class="content-location">
          <div class="location-title-box">
            <i class="aliiconfont location-icon">&#xe64a;</i>
            <span class="location-title">{{todo.location}}</span>
          </div>
        </div>
      </div>
      <div class="alumni-topic-action-row">
        <div class="action-box">
          <div class="like-action action">
            <div class="action-title-box" @click="$emit('like',todo.id)">
              <i class="aliiconfont action-icon">&#xe70b;</i>
              <span class="action-title">{{todo.likeCount?todo.likeCount:'赞'}}</span>
            </div>
          </div>
          <div class="comment-action action" @click="commentClick(todo.id)">
            <div class="action-title-box" >
              <i class="aliiconfont action-icon">&#xe620;</i>
              <span class="action-title">{{todo.commentCount?todo.commentCount:'评论'}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--评论列表-->
      <div class="alumni-topic-comment-row" v-show="showCommentBox&&showCommentId==todo.id">
        <div class="comment-list-box">
          <div class="comment-form">
            <div class="form-box">
              <div class="input-box">
                <label for=""><input v-model="commentContent" maxlength="100" placeholder="输入评论..." class="input-content" type="text"></label>
              </div>
              <div class="comment-action-box">
                <div class="comment-submit">
                  <button class="comment-submit-btn">评论</button>
                </div>
              </div>
            </div>
          </div>
          <div class="comment-list"  v-show="commentList.targetId==todo.id">
            <div class="comment-item" v-for="(item,index) in commentList.comments" :key="item.id">
              <div class="comment">
                <div class="user-popover-box">
                  <img class="user-avataUrl comment-user-avataUrl" v-bind:src="item.userInfo.avataUrl" alt="">
                </div>
                <div class="comment-content-box">
                  <div class="comment-meta-box">
                    <div class="comment-user-info ellipsis">
                      <span class="user-nickName">{{item.userInfo.nickName}}<span class="comment-user-college"> {{item.userInfo.graduationTime}} @ {{item.userInfo.college}}</span></span>
                    </div>
                  </div>
                  <div class="comment-content">
                    {{item.content}}
                  </div>
                  <div class="comment-reply">
                    <div class="comment-reply-action-box">
                      <div class="reply-action-comment">
                        <i class="aliiconfont action-icon">&#xe620;</i>
                        <span class="action-title" @click="$emit('reply',item.cid,item.cid)">回复</span>
                      </div>
                    </div>
                  </div>
                  <topicReplyForm :replyNickName="item.userInfo.nickName" :replyId="item.cid"/>
                  <div class="sub-comment-list">
                      <div class="reply-item" v-for="(replyItem,replyIndex) in item.topComment" :key="replyItem.id" >
                        <div class="sub-comment">
                          <div class="sub-comment-content-row">
                            <div class="sub-comment-content-box">
                              <div class="user-popover-box">
                                <img class="user-avataUrl comment-user-avataUrl" v-bind:src="replyItem.userInfo.avataUrl" alt="">
                              </div>
                                <div class="user-content-box">
                                  <div class="comment-user-info ellipsis">
                                    <span class="user-nickName">{{replyItem.userInfo.nickName}}<span class="comment-user-college"> {{replyItem.userInfo.graduationTime}} @ {{replyItem.userInfo.college}}</span></span>
                                  </div>
                                  <div class="comment-content">
                                    回复 <span class="reply-user">{{replyItem.respUserInfo.nickName}}</span>:{{replyItem.content}}
                                  </div>
                                  <div class="sub-comment-stat-box">
                                    <div class="sub-comment-action-box">
                                      <div class="sub-reply-action-comment">
                                        <i class="aliiconfont action-icon">&#xe620;</i>
                                        <span class="action-title" @click="$emit('reply',replyItem.id,replyItem.cid)">回复</span>
                                      </div>
                                    </div>
                                  </div>
                                  <topicReplyForm :replyNickName="replyItem.userInfo.nickName" :replyId="replyItem.id"/>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span class="triangle-top">
            <em class="triangle"></em>
          </span>
        </div>
      </div>
    </div>
</div>
</template>

<script>
  import topicReplyForm from './topicReplyForm'
  export default {
    name: 'topic-item',
    components: {topicReplyForm},
    data () {
      return {
        commentList: '',
        showCommentBox: false,
        showCommentId: ''
      }
    },
    props: {
      todo: {
        required: true
      }
    },
    methods: {
      commentClick (id) {
        this.showCommentBox = !this.showCommentBox
        this.showCommentId = id
        if (this.showCommentBox) {
          this.getCommentList(id)
        }
      },
      getCommentList (id) {
        let _this = this
        wx.request({
          url: _this.GLOBAL.serverPath + '/api/group/getCommentList',
          method: 'POST',
          data: {
            id: id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded '
          },
          success: function (res) {
            _this.commentList = res.data.data
          }
        })
        console.log('获取评论', id)
      }
    }
  }
</script>

<style scoped>
  .activity-item{
    margin-bottom: 16rpx;
    background-color: #fff;
    border-radius: .048rem;
  }

  .shadow{
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  }

  .alumni-topic-item {
    background-color: #fff;
    border-radius: .042rem;
  }

  .alumni-topic-header-row {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 32rpx 0.048rem 0 40rpx;
  }

  .account-group {
    align-items: center;
    display: flex;
  }

  .user-popover-box {
    display: inline;
  }

  .comment-user-avataUrl{
    width: 66rpx!important;
    height: 66rpx!important;
  }

  .header-content {
    margin-left: 0.24rem;
  }

  .user-nickName {
    font-size: 24rpx;
    font-family: -apple-system, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Arial, sans-serif;
    word-break: break-word;
    text-rendering: optimizeLegibility;
    color: #333;
  }

  .user-avataUrl {
    width: .82rem;
    height: .82rem;
    display: inline-block;
    flex: 0 0 auto;
    border-radius: 50%;
    position: relative;
    background-position: 50%;
  }

  .header-action {
    display: flex;
  }

  .user-meta-box {
    display: flex;
    align-items: center;
    margin: 0.026rem 0 0;
    font-size: 24rpx;
    color: #8a9aa9;
    cursor: default;
  }

  .university-info {
    max-width: 300rpx;
  }

  .dot {
    margin: 0 0.12rem;
  }

  .alumni-topic-content-row {
    margin-top: 40rpx;
    margin-bottom: 10rpx;
    margin-left: 0.38rem;
    margin-right: 0.38rem;
  }

  .content-box {
    font-size: 30rpx;
    line-height: 1.6;
    white-space: normal;
    color: #17181a;
  }

  .content-location{
    display: flex;
    justify-content: flex-end;
  }

  .location-title-box {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #027fff;
  }

  .location-icon {
    font-size: 24rpx;
    color: #027fff;
  }

  .action-box {
    display: flex;
    position: relative;
    margin-top: 0.28rem;
    height: 68rpx;
    border-top: 2rpx solid #ebebeb;
  }

  .action {
    flex: 1 1 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    cursor: pointer;
    user-select: none;
    webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .action:not(:last-child):after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -0.24rem;
    width: 2rpx;
    height: 0.48rem;
    background-color: #ebebeb;
  }

  .action-title-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-icon {
    font-size: 36rpx;
  }

  .action-title {
    margin-left: .072rem;
    font-size: 26rpx;
    font-weight: 500;
    color: #8a93a0;
  }

  .comment-list-box{
    position: relative;
    border-top: 1px solid #ebebeb;
  }
  .comment-list-box:before{
    display: table;
    content: "";
    clear: both;
  }

  .comment-form{
    display: flex;
    position: relative;
    padding: 0.24rem 0.28rem;
    background-color: #fafbfc;
    border-radius: 6rpx;
    margin: 0.30rem 0.20rem;
  }

  .form-box{
    flex:1 1 auto;
    position: relative;
  }

  .input-box{
    font-size: 0;
    background-color: #fff;
    border: 2rpx solid #f1f1f1;
    border-radius: 6rpx;
  }

  .input-content{
    border: none;
    position: relative;
    padding: 0.12rem .24rem;
    font-size: 24rpx;
    line-height: 1.7;
    color: #17171a;
    outline: none;
    min-height: .28rem;
  }

  .comment-action-box{
    display: flex;
    align-items: center;
    margin: .16rem 0 0;
  }

  .comment-submit{
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    margin-left: auto;
  }

  .comment-submit-btn{
    ms-flex: 0 0 auto;
    flex: 0 0 auto;
    margin-left: auto;
    padding: 0 .30rem;
    font-size: .26rem;
    color: #fff;
    background-color: #027fff;
    border-radius: 4rpx;
    cursor: pointer;
  }

  .comment-list{
    margin: 0 .48rem;
  }

  .comment-item{
    margin-bottom: .30rem;
  }

  .comment{
    display: flex;
  }

  .user-popover-box{
    width: 66rpx;
    height: 66rpx;
    display: inline;
  }

  .comment-content-box{
    border-bottom: 2rpx solid #f1f1f1;
    margin-left: .18rem;
    flex: 1 1 auto;
  }

  .comment-meta-box{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    font-size: .25rem;
    line-height: 1.2;
    white-space: nowrap;
  }

  .comment-user-info{
    display: inline;
  }

  .comment-user-college{
    display: inline;
    color: #8a9aa9;
  }

  .comment-content{
    margin-top: .12rem;
    font-size: 26rpx;
    line-height: .42rem;
    white-space: normal;
    color: #505050;
  }

  .comment-reply{
    display: flex;
    margin-top: 14rpx;
    font-weight: 400;

  }

  .comment-reply-action-box{
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: flex-end;
    margin-left: auto;
    min-width: 2.10rem;
    color: #8a93a0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .reply-action-comment{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin-left: .12rem;
    cursor: pointer;
  }

  .sub-comment-list{
    margin: 24rpx 0;
    padding: 0 0 0 24rpx;
    background-color: #fafbfc;
    border-radius: 6rpx;
  }

  .sub-comment{
    position: relative;
    padding: .24rem 0 0;
  }

  .sub-comment-content-row{
    display: flex;
    align-items: start;
  }

  .sub-comment-content-box{
    display: flex;
    width: 100%
  }

  .user-content-box{
    margin-left: .20rem;
    margin-right: .24rem;
    padding-bottom: 24rpx;
    font-size: .26rem;
    color: #17181a;
    width: 100%;
  }

  .reply-user{
    color: #406599;
  }

  .sub-comment-stat-box{
    display: -ms-flexbox;
    display: flex;
    margin-top: 14rpx;
    font-size: 26rpx;
    color: #8a93a0;
  }

  .sub-comment-action-box{
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: flex-end;
    margin-left: auto;
    min-width: 2.10rem;
    font-size: 0.26rem;
    color: #8a93a0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .sub-reply-action-comment{
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin-left: .12rem
  }
  .triangle-top{
    display: block;
    position: absolute;
    top: -16rpx;
    left: 50%;
    margin: -14rpx 0 0 -14rpx;
    width: 28rpx;
    height: 28rpx;
    border-top: 1px solid #ffffff;
    transform: rotate(180deg);
    max-width: 960px;
  }

  .triangle-top:after{
    display:table;
    content:"";
    clear:both;
  }

  .triangle{
    position: absolute;
    margin: auto;
    top: -12rpx;
    left: 0;
    right: 0;
    width: 20rpx;
    height: 20rpx;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    border-right: 2rpx solid #ebebeb;
    border-bottom: 2rpx solid #ebebeb;
    background: #fff;
  }


</style>
