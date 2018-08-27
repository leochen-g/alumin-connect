<template>
  <div class="container">
    <div class="chartMain">
      <div class="title">
        <p class="school-name">{{university}}</p>
        <p class="detail">你的<span class="city-count">{{userCount}}</span>名校友遍布全国<span class="city-count">{{pCount}}</span>个省区,<span class="city-count">{{locationCount}}</span>个城市</p>
      </div>
      <div class="echarts-wrap">
        <mpvue-echarts lazyLoad :echarts="echarts"  :onInit="initMap" disableTouch=true ref="echarts" canvasId="demo-canvas" />
      </div>
      <div class="echarts-bar">
        <mpvue-echarts lazyLoad=false :echarts="echarts"  :onInit="initBar" disableTouch=true ref="echartsBar" canvasId="canvas-bar" />
      </div>
      <div class="floatBtn">
        <button open-type="share" size="40" class="shareBtn"><i class="iconfont shareIcon">&#xe607;</i></button>
        <button @click ='saveImg' class="shareBtn"><i class="iconfont shareIcon">&#xe607;</i></button>
      </div>
    </div>
    <div class="shareImg">
      <canvas canvas-id="shareCanvas" style="width:600px;height:900px"></canvas>
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
  let option = null
  let optionBar = null
  function handleInitChart (canvas, width, height) {
    chart = echarts.init(canvas, null, {
      width: width,
      height: height
    })
    canvas.setChart(chart)
    chart.setOption(option)
    return chart // 返回 chart 后可以自动绑定触摸操作
  }
  function promisify (f) {
    return function () {
      let args = Array.prototype.slice.call(arguments)
      return new Promise(function (resolve, reject) {
        args.push(function (err, result) {
          if (err) reject(err)
          else resolve(result)
        })
        f.apply(null, args)
      })
    }
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
  export default {
    computed: {
      university () {
        return globalStore.state.university
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
        map: [],
        pCount: 0,
        topName: [],
        topVal: [],
        locationCount: '',
        userCount: ''
      }
    },
    onReady () {
      console.log('准备完成')
    },
    onShareAppMessage (options) {
      console.log(options)
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
            type: 'category',
            data: this.topName,
            axisLine: {
              lineStyle: {
                color: '#ffffff',
                width: 1
              }
            }
          },
          yAxis: {
            type: 'value',
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
                      {offset: 0, color: '#89f7fe'},
                      {offset: 1, color: '#66a6ff'}
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
          // visualMap: {
          //   show: true,
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
          //     color: ['#89f7fe', '#66a6ff']
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
                areaColor: '#FFFFFF',
                borderColor: '#BFBFBF'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            }
          },
          series: [{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: this.convertData(this.map),
            symbolSize: function (val) {
              return val[2] / 10
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true,
                color: '#b3de71',
                fontSize: 8
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#89f7fe'
              }
            }
          },
          {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75,
            showLegendSymbol: false,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: this.map
          }
          ]
        }
        _this.$refs.echarts.init()
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
            console.log(res)
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
          width: 375,
          height: 240,
          destWidth: 375,
          destHeight: 240,
          canvasId: 'demo-canvas',
          success: function (res) {
            console.log(res)
            _this.drawImg(res.tempFilePath)
            // wx.saveImageToPhotosAlbum({
            //   filePath: res.tempFilePath
            // })
          }
        })
      },
      drawImg (url) {
        var _this = this
        const wxGetImageInfo = promisify(wx.getImageInfo)
        Promise.all([
          wxGetImageInfo({
            src: url
          }),
          wxGetImageInfo({
            src: 'https://lg-me0h2lia-1256919187.cos.ap-shanghai.myqcloud.com/bg.jpg'
          })
        ]).then(res => {
          const ctx = wx.createCanvasContext('shareCanvas')
          ctx.drawImage(res[0].path, 0, 0, 375, 736)
          ctx.setTextAlign('center')
          ctx.setFillStyle('#000000')
          ctx.setFontSize(25)
          ctx.fillText(_this.university, 736 / 2, 42)
          ctx.setTextAlign('center')
          ctx.setFillStyle('#000000')
          ctx.setFontSize(25)
          const str = '小K的' + _this.userCount + '名校友遍布全国' + _this.pCount + '个省区，' + _this.locationCount + '个城市！'
          ctx.fillText(str, 736 / 2, 75)
          const mapWidth = 375
          const mapHeight = 240
          ctx.drawImage(res[1].path, 0, 0, mapWidth, mapHeight)
          ctx.stroke()
          ctx.draw()
          _this.outImg()
        })
      },
      outImg () {
        const wxCanvasToTempFilePath = promisify(wx.canvasToTempFilePath)
        const wxSaveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum)
        wxCanvasToTempFilePath({
          canvasId: 'shareCanvas'
        }, this).then(res => {
          return wxSaveImageToPhotosAlbum({
            filePath: res.tempFilePath
          })
        }).then(res => {
          wx.showToast({
            title: '已保存到相册'
          })
        })
      }
    }
  }
</script>

<style scoped>
  .school-name{
    color: #ffffff;
  }
  .city-count{
    color: #5687e7;
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
    background-image: linear-gradient( #041533 0%, #09275b 100%);
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
    font-size: 20rpx;
    color: #ffffff;
  }
  .floatBtn{
    position: fixed;
    bottom: 45%;
    right: 8%;
    border-radius: 80rpx;
  }
  .shareBtn{
    color: #ffffff;
    font-size:18rpx;
    height:80rpx ;
    width: 80rpx;
    background-color: #5687e7;
    border-radius: 80rpx;
    box-shadow: 0 0 22rpx #2F330A;
    opacity: 0.7;
  }
  .shareImg{
    position: absolute;
    left: -100%;
  }
</style>
