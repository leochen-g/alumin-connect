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
              <div class="university-info ellipsis">{{todo.userInfo.graduationTime}} @ {{todo.userInfo.university}}
              </div>
              <div class="dot">·</div>
              <div>{{todo.userInfo.college}}</div>
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
            <div class="action-title-box">
              <i class="aliiconfont action-icon">&#xe70b;</i>
              <span class="action-title">{{todo.likeCount?todo.likeCount:'赞'}}</span>
            </div>
          </div>
          <div class="comment-action action">
            <div class="action-title-box">
              <i class="aliiconfont action-icon">&#xe620;</i>
              <span class="action-title">{{todo.commentCount?todo.commentCount:'评论'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
  export default {
    name: 'topic-item',
    props: {
      todo: {
        required: true
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
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    margin-left: 0.48rem;
    margin-right: 0.48rem;
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
</style>
