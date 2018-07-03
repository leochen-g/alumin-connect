<template>
  <div class="container">
    <div class="chartMain">
      <div class="title">
        <p class="school-name">{{schoolName}}</p>
        <p class="detail">(你的校友遍布全国{{pCount}}个省份)</p>
      </div>
      <div class="echarts-wrap">
        <mpvue-echarts lazyLoad :echarts="echarts"  :onInit="handleInitChart" ref="echarts" canvasId="demo-canvas" />
      </div>
      <div class="echarts-bar">
      <mpvue-echarts lazyLoad :echarts="echarts"  :onInit="handleInitBarChart" ref="echartsBar" throttleTouch canvasId="canvas-bar" />
    </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import mpvueEcharts from 'mpvue-echarts'
  require('echarts/map/js/china')
  let chart = null
  let chartBar = null
  export default {
    components: {
      mpvueEcharts
    },
    data () {
      return {
        echarts,
        option: null,
        optionBar: null,
        map: [],
        schoolName: '',
        pCount: 0,
        topName: [],
        topVal: []
      }
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
    methods: {
      handleInitChart (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(chart)
        chart.setOption(this.option)
        return chart // 返回 chart 后可以自动绑定触摸操作
      },
      handleInitBarChart (canvas, width, height) {
        chartBar = echarts.init(canvas, null, {
          width: width,
          height: height
        })
        canvas.setChart(chartBar)
        chartBar.setOption(this.optionBar)
        return chartBar // 返回 chart 后可以自动绑定触摸操作
      },
      initChartBar () {
        this.optionBar = {
          title: {
            text: 'TOP5 省份'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.topName
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
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
                      {offset: 0, color: '#66a6ff'},
                      {offset: 1, color: '#89f7fe'}
                    ]
                  )
                }
              },
              data: this.topVal
            }
          ]
        }
        this.$refs.echartsBar.init()
      },
      initChart () {
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
        var convertData = function (data) {
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
        }
        this.option = {
          visualMap: {
            show: true,
            min: 0,
            max: 300,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            calculable: true,
            seriesIndex: [1],
            inRange: {
              color: ['#89f7fe', '#66a6ff']
            }
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
                areaColor: '#031525',
                borderColor: '#3B5077'
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
            data: convertData(this.map),
            symbolSize: function (val) {
              return val[2] / 10
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: 'blue'
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
        this.$refs.echarts.init()
      },
      getUniversityMap () {
        var val = wx.getStorageSync('university')
        var _this = this
        _this.topName = []
        _this.topVal = []
        wx.request({
          url: this.GLOBAL.serverPath + '/api/user/getMapData',
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
            console.log(_this.topName)
            console.log(_this.topVal)
            _this.initChart()
            _this.initChartBar()
            // _this.locationCity = res.data.data[1]
          }
        })
      }
    },
    mounted () {
      this.schoolName = wx.getStorageSync('university')
      this.getUniversityMap()
    },
    created () {
    }
  }
</script>

<style scoped>
  .chartMain{
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .echarts-wrap {
    width: 100%;
    height: 500rpx
  }
  .echarts-bar{
    width: 100%;
    height: 600rpx;
  }
  .title{
    margin-top: 20rpx;
    text-align: center;
    color: #5687e7;
  }
  .detail{
    text-align: center;
    font-size: 20rpx;
    color: #66a6ff;
  }
</style>
