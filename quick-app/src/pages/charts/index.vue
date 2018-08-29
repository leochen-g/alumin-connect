<template>
  <div class="container">
    <div class="chartMain">
      <div class="title">
        <p class="school-name" :animation="animationData">{{university}}</p>
        <p class="detail">你的<span class="city-count">{{userCount}}</span>名校友遍布全国<span class="city-count">{{pCount}}</span>个省区,<span class="city-count">{{locationCount}}</span>个城市</p>
      </div>
      <div class="echarts-wrap">
        <mpvue-echarts lazyLoad :echarts="echarts"  :onInit="initMap" disableTouch=true ref="echarts" canvasId="demo-canvas" />
      </div>
      <div class="echarts-bar">
        <mpvue-echarts lazyLoad=false :echarts="echarts"  :onInit="initBar" disableTouch=true ref="echartsBar" canvasId="canvas-bar" />
      </div>
      <div class="floatBtn">
        <div><button hover-class="hover" open-type="share"  class="btn shareBtn"><i class="iconfont shareIcon" style="font-size: 28rpx">&#xe607;</i></button></div>
        <div><button hover-class="hover" @click ='saveImg'  class="btn downImg"><i class="iconfont shareIcon" style="font-size: 28rpx">&#xe679;</i></button></div>
        <div><button hover-class="hover" open-type="feedback" class="btn downImg"><i class="iconfont shareIcon" style="font-size: 28rpx">&#xe631;</i></button></div>
      </div>
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
  require('echarts/map/js/china')
  let chart = null
  let chartBar = null
  let chartHide = null
  let option = null
  let optionBar = null
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
  function handleInitBarChart (canvas, width, height) {
    chartBar = echarts.init(canvas, null, {
      width: width,
      height: height
    })
    canvas.setChart(chartBar)
    chartBar.setOption(optionBar)
    return chartBar // 返回 chart 后可以自动绑定触摸操作
  }
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
        initBar: handleInitBarChart,
        initHide: handleInitHideChart,
        map: [],
        pCount: 0,
        topName: [],
        topVal: [],
        locationCount: '',
        userCount: ''
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
      initChartBar () {
        var _this = this
        optionBar = {
          title: {
            text: 'TOP5 省份',
            textStyle: {
              fontSize: 13,
              color: '#ffffff'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            splitLine: false,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#ffffff',
                width: 1
              }
            }
          },
          yAxis: {
            type: 'category',
            data: this.topName,
            boundaryGap: [0, 0.01],
            splitLine: false,
            nameTextStyle: {
              color: ['#ffffff']
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          },
          series: [
            {
              type: 'bar',
              label: {
                show: true,
                position: 'insideTop'
              },
              barWidth: 20,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#49EAE5'},
                      {offset: 1, color: '#49EAE5'}
                    ]
                  )
                }
              },
              data: this.topVal
            }
          ]
        }
        _this.$refs.echartsBar.init()
      },
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
                areaColor: '#09283c',
                borderColor: '#FFFFFF'
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
                areaColor: '#09283c',
                borderColor: '#FFFFFF'
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
        wx.request({
          url: _this.GLOBAL.serverPath + '/api/user/getMapData',
          method: 'GET',
          data: {
            university: val
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            _this.map = res.data.data.list
            _this.pCount = res.data.data.list.length
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
            _this.initChartBar()
            _this.initHideChart()
            // _this.locationCity = res.data.data[1]
          }
        })
      },
      getStudentCount () {
        var _this = this
        var val = _this.university
        wx.request({
          url: _this.GLOBAL.serverPath + '/api/user/getUserAndLocation',
          method: 'GET',
          data: {
            university: val
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res)
            _this.userCount = res.data.data.userCount
            _this.locationCount = res.data.data.locationCount
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
          src: 'https://alumni.xkboke.com/static/img/wechat_bg.jpg',
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
            let proverb = ''
            if (_this.locationCount < 2) {
              proverb = '寥若晨星'
            } else if (_this.locationCount < 10) {
              proverb = '寥寥可数'
            } else if (_this.locationCount < 20) {
              proverb = '风流云散'
            } else if (_this.locationCount < 30) {
              proverb = '百川归海'
            } else if (_this.locationCount < 50) {
              proverb = '星罗棋布'
            } else if (_this.locationCount < 90) {
              proverb = '浩如烟海'
            } else if (_this.locationCount < 150) {
              proverb = '不计其数'
            } else if (_this.locationCount < 250) {
              proverb = '人才辈出'
            } else if (_this.locationCount < 400) {
              proverb = '四海八荒'
            }
            ctx.fillText('“' + proverb + '”', 900 / 2, 520)
            const mapWidth = 1100
            const mapHeight = 776
            ctx.drawImage(path, -100, 545, mapWidth, mapHeight)
            ctx.draw()
            setTimeout(function () {
              wx.canvasToTempFilePath({
                canvasId: 'shareCanvas',
                success: function (res) {
                  wx.hideLoading()
                  let tempFilePath = res.tempFilePath
                  wx.saveImageToPhotosAlbum({
                    filePath: tempFilePath
                  })
                },
                fail: function (res) {
                  console.log('生成错误', res)
                }
              })
            }, 500)
          }
        })
      },
      feedBack () {
        wx.navigateTo({
          url: '../feedback/main'
        })
      }
    }
  }
</script>

<style scoped>
  .school-name{
    color: #49EAE5;
    font-weight: bold;
    margin-bottom: 20rpx;
  }
  .city-count{
    color: #49EAE5;
  }
  .chartMain{
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-image: url("https://lg-me0h2lia-1256919187.cos.ap-shanghai.myqcloud.com/bg10.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .echarts-wrap {
    width: 95%;
    height: 480rpx;
    padding: 4rpx 4rpx;
  }
  .echarts-bar{
    width: 95%;
    height: 480rpx;
    padding: 4rpx 4rpx;
  }
  .title{
    margin-top: 20rpx;
    text-align: center;
    color: #5687e7;
  }
  .detail{
    text-align: center;
    font-size: 28rpx;
    color: #ffffff;
  }
  .floatBtn{
    position: absolute;
    bottom: 35%;
    right: 5%;
  }
  .btn{
    padding: 5rpx 5rpx;
    width: 80rpx;
    height: 80rpx;
    display: block;
    border-color: #ffffff;
    float: left;
    color: #ffffff;
    border-radius:80rpx;
    background-color: #49EAE5;
    margin-bottom: 20rpx;
  }
  .shareBtn{

  }
  .downImg{

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
    background-color: #8EEAE7;
  }
</style>
