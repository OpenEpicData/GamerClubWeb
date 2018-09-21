<template>
  <div>
    <div class="grey lighten-4">
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="hidden-md-and-down">
          <Carousel :carousel.sync="carousel"></Carousel>
        </div>
        <div class="page-main mt-5">
          <div class="px-2">
            <v-btn color="g-blue-hydrogen" dark class="mx-0">
              <v-icon left>blur_on</v-icon>趋势
            </v-btn>
          </div>
          <v-layout class="px-2 mt-3" row wrap id="today">
            <v-flex xs12 md8>
              <h2>今日
                <v-chip>{{ month }}月{{ day }}日</v-chip>
              </h2>
            </v-flex>
            <v-flex xs12 md4>
              <div class="text-xs-right hidden-sm-and-down">
                <h3>更新队列中的项目: {{ queue }} 个</h3>
              </div>
            </v-flex>
          </v-layout>

          <div class="mt-3">
            <ListGameCard :list.sync="list.data"></ListGameCard>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
  import ListGameCard from '~/components/List/Game/Card/Default'
  import Carousel from '~/components/Carousel/Default'
  import axios from 'axios'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import dayjs from 'dayjs'

  import 'dayjs/locale/zh-cn'
  dayjs.extend(relativeTime)

  export default {
    components: {
      ListGameCard,
      Carousel
    },
    data: () => ({
      queue: Number,
      month: Number,
      day: Number,
      list: String,
      carousel: [
        {
          src: 'https://images4.alphacoders.com/629/629243.jpg',
          left: true,
          title: '神界：原罪 2',
          description: '这是一部备受期待获奖众多的角色扮演游戏的续作。召集你的团队，探讨战术，左右战局。你最多可以和其他三名玩家合作。',
          btn_title: '了解更多',
          color: 'white--text',
          dark: true,
          star: 'IGN 评分: 9.6/10 凭借着令人惊艳的多种重要选择，《神界：原罪2》将成为最伟大的RPG之一。',
          to: '/apps/435150',
          gradient: 'to right, rgba(20,30,48,.5), rgba(36,59,85,.5)'
        },
        {
          src: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE26uIj',
          left: true,
          title: '古墓丽影：暗影',
          description: '劳拉 · 克劳馥一路狂奔，拯救世界免遭玛雅预言中的天灾摧毁，她终将迎接命运，成长为命中注定的古墓侠盗。',
          btn_title: '了解更多',
          star: 'IGN 评分: 9/10 《古墓丽影 暗影》为劳拉·克劳馥的起源三部曲献上了强有力的终章。',
          color: 'white--text',
          dark: true,
          to: '/apps/750920',
          gradient: 'to right, rgba(20,30,48,.5), rgba(36,59,85,.5)'
        },
        {
          src: 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc02EDIiHVva.zlM4YNLDcbGls0XD.tKgCL2Ya_T4MPFLnEDq6KaWYYyOFR_Utg.AEM5Fd8np3bVqJ3x2PGJ7hcUyjRi9JtQTpP.I5.e2A57ztX.Mvzlt7w7pUzJ.M7C5dhiJX.4PrQt7zvKcOrGSNXVKxugEGtiFuf0GElxRuGtk-&h=1080&w=1920&format=jpg',
          left: true,
          title: '城市：天际线',
          description: '设计，建造和管理您的梦想之城，从公共服务到公民政策，挑战自我，从简单的城镇发展成繁华的大都市中心。',
          btn_title: '了解更多',
          color: 'white--text',
          dark: true,
          star: 'IGN 评分: 8.5/10 《城市：天际线》的主题只有一个，那就是建造庞大、喧嚣的城市，而且不需要我们面对各种屠城灾难。',
          to: '/apps/255710',
          gradient: 'to right, rgba(20,30,48,.5), rgba(36,59,85,.5)'
        }
      ]
    }),
    mounted: async function () {
      const Today = new Date()
      this.month = Today.getMonth() + 1
      this.day = Today.getDate()
      let [queue, apps] = await Promise.all([
        axios.get('https://rest.steamhub.cn/api/game/search/app/update_queue/count'),
        axios.get('https://rest.steamhub.cn/api/v2/apps/lists?page=1&param=24')
      ])
      this.queue = queue.data
      this.list = apps.data
    }
  }
</script>