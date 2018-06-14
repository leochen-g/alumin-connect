<template>
  <div class="mvpue-picker">
    <div class="page-hd">
      <div class="page-title">mvpue-picker 示例</div>
      <div class="page__desc">选中的值:</div>
      <div class="picker-text">{{pickerText}}</div>
    </div>
    <div class="page-bd">
      <button type="default" @click="showMulLinkageTwoPicker">二级联动选择</button>
    </div>
    <mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength=deepLength :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @pickerCancel="pickerCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
  </div>
</template>

<script>
  import mpvuePicker from 'mpvue-picker'
  export default {
    components: {
      mpvuePicker
    },
    data () {
      return {
        mode: 'selector',
        deepLength: 0, // 几级联动
        pickerValueDefault: [], // 初始化值
        pickerValueArray: [], // picker 数组值
        pickerText: '',
        mulLinkageTwoPicker: [
          {
            label: '上海',
            value: 0,
            children: [{
              label: '上海',
              value: 1
            }
            ]
          },
          {
            label: '安徽',
            value: 1,
            children: [{
              label: '阜阳',
              value: 1
            }, {label: '安庆', value: 2}, {label: '合肥', value: 3}
            ]
          },
          {
            label: '江苏',
            value: 3,
            children: [{
              label: '镇江',
              value: 1
            }, {label: '无锡', value: 2}
            ]
          }
        ]
      }
    },
    methods: {
      onChange (e) {
        console.log(e)
      },
      // 二级联动选择
      showMulLinkageTwoPicker () {
        this.pickerValueArray = this.mulLinkageTwoPicker
        this.mode = 'multiLinkageSelector'
        this.deepLength = 2
        this.pickerValueDefault = [1, 0]
        this.$refs.mpvuePicker.show()
      },
      showPickerView () {
        this.$refs.mpvuePicker.show()
      },
      onConfirm (e) {
        this.pickerText = `${this.pickerValueArray[e[0]].label} - ${this.pickerValueArray[e[0]].children[e[1]].label}`
        console.log(e)
      }
    }
  }
</script>

<style>
  .page-hd {
    padding: 40px
  }
  .page-bd {
    padding: 15px
  }
  .picker-text,
  .page__desc {
    margin-top: 10px
  }
  button {
    margin-top: 15px
  }
</style>
