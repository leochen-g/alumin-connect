<template>
  <div class="container">

    <div class="title">
      <p>{{schoolName}}</p>
    </div>
    <div class="echarts-wrap">
    <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
    </div>

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
    var mapName = 'china'
    var data = [
      {name: '北京', value: 77}
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
        onInit: initChart,
        schoolName: '复旦大学'
      }
    },
    method: {

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
</style>
