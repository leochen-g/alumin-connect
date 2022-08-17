<template>
  <div class="alumni-main">
    <div class="about-main">
      <div class="about-content">
        <div class="about-title">关于校友来了</div>
        <div class="about-content">
          原《校友足迹》重大升级2.0，全新改版为《校友来了》，不仅有查看校友足迹的功能，更可以和同城校友无障碍沟通。
          <br />
          新版《校友来了》新增校友圈子功能，在圈子里你可以看到同城校友发布的话题，可以进行话题留言和点赞，如果你们有相同的兴趣爱好，或者工作上有交集，可以点击对方昵称或头像查看联系方式，更进一步沟通。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalStore from '../../store/global-store';
export default {
  name: 'index',
  components: {},
  computed: {
    location() {
      return globalStore.state.location;
    },
  },
  data() {
    return {
      userInfo: '',
    };
  },
  onShow: function () {
    uni.setNavigationBarTitle({
      title: '关于校友足迹',
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.about-main {
  position: fixed;
  background-color: $whiteColor;
  width: 100%;
  height: 100%;
}
.about-title {
  font-size: 28rpx;
  text-align: center;
}
.about-content {
  padding: 20rpx;
  text-indent: 48rpx;
  font-size: 28rpx;
  line-height: 1.5;
  min-height: 500rpx;
  color: $textColor;
}
</style>
