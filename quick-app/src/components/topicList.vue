<template>
  <div>
    <topicItem v-for="item in list" :key="item.id" :todo="item">
    </topicItem>
  </div>
</template>

<script>
  import topicItem from './topicItem'
  export default {
    name: 'topic-list',
    components: {topicItem},
    data () {
      return {
        list: [
          {
            'user': {},
            'id': 16,
            'content': '大家好，我是测试生',
            'commentCount': 0,
            'likeCount': 0,
            'updatedAt': '2018-11-29T02:11:36.000Z',
            'location': '上海市',
            'userInfo': {
              'openid': 'oGT8a0UGqr9fcFxAcV3fO-ipgaQw',
              'nickName': '不疯魔不成活',
              'location': '上海市',
              'university': '合肥师范学院',
              'gender': 1,
              'avataUrl': 'https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLCib2x5AHyZpY4Yx8bicYLUCCfOLK1qrYXnxy6biaNdGjXCYV2h1CfBTOOvJv7ibW7loT7NHlnw8yICpw/132',
              'graduationTime': null,
              'college': null,
              'major': null,
              'phone': null,
              'company': null,
              'job': null
            }
          },
          {
            'user': {},
            'id': 33,
            'content': 'hello,every one',
            'commentCount': 6,
            'likeCount': 0,
            'updatedAt': '2018-11-30T10:27:18.000Z',
            'location': '上海市',
            'userInfo': {
              'openid': 'oGT8a0ThGwJOhXcd-eNFC-bl4drQ',
              'nickName': '陈庚',
              'location': '上海市',
              'university': '合肥师范学院',
              'gender': 1,
              'avataUrl': 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKBHKT3OOZULMasVy7qYDMXE9ib1WogqsxwhRiborP8ibcTuibMIdvpBHGHxYA0FoMjXtAlvzphj0BgFQ/132',
              'graduationTime': 2016,
              'college': '计算机学院',
              'major': '物联网工程',
              'phone': '18297987006',
              'company': 'datatist',
              'job': '前端工程师'
            }
          },
          {
            'user': {},
            'id': 34,
            'content': 'hello,every one',
            'commentCount': 0,
            'likeCount': 0,
            'updatedAt': '2018-11-30T09:03:35.000Z',
            'location': '上海市',
            'userInfo': {
              'openid': 'oGT8a0UGqr9fcFxAcV3fO-ipgaQw',
              'nickName': '不疯魔不成活',
              'location': '上海市',
              'university': '合肥师范学院',
              'gender': 1,
              'avataUrl': 'https://wx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLCib2x5AHyZpY4Yx8bicYLUCCfOLK1qrYXnxy6biaNdGjXCYV2h1CfBTOOvJv7ibW7loT7NHlnw8yICpw/132',
              'graduationTime': null,
              'college': null,
              'major': null,
              'phone': null,
              'company': null,
              'job': null
            }
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .alumni-topic{
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: .2rem;
  }
  .shadow{
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  }
  .activity-item{

  }
</style>
