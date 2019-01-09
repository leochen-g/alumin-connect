<template>
  <div class="container">
    <div class="chartMain">
      <div class="title">
        <p class="school-name">{{university}}</p>
        <p class="detail">你的<span class="city-count">{{userCount}}</span>名校友遍布全国<span class="city-count">{{pCount}}</span>个省区,<span class="city-count">{{locationCount}}</span>个城市</p>
      </div>
      <div class="proverb">
        "{{proverb}}"
      </div>
      <div class="echarts-wrap">
        <mpvue-echarts lazyLoad :echarts="echarts"  :onInit="initMap" disableTouch=true ref="echarts" canvasId="demo-canvas" >
        </mpvue-echarts>
      </div>
      <div class="top-location top1" v-if="topName[0]">
        Top1 {{topName[0]}} {{topVal[0]}}人
      </div>
      <div class="top-location top2" v-if="topName[1]">
        Top2 {{topName[1]}} {{topVal[1]}}人
      </div>
      <div class="top-location top3" v-if="topName[2]">
        Top3 {{topName[2]}} {{topVal[2]}}人
      </div>
      <!--<div class="echarts-bar">-->
        <!--<mpvue-echarts lazyLoad=false :echarts="echarts"  :onInit="initBar" disableTouch=true ref="echartsBar" canvasId="canvas-bar" />-->
      <!--</div>-->
      <cover-view>
        <button class="sixedge-share" open-type="share">分享</button>
        <button class="sixedge-share downLoad"  @click ='saveImg'>下载</button>
        <button class="sixedge-share say"  @click ='goTopic'>聊聊</button>
      </cover-view>
    </div>
    <div class="echarts-hide">
      <mpvue-echarts lazyLoad :echarts="echarts"  :onInit="initHide" disableTouch=true ref="echartsHide" canvasId="hide-canvas" />
    </div>
    <div class="shareImg">
      <canvas canvas-id="shareCanvas" style="width:900px;height:1766px"></canvas>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import mpvueEcharts from 'mpvue-echarts'
  import globalStore from '../../store/global-store'
  import {getMapData, getUserAndLocation} from '../../http/api'

  require('echarts/map/js/china')
  let chart = null
  // let chartBar = null
  let chartHide = null
  let option = null
  // let optionBar = null
  let optionHide = null
  function handleInitChart (canvas, width, height) {
    chart = echarts.init(canvas, null, {
      width: width,
      height: height
    })
    canvas.setChart(chart)
    chart.setOption(option)
    return chart // 返回 chart 后可以自动绑定触摸操作
  }
  // function handleInitBarChart (canvas, width, height) {
  //   chartBar = echarts.init(canvas, null, {
  //     width: width,
  //     height: height
  //   })
  //   canvas.setChart(chartBar)
  //   chartBar.setOption(optionBar)
  //   return chartBar // 返回 chart 后可以自动绑定触摸操作
  // }
  function handleInitHideChart (canvas, width, height) {
    chartHide = echarts.init(canvas, null, {
      width: 1100,
      height: 776
    })
    canvas.setChart(chartHide)
    chartHide.setOption(optionHide)
    return chartHide // 返回 chart 后可以自动绑定触摸操作
  }
  export default {
    computed: {
      university () {
        return globalStore.state.university
      },
      nickName () {
        return globalStore.state.nickName
      }
    },
    components: {
      mpvueEcharts
    },
    data () {
      return {
        echarts,
        initMap: handleInitChart,
        // initBar: handleInitBarChart,
        initHide: handleInitHideChart,
        map: [],
        pCount: 0,
        topName: [],
        topVal: [],
        locationCount: '',
        userCount: '',
        proverb: '',
        animationData: {}
      }
    },
    onShareAppMessage (options) {
      return {
        title: '快来看看你的校友在哪里？',
        path: '/pages/index/main',
        success: function (res) {
          console.log('分享成功')
        }
      }
    },
    mounted () {
      this.getUniversityMap()
      this.getStudentCount()
    },
    methods: {
      goTopic () {
        wx.switchTab({
          url: '../topic/main'
        })
      },
      // initChartBar () {
      //   var _this = this
      //   optionBar = {
      //     title: {
      //       text: 'TOP5 省份',
      //       textStyle: {
      //         fontSize: 13,
      //         color: '#ffffff'
      //       }
      //     },
      //     grid: {
      //       left: '3%',
      //       right: '4%',
      //       bottom: '3%',
      //       containLabel: true
      //     },
      //     xAxis: {
      //       splitLine: false,
      //       type: 'value',
      //       axisLine: {
      //         lineStyle: {
      //           color: '#ffffff',
      //           width: 1
      //         }
      //       }
      //     },
      //     yAxis: {
      //       type: 'category',
      //       data: this.topName,
      //       boundaryGap: [0, 0.01],
      //       splitLine: false,
      //       nameTextStyle: {
      //         color: ['#ffffff']
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: '#ffffff'
      //         }
      //       }
      //     },
      //     series: [
      //       {
      //         type: 'bar',
      //         label: {
      //           show: true,
      //           position: 'insideTop'
      //         },
      //         barWidth: 20,
      //         itemStyle: {
      //           normal: {
      //             color: '#49EAE5'
      //           }
      //         },
      //         data: this.topVal
      //       }
      //     ]
      //   }
      //   _this.$refs.echartsBar.init()
      // },
      convertData (data) {
        var mapName = 'china'
        var geoCoordMap = {}
        // chart.showLoading()
        var mapFeatures = echarts.getMap(mapName).geoJson.features
        // chart.hideLoading()
        mapFeatures.forEach(function (v) {
          // 地区名称o
          var name = v.properties.name
          // 地区经纬度
          geoCoordMap[name] = v.properties.cp
        })
        var res = []
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name]
          if (geoCoord !== '') {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      },
      initChart () {
        var _this = this
        var mapName = 'china'
        option = {
          dataRange: {
            show: false,
            min: 0,
            max: 100,
            x: 'left',
            y: 'bottom',
            text: ['高', '低'],
            calculable: true,
            color: ['#246E88', '#4EFFF1']
          },
          // visualMap: {
          //   show: false,
          //   min: 0,
          //   max: 300,
          //   left: 'left',
          //   top: 'bottom',
          //   text: ['高', '低'],
          //   calculable: true,
          //   seriesIndex: [1],
          //   textStyle: {
          //     color: '#ffffff'
          //   },
          //   inRange: {
          //     // color: ['#89f7fe', '#66a6ff']
          //     color: ['#4EFFF1', '#246E88']
          //   }
          // },
          geo: {
            show: true,
            map: mapName,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                // areaColor: '#09283c',
                areaColor: '#151515',
                borderColor: '#385f98',
                shadowColor: '#385f98',
                shadowBlur: 4
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            }
          },
          series: [{
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.95,
            showLegendSymbol: false,
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              }
            },
            animation: false,
            data: this.map
          }]
        }
        // option = {
        //   dataRange: {
        //     show: false,
        //     min: 0,
        //     max: 100,
        //     x: 'left',
        //     y: 'bottom',
        //     text: ['高', '低'],
        //     calculable: true,
        //     color: ['#4EFFF1', '#246E88']
        //   },
        //   series: [
        //     {
        //       name: 'iphone',
        //       type: 'map',
        //       mapType: 'china',
        //       itemStyle: {
        //         normal: {label: {
        //           show: false
        //         }}
        //       },
        //       data: _this.map
        //     }
        //   ]
        // }
        _this.$refs.echarts.init()
      },
      initHideChart () {
        var _this = this
        var mapName = 'china'
        optionHide = {
          dataRange: {
            show: false,
            min: 0,
            max: 100,
            x: 'left',
            y: 'bottom',
            text: ['高', '低'],
            calculable: true,
            color: ['#246E88', '#4EFFF1']
          },
          geo: {
            show: true,
            map: mapName,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#151515',
                borderColor: '#385f98',
                shadowColor: '#385f98',
                shadowBlur: 4
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            }
          },
          series: [{
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.95,
            showLegendSymbol: false,
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              }
            },
            animation: false,
            data: this.map
          }]
        }
        _this.$refs.echartsHide.init()
      },
      getUniversityMap () {
        var _this = this
        var val = _this.university
        _this.topName = []
        _this.topVal = []
        const req = {
          university: val
        }
        getMapData(req).then(res => {
          _this.map = res.data.list
          _this.pCount = res.data.list.length
          if (_this.pCount >= 5) {
            for (var i = 0; i < 5; i++) {
              _this.topName.push(_this.map[i].name)
              _this.topVal.push(_this.map[i].value)
            }
          } else {
            for (var j = 0; j < _this.pCount; j++) {
              _this.topName.push(_this.map[j].name)
              _this.topVal.push(_this.map[j].value)
            }
          }
          _this.initChart()
          // _this.initChartBar()
          _this.initHideChart()
        })
      },
      getStudentCount () {
        var _this = this
        var val = _this.university
        const req = {
          university: val
        }
        getUserAndLocation(req).then(res => {
          _this.userCount = res.data.userCount
          _this.locationCount = res.data.locationCount
          if (_this.locationCount < 2) {
            _this.proverb = '寥若晨星'
          } else if (_this.locationCount < 10) {
            _this.proverb = '寥寥可数'
          } else if (_this.locationCount < 20) {
            _this.proverb = '风流云散'
          } else if (_this.locationCount < 30) {
            _this.proverb = '百川归海'
          } else if (_this.locationCount < 50) {
            _this.proverb = '星罗棋布'
          } else if (_this.locationCount < 90) {
            _this.proverb = '浩如烟海'
          } else if (_this.locationCount < 150) {
            _this.proverb = '不计其数'
          } else if (_this.locationCount < 250) {
            _this.proverb = '人才辈出'
          } else if (_this.locationCount < 500) {
            _this.proverb = '四海八荒'
          }
        })
      },
      saveImg () {
        var _this = this
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 1100,
          height: 776,
          destWidth: 1100,
          destHeight: 776,
          canvasId: 'hide-canvas',
          success: function (res) {
            _this.drawImg(res.tempFilePath)
          }
        })
      },
      drawImg (url) {
        var _this = this
        wx.showLoading({
          title: '图片生成中'
        })
        wx.getImageInfo({
          src: url,
          success: function (res) {
            _this.drawPath(res.path)
          }
        })
      },
      drawPath (path) {
        var _this = this
        wx.getImageInfo({
          src: 'https://wechat.xkboke.com/static/img/share-img.jpg',
          success: function (res) {
            const random = (parseInt(9 * Math.random() + 90))
            const ctx = wx.createCanvasContext('shareCanvas')
            // 绘制背景
            ctx.drawImage(res.path, 0, 0, 900, 1766)
            // 绘制昵称
            ctx.setTextAlign('center')
            ctx.setFillStyle('#49EAE5')
            ctx.setFontSize(50)
            ctx.fillText(_this.nickName, 900 / 2, 198, 500)
            // 绘制详细信息
            ctx.setTextAlign('left')
            ctx.setFillStyle('#FFFFFF')
            ctx.setFontSize(40)
            ctx.fillText('您的校友遍布全国', 118, 300)

            ctx.setFillStyle('#49EAE5')
            ctx.setFontSize(40)
            ctx.fillText(_this.pCount, 450, 300)

            ctx.setFillStyle('#FFFFFF')
            ctx.setFontSize(40)
            ctx.fillText('个省区，', 490, 300)

            ctx.setFillStyle('#49EAE5')
            ctx.setFontSize(40)
            ctx.fillText(_this.locationCount, 630, 300)

            ctx.setFillStyle('#FFFFFF')
            ctx.setFontSize(40)
            ctx.fillText('个城市！', 670, 300)
            // 绘制超过多少比例
            ctx.setTextAlign('center')
            ctx.setFillStyle('#FFFFFF')
            ctx.setFontSize(40)
            const str1 = '校友足迹超过' + random + '%的学校'
            ctx.fillText(str1, 900 / 2, 410)
            // 绘制谚语
            ctx.setTextAlign('center')
            ctx.setFillStyle('#49EAE5')
            ctx.setFontSize(60)
            ctx.fillText('“' + _this.proverb + '”', 900 / 2, 520)
            const mapWidth = 1100
            const mapHeight = 776
            ctx.drawImage(path, -100, 545, mapWidth, mapHeight)
            // 绘制排名
            if (_this.topName[0]) {
              ctx.setTextAlign('center')
              ctx.setFillStyle('#FFFFFF')
              ctx.setShadow(1, 1, 5, '#027fff')
              ctx.setFontSize(40)
              ctx.fillText('Top1 ' + _this.topName[0] + ' ' + _this.topVal[0] + '人', 900 / 2, 1361)
            }
            if (_this.topName[1]) {
              ctx.setTextAlign('center')
              ctx.setFillStyle('#FFFFFF')
              ctx.setShadow(1, 1, 5, '#027fff')
              ctx.setFontSize(35)
              ctx.fillText('Top2 ' + _this.topName[1] + ' ' + _this.topVal[1] + '人', 900 / 2, 1416)
            }
            if (_this.topName[2]) {
              ctx.setTextAlign('center')
              ctx.setFillStyle('#FFFFFF')
              ctx.setShadow(1, 1, 5, '#027fff')
              ctx.setFontSize(30)
              ctx.fillText('Top3 ' + _this.topName[2] + ' ' + _this.topVal[2] + '人', 900 / 2, 1471)
            }
            ctx.draw()
            setTimeout(function () {
              wx.canvasToTempFilePath({
                canvasId: 'shareCanvas',
                success: function (res) {
                  wx.hideLoading()
                  let tempFilePath = res.tempFilePath
                  wx.saveImageToPhotosAlbum({
                    filePath: tempFilePath,
                    success: function () {
                      wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000
                      })
                    }
                  })
                },
                fail: function () {
                  console.log('保存失败')
                }
              })
            }, 500)
          },
          fail: function () {
            console.log('图片获取失败')
          }
        })
      }
    }
  }
