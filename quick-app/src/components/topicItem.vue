<template>
<div class="activity-item shadow">
    <div class="alumni-topic-item">
      <!--话题详情-->
      <div class="alumni-topic-header-row">
        <div class="account-group">
          <div class="jewelry" v-if="showJewelry"></div>
          <div class="user-popover-box" @click="toUserDetail(todo.userInfo.openid)">
            <img class="user-avataUrl" v-bind:src="todo.userInfo.avataUrl" alt="">
          </div>
          <div class="header-content">
            <div class="user-nickName" @click="toUserDetail(todo.userInfo.openid)">{{todo.userInfo.nickName}}</div>
            <div class="user-meta-box">
              <div class="university-info ellipsis" >{{todo.userInfo.graduationTime?todo.userInfo.graduationTime:'毕业时间'}} @ {{todo.userInfo.college?todo.userInfo.college:'院系'}}
              </div>
              <div class="dot">·</div>
              <div>{{todo.userInfo.major?todo.userInfo.major:'专业'}}</div>
            </div>
          </div>
        </div>
        <div class="header-action">
          <div class="more-btn" @click="moreAction(todo.id)"><span class="aliiconfont">&#xe668;</span></div>
          <div class="dropdown" v-if="actionId===todo.id&&showHeaderAction">
            <div class="dropdown-caret"></div>
            <ul class="dropdown-menu">
              <li v-if="openId!==todo.userInfo.openid" @click="tipOff(todo.id)">举报</li>
              <li v-if="openId===todo.userInfo.openid" @click="deleteTopic(todo.id)">删除</li>
            </ul>
          </div>
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
            <div class="location-content">{{todo.location}}</div>
          </div>
        </div>
      </div>
      <div class="alumni-topic-action-row">
        <div class="action-box">
          <div class="like-action action" @click="likeClick(todo.id)">
            <div class="action-title-box">
              <i class="aliiconfont action-icon" v-bind:class="{'active-action':todo.hasLiked}">&#xe630;</i>
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
      <div class="alumni-topic-comment-row" v-if="showCommentBox&&showCommentId==todo.id">
        <div class="comment-list-box">
          <!--评论框-->
          <div class="comment-form">
            <div class="form-box">
              <div class="input-box">
                <!--<input v-model="commentContent" placeholder="输入评论..." type="text" maxlength="100" class="reply-input">-->
                <input v-model="commentContent" placeholder="输入评论..." type="text" maxlength="100" class="input-content" >
              </div>
              <div class="comment-action-box">
                <div class="comment-submit">
                  <button class="comment-submit-btn" v-show="!commentContent">评论</button>
                  <button class="comment-submit-btn active" v-show="commentContent" @click="addComment(todo.id)">评论</button>
                </div>
              </div>
            </div>
          </div>
          <!--评论列表-->
          <div class="comment-list"  v-if="commentList.targetId==todo.id">
            <div class="comment-item" v-for="(item,index) in commentList.comments" :key="item.id">
              <div class="comment">
                <div class="user-popover-box" @click="toUserDetail(item.userInfo.openId)">
                  <img class="user-avataUrl comment-user-avataUrl" v-bind:src="item.userInfo.avataUrl" alt="">
                </div>
                <div class="comment-content-box">
                  <div class="comment-meta-box">
                    <div class="comment-user-info ellipsis">
                      <span class="user-nickName" @click="toUserDetail(item.userInfo.openId)">{{item.userInfo.nickName}}<span class="comment-user-college"> {{item.userInfo.graduationTime?item.userInfo.graduationTime:'毕业时间'}} @ {{item.userInfo.college?item.userInfo.college:'院系'}}</span></span>
                    </div>
                  </div>
                  <div class="comment-content">
                    {{item.content}}
                  </div>
                  <div class="comment-reply">
                    <div class="comment-reply-action-box" @click="replyCommentClick(item.cid,item.cid,item.userInfo.nickName)">
                      <div class="reply-action-comment">
                        <i class="aliiconfont action-icon">&#xe620;</i>
                        <span class="action-title">回复</span>
                      </div>
                    </div>
                  </div>
                  <!--回复框-->
                  <div class="reply-form reply" v-if="replyCommentShow&&replyCommentId==item.cid">
                    <div class="form-box">
                      <div class="input-box">
                        <input v-model="replyContent" :placeholder="placeholder" type="text" maxlength="100" class="reply-input">
                      </div>
                      <div class="reply-action-box">
                        <div class="submit">
                          <button class="comment-submit-btn" v-if="!replyContent">评论</button>
                          <button class="comment-submit-btn active" @click="addReply(item.cid, item.cid, 'comment', item.userInfo.openid, item.topicId, index)" v-if="replyContent">评论</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--回复列表-->
                  <div class="sub-comment-list">
                      <div class="reply-item" v-for="(replyItem,replyIndex) in item.topComment" :key="replyItem.id" >
                        <div class="sub-comment">
                          <div class="sub-comment-content-row">
                            <div class="sub-comment-content-box">
                              <div class="user-popover-box" @click="toUserDetail(replyItem.userInfo.openId)">
                                <img class="user-avataUrl comment-user-avataUrl" v-bind:src="replyItem.userInfo.avataUrl" alt="">
                              </div>
                                <div class="user-content-box">
                                  <div class="comment-user-info ellipsis">
                                    <span class="user-nickName" @click="toUserDetail(replyItem.userInfo.openId)">{{replyItem.userInfo.nickName}}<span class="comment-user-college"> {{replyItem.userInfo.graduationTime}} @ {{replyItem.userInfo.college}}</span></span>
                                  </div>
                                  <div class="comment-content">
                                    回复 <span class="reply-user">{{replyItem.respUserInfo.nickName}}</span>:{{replyItem.content}}
                                  </div>
                                  <div class="sub-comment-stat-box">
                                    <div class="sub-comment-action-box" @click="replyCommentClick(item.cid,replyItem.id,replyItem.userInfo.nickName)">
                                      <div class="sub-reply-action-comment">
                                        <i class="aliiconfont action-icon">&#xe620;</i>
                                        <span class="action-title" >回复</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="reply-form reply" v-if="replyCommentShow&&replyCommentId==replyItem.id">
                                    <div class="form-box">
                                      <div class="input-box">
                                        <input v-model="replyContent" :placeholder="placeholder" type="text" maxlength="100" class="reply-input">
                                      </div>
                                      <div class="reply-action-box">
                                        <div class="submit">
                                          <button class="comment-submit-btn" v-if="!replyContent">评论</button>
                                          <button class="comment-submit-btn active" @click="addReply(item.cid, replyItem.id, 'reply', replyItem.userInfo.openid, item.topicId,index)" v-if="replyContent">评论</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    <a @click="gteReplyListByCommentId(item.cid, index)" v-if="item.replyCount>2&&(!fetchReply)" class="fetch-more-comment" >加载更多</a>
                    <a  class="fetch-more-comment fetch-active" v-if="fetchAll">加载更多</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a @click="fetchMore(todo.id)" class="fetch-more-comment" v-if="commentCount>limit">加载更多</a>
          <a  class="fetch-more-comment fetch-active" v-if="fetchAll">加载更多</a>
          <span class="triangle-top">
            <em class="triangle"></em>
          </span>
        </div>
      </div>
    </div>
