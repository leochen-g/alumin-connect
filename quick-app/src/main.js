import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/search/main', 'pages/charts/main', 'pages/topic/main', 'pages/user/main', 'pages/user-edit/main', 'pages/user-topic/main', 'pages/user-message/main', 'pages/user-info-card/main', 'pages/topic-detail/main', 'pages/user-setting/main', 'pages/about-alumni/main', 'pages/about-auth/main', 'pages/system-message-detail/main'],
    permission: {'scope.userLocation': {'desc': '您的位置将用于显示当前城市校友的话题'}},
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: '校友来了',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      'selectedColor': '#027fff',
      'backgroundColor': '#ffffff',
      'list': [
        {
          'pagePath': 'pages/index/main',
          'text': '校友足迹',
          'iconPath': '/static/img/foot.png',
          'selectedIconPath': '/static/img/foot-active.png'
        },
        {
          'pagePath': 'pages/topic/main',
          'text': '校友圈子',
          'iconPath': '/static/img/topic.png',
          'selectedIconPath': '/static/img/topic-active.png'
        },
        {
          'pagePath': 'pages/user/main',
          'text': '个人中心',
          'iconPath': '/static/img/user.png',
          'selectedIconPath': '/static/img/user-active.png'
        }
      ]
    },
    plugins: {
      'wxparserPlugin': {
        'version': '0.2.1',
        'provider': 'wx9d4d4ffa781ff3ac'
      }
    }
  }
}
