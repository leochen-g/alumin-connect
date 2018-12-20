<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    //
    // console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
  @font-face {
    font-family: 'aliiconfont';  /* project id 709721 */
    src: url('//at.alicdn.com/t/font_709721_y3v3cgif9m.eot');
    src: url('//at.alicdn.com/t/font_709721_y3v3cgif9m.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_709721_y3v3cgif9m.woff') format('woff'),
    url('//at.alicdn.com/t/font_709721_y3v3cgif9m.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_709721_y3v3cgif9m.svg#aliiconfont') format('svg');
  }
  html{
    font-size: 24rpx;
  }
  .aliiconfont {
    font-family: "aliiconfont" !important;
    font-size: 32rpx;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
  .ellipsis{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>