</div>
</template>

<script>
  import Bus from '../bus'
  import global from '../store/global-store'
  import {addComment, addReply, getReplyList, getCommentList, deleteTopic, tipOffsTopic, addLiked} from '../http/api'

  export default {
    name: 'topic-item',
    data () {
      return {
        commentList: '', // 评论列表
        commentCount: 0,
        showCommentBox: false, // 显示评论框
        showCommentId: '', // 评论的topicId
        replyCommentShow: false, // 显示回复框
        replyCommentId: '', // 回复的评论Id
        commentContent: '', // 评论内容
        commentListShow: false, // 评论列表的显示
        replyNickName: '', // 回复目标的nickName
        nickName: wx.getStorageSync('nickName'), // 用户的nickName
        openId: wx.getStorageSync('openId'),
        location: wx.getStorageSync('location'),
        university: wx.getStorageSync('university'),
        replyContent: '', // 回复的内容
        placeholder: '', // 回复的placeholder
        start: 0,
        limit: 5,
        fetchAll: false,
        fetchReply: false,
        actionId: '',
        showHeaderAction: false,
        likedAnimate: false,
        showJewelry: false // 显示饰品
      }
    },
    props: {
      todo: {
        required: true
      }
    },
    methods: {
      initPageSize () {
        this.start = 0
        this.limit = 5
      },
      moreAction (id) {
        this.showHeaderAction = !this.showHeaderAction
        this.actionId = id
      },
      tipOff (id) {
        let _this = this
        _this.showHeaderAction = !_this.showHeaderAction
        wx.showActionSheet({
          itemList: ['恶意攻击谩骂', '广告营销', '含敏感词汇'],
          success: function (res) {
            let req = {
              type: res.tapIndex,
              topicId: id
            }
            tipOffsTopic(req).then(res => {
              if (res.head.code === 0) {
                wx.showToast({
                  title: '举报成功，后台将会审核后处理',
                  icon: 'none',
                  duration: 1000
                })
              }
            })
          },
          fail: function (res) {

          },
          complete: function (res) {

          }
        })
      },
      deleteTopic (id) {
        let _this = this
        _this.showHeaderAction = !_this.showHeaderAction
        let req = {
          id: id
        }
        wx.showActionSheet({
          itemList: ['确认删除'],
          success: function (res) {
            if (res.tapIndex === 0) {
              deleteTopic(req).then(res => {
                if (res.head.code === 0) {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'none',
                    duration: 1000
                  })
                }
                Bus.$emit('getTopicList')
              })
            }
          },
          fail: function (res) {

          },
          complete: function (res) {

          }
        })
      },
      commentClick (id) { // 点击评论图标
        this.showCommentBox = !this.showCommentBox
        this.showCommentId = id
        if (this.showCommentBox) {
          this.getCommentList(id)
        }
      },
      replyCommentClick (cid, rid, name) { // 点击回复图标
        this.replyCommentShow = !this.replyCommentShow
        this.replyCommentId = rid
        this.replyNickName = name
        this.placeholder = '回复' + name
      },
      addComment (id) { // 添加评论
        let _this = this
        let req = {
          topicId: id,
          content: _this.commentContent
        }
        addComment(req).then(res => {
          if (res.head.code === 0) {
            _this.commentContent = ''
            _this.initPageSize()
            _this.getCommentList(id)
            _this.todo.commentCount = _this.todo.commentCount + 1
          }
        })
      },
      addReply (cid, rid, rType, toUid, topicId, index) { // 添加回复
        let _this = this
        let req = {
          cid: cid,
          content: _this.replyContent,
          replyId: rid,
          replyType: rType,
          toUid: toUid,
          topicId: topicId
        }
        addReply(req).then(res => {
          if (res.head.code === 0) {
            _this.initPageSize()
            _this.replyContent = ''
            _this.gteReplyListByCommentId(cid, index)
            _this.todo.commentCount = _this.todo.commentCount + 1
            _this.replyCommentShow = false
          }
        })
      },
      fetchMore (id) { // 加载更多评论
        this.start = this.start + this.limit
        this.limit = this.commentCount
        this.fetchAll = true
        this.getCommentList(id, 'more')
      },
      gteReplyListByCommentId (cid, index) {
        let _this = this
        let req = {
          cid: cid
        }
        getReplyList(req).then(res => {
          console.log('回复列表', res.data)
          _this.fetchAll = false
          _this.fetchReply = true
          console.log(index, res.data.topComment)
          _this.commentList.comments[index].topComment = res.data.topComment
        })
      },
      getCommentList (id, type) { // 获取评论以及回复列表
        let _this = this
        let req = {
          id: id,
          start: this.start,
          limit: this.limit
        }
        getCommentList(req).then(res => {
          _this.commentCount = res.data.count
          _this.fetchAll = false
          _this.fetchReply = false
          if (type) {
            _this.commentList.comments = _this.commentList.comments.concat(res.data.comments)
          } else {
            _this.start = 0
            _this.limit = 5
            _this.commentList = res.data
          }
        })
      },
      likeClick (tid) {
        let _this = this
        let liked = !_this.todo.hasLiked
        let req = {
          liked: liked,
          topicId: tid
        }
        _this.likedAnimate = true
        addLiked(req).then(res => {
          if (res.head.code === 0) {
            _this.todo.hasLiked = liked
            if (liked) {
              _this.todo.likeCount = _this.todo.likeCount + 1
            } else {
              _this.todo.likeCount = _this.todo.likeCount - 1
            }
          }
        })
      },
      toUserDetail (id) {
        global.commit('updateSelectUserId', id)
        let url = '../user-info-card/main'
        wx.navigateTo({ url })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .activity-item{
    margin-bottom: 16rpx;
    background-color: whiteColor;
    border-radius: .048rem;
  }

  .shadow{
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  }

  .alumni-topic-item {
    background-color: whiteColor;
    border-radius: .042rem;
  }

  .alumni-topic-header-row {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 32rpx 0.48rem 0 40rpx;
  }
  .header-action{
    position: relative;
    margin-left: 32rpx;
  }
  .more-btn{
    cursor: pointer;
  }

  .dropdown{
    left: -60rpx;
    position: absolute;
    margin-top: 48rpx;
    z-index: 1;
  }
  .dropdown-caret{
    position: absolute;
    top: -22rpx;
    width: 0;
    height: 0;
    border: 12rpx solid;
    border-color: transparent transparent borderColor;
    left: 72rpx
  }
  .dropdown-caret:after{
    content: "";
    top: -10rpx;
    left: -12rpx;
    border-bottom-color: whiteColor;
  }
  .dropdown-menu{
    display: block;
    padding: 12rpx 0;
    border-radius: 6rpx;
    background-color: whiteColor;
    border: 2rpx solid borderColor;
    box-shadow: 0 6rpx 24rpx 0 rgba(0,0,0,.06);
  }
  .dropdown-menu li{
    padding: 20rpx 24rpx;
    display: block;
    font-size: 26rpx;
    color: #84878b;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
  }
  .hide-drop{
    display: none;
  }
  .account-group {
    position relative
    align-items: center;
    display: flex;
  }

  .comment-user-avataUrl{
    width: 66rpx!important;
    height: 66rpx!important;
  }

  .header-content {
    margin-left: 0.24rem;
  }

  .user-nickName {
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
    color: themeColor
  }

  .location-icon {
    color: themeColor;
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
    color: #999999;
  }

  .active-action {
    color: themeColor;
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
    display: inline;
  }
  .jewelry{
    position: absolute
    background url("http://image.bloggeng.com/20181226171423.png") no-repeat
    width 80rpx
    height 80rpx
    background-size 80rpx 80rpx
    left -24rpx
    top -37rpx
    z-index 2
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

  .comment-form{
    display: flex;
    position: relative;
    padding: 0.24rem 0.28rem;
    background-color: #fafbfc;
    border-radius: 6rpx;
    margin: 0.30rem 0.20rem;
  }
  .fetch-more-comment{
    display: block;
    padding: .24rem 0;
    text-align: center;
    color: #406599;
    border-top: 2rpx solid #ebebeb;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .fetch-active{
    opacity: .2;
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
    position: relative;
    padding: .05rem .1rem;
    font-size: 26rpx;
    line-height: 1.7;
    color: #17181a;
    outline: none;
    min-height: .72rem;
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
    opacity: .2;
    ms-flex: 0 0 auto;
    flex: 0 0 auto;
    margin-left: auto;
    padding: 0 .30rem;
    font-size: .26rem;
    color: #fff;
    background-color: themeColor;
    border-radius: 4rpx;
    cursor: pointer;
  }

  .active{
    opacity: 2;
  }
  .reply-form {
    margin-top: .25rem;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    padding: .24rem .30rem;
    background-color: #fafbfc;
    border-radius: 6rpx
  }

  .form-box {
    flex: 1 1 auto;
    position: relative;
  }

  .input-box {
    background-color: #fff;
    border: 2rpx solid themeColor;
    border-radius: 6rpx;
  }

  .reply-input {
    position: relative;
    padding: .05rem .1rem;
    font-size: 26rpx;
    line-height: 1.7;
    color: #17181a;
    outline: none;
    min-height: .72rem;
  }
  .submit {
    flex: 0 0 auto;
    margin-left: auto;
  }

  .reply-action-box {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin: .14rem 0 0;
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
