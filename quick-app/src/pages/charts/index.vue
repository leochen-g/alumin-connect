<template>
  <div class="echarts-wrap">
    <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
  </div>
</template>

<script>
  import echarts from 'echarts'
  import mpvueEcharts from 'mpvue-echarts'
  require('echarts/map/js/china')
  let chart = null

  function initChart (canvas, width, height) {
    chart = echarts.init(canvas, null, {
      width: width,
      height: height
    })
    canvas.setChart(chart)
    var nameTitle = '复旦大学校友分布图'
    var nameColor = '#000'
    var nameFontFamily = '等线'
    var nameFontSize = 18
    var mapName = 'china'
    var data = [
      {name: '北京', value: 77},
      {name: '上海', value: 42},
      {name: '安徽', value: 109},
      {name: '福建', value: 116},
      {name: '江西', value: 91},
      {name: '山东', value: 119},
      {name: '河南', value: 137},
      {name: '湖北', value: 116},
      {name: '湖南', value: 114},
      {name: '重庆', value: 91},
      {name: '四川', value: 125},
      {name: '贵州', value: 62},
      {name: '云南', value: 83},
      {name: '西藏', value: 9},
      {name: '陕西', value: 80},
      {name: '甘肃', value: 56},
      {name: '青海', value: 10},
      {name: '宁夏', value: 18},
      {name: '新疆', value: 67},
      {name: '广东', value: 123},
      {name: '广西', value: 59},
      {name: '海南', value: 14}
    ]

    var geoCoordMap = {}

    chart.showLoading()
    var mapFeatures = echarts.getMap(mapName).geoJson.features
    chart.hideLoading()
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
      console.log('res', res)
      return res
    }
    var option = {
      title: {
        text: nameTitle,
        x: 'center',
        textStyle: {
          color: nameColor,
          fontFamily: nameFontFamily,
          fontSize: nameFontSize
        }
      },
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
        data: convertData(data),
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
        data: data
      }
      ]
    } // ECharts 配置项

    chart.setOption(option)

    return chart // 返回 chart 后可以自动绑定触摸操作
  }

  export default {
    components: {
      mpvueEcharts
    },
    data () {
      return {
        echarts,
        onInit: initChart
      }
    }
  }
</script>

<style scoped>
  .echarts-wrap {
    width: 100%;
    height: 300px
  }
</style>