</script>
<style>
  @keyframes rate {
    from {
      transform:perspective(400px) rotateY(0deg)
    }
    to {
      transform:perspective(400px) rotateY(360deg)
    }
  }
  @-webkit-keyframes rate {
    from {transform:perspective(400px) rotateY(0deg)}
    to {transform:perspective(400px) rotateY(360deg)}
  }
</style>

<style lang="stylus" scoped>
  .school-name{
    color: footColor;
    font-weight: bold;
    margin-bottom: 20rpx;
    font-size 36rpx
  }
  .proverb{
    margin-top 40rpx
    color: footColor;
    font-size: 40rpx;
    text-align center
  }
  .city-count{
    color: footColor;
  }
  .chartMain{
    position: fixed;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    /*background-image: url("http://image.bloggeng.com/20190104112037.png");*/
    background-image: url("https://wechat.xkboke.com/static/img/chart_bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .echarts-wrap {
    margin-top 86rpx
    width: 100%;
    height: 500rpx;
    padding: 4rpx 4rpx;
    /*animation: rate 10s ease-in-out infinite;*/
    margin-bottom 40rpx
  }
  .echarts-bar{
    width: 95%;
    height: 480rpx;
    padding: 4rpx 4rpx;
  }
  .top-location{
      text-align center
      color #ffffff
      font-weight bold
      text-shadow:1px 1px 5px footColor
    }
  .top1{
    font-size 40rpx
  }
  .top2{
    font-size 35rpx
  }
  .top3
    font-size 30rpx
  .title{
    margin-top: 20rpx;
    text-align: center;
  }
  .detail{
    text-align: center;
    font-size: 28rpx;
    color: whiteColor;
  }
  .sixedge-share{
    margin 0
    padding 0
    font-size 24rpx
    border-radius 0
    overflow: visible
    height: 86.6rpx;
    line-height 88.6rpx
    text-align center
    color footColor
    width: 50rpx;
    position:absolute!important;
    background-color: rgba(16,82,110,0.8);
    border-top:2rpx solid footColor;
    border-bottom:2rpx solid footColor;
    right 50rpx
    bottom 244rpx
    box-sizing border-box!important
  }
  .sixedge-share:after{
    border-radius 0
    content: '';
    width: 50rpx;
    height: 86.6rpx;
    position: absolute!important;
    background-color: rgba(16,82,110,0.8);
    top: -1rpx;
    left: 50rpx;
    transform: translate(-50%,-50%)!important;
    transform: rotate(60deg)!important;
    border-top: 2rpx solid footColor;
    border-bottom: 2rpx solid footColor;
    z-index -1
    box-sizing border-box
  }
  .sixedge-share:before{
    content: '';
    width: 50rpx;
    height: 86.6rpx;
    position: absolute!important;
    background-color: rgba(16,82,110,0.8)
    top: -1rpx;
    right: 0rpx;
    transform: translate(-50%,-50%);
    transform: rotate(300deg);
    border-bottom: 2rpx solid footColor;
    border-top: 2rpx solid footColor;
    z-index -1
    box-sizing border-box
  }
  .downLoad{
    right 50rpx!important
    bottom 153.4rpx!important
  }
  .say{
    right 128rpx!important
    bottom 106.4rpx!important
  }
  .shareImg{
    width: 900px;
    height: 1766px;
    position: fixed;
    left: -500%;
  }
  .echarts-hide{
    width: 1100px;
    height: 776px;
    position: fixed;
    right: -300%;
  }
  .hover{
    background-color: footColor;
  }
</style>
