<template>
  <div class="container">
    <div class="title">
      <p class="school-name">{{schoolName}}</p>
      <p>校友分布图</p>
    </div>
    <div class="echarts-wrap">
    <mpvue-echarts lazyLoad :echarts="echarts" :onInit="handleInitChart" ref="echarts" canvasId="demo-canvas" />
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import mpvueEcharts from 'mpvue-echarts'
  require('echarts/map/js/china')
  let chart = null
  export default {
    components: {
      mpvueEcharts
    },
    data () {
      return {
        echarts,
        option: null,
        map: [],
        schoolName: ''
      }
    },
    onShareAppMessage (options) {
      console.log(options)
      return {
        title: '快来看看你的校友在哪里？',
        path: '',
        success: function (res) {
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
              color: ['#FFE53B', '#FF2525']
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
                color: '#05C3F9'
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
            _this.initChart()
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
  .echarts-wrap {
    width: 100%;
    height: 300px
  }
  .title{
    text-align: center;
    color:#FF9800
  }
</style>
