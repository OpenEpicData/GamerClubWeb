<template>
  <div class="mt-5">
    <div class="grey lighten-4">
      <v-container
        fluid
        grid-list-sm
        class="index-main-container"
      >
        <div class="hidden-md-and-down">
          <v-carousel
            delimiter-icon="far fa-circle"
            prev-icon="fas fa-angle-left"
            next-icon="fas fa-angle-right"
          >
            <v-carousel-item
              transition="fade-transition"
              v-for="(item, i) in carousel"
              :key="i"
              :dark="item.dark"
              :light="item.light"
            >
              <v-img
                :src="item.src"
                :lazy-src="'/unknow.jpg'"
                :aspect-ratio="16/9"
                v-bind:class="item.color"
                height="100%"
                width="100%"
                :gradient="item.gradient"
              >
                <v-layout align-center justify-space-around row fill-height>
                  <v-flex xs3 v-if="item.right">
                  </v-flex>
                  <v-flex xs5 sm5 md4 class="mx-3">
                    <h2 class="display-1">{{ item.title }}</h2>
                    <h4 class="subheading my-2">{{ item.description }}</h4>
                    <v-btn :dark="item.dark" :light="item.light" large class="mx-0" :to="item.to">{{ item.btn_title }}</v-btn>
                  </v-flex>
                  <v-flex xs3 v-if="item.left">
                  </v-flex>
                </v-layout>
              </v-img>
            </v-carousel-item>
          </v-carousel>
        </div>

        <div class="page-main mt-5">
          <v-layout
            class="pl-3"
            row
            wrap
            id="today"
          >
            <v-flex xs8>
              <v-btn
                color="blue"
                dark
                class="mx-0"
              >
                <v-icon left>blur_on</v-icon>趋势
              </v-btn>
              <h2 class="mt-3">今日
                <v-chip>{{ month }}月{{ day }}日</v-chip>
              </h2>
              <h4 class="mt-2">记录在案的游戏: {{ list.total }}, 数据采集中...</h4>
            </v-flex>
            <v-flex xs4>
              <div class="text-xs-right mt-3">
                <h3>更新队列中的项目: {{ queue }} 个</h3>
              </div>
            </v-flex>
          </v-layout>

          <v-layout
            row
            wrap
            class="mt-3"
            id="GameList"
          >
            <v-flex lg9>
              <GameListCard :list.sync="list"></GameListCard>
            </v-flex>
            <v-flex
              d-flex
              lg3
            >
              <v-layout
                row
                wrap
                hidden-md-and-down
              >
                <v-flex d-flex>
                  <v-layout
                    row
                    wrap
                  >
                    <v-flex xs12>
                      <v-card
                        color="blue mb-5"
                        flat
                        dark
                      >
                        <v-card-title primary-title>
                          <div>
                            <h4 class="headline mb-0">
                              <v-icon left>edit</v-icon> 加入创作挑战
                            </h4>
                          </div>
                        </v-card-title>
                        <v-card-text>
                          <span>是时候投票选出你最喜欢的文章了</span>
                        </v-card-text>
                        <v-card-actions class="ml-1 pb-3">
                          <v-btn
                            color="white"
                            class="black--text"
                          >
                            立即开始
                          </v-btn>
                        </v-card-actions>
                      </v-card>

                      <v-card
                        color="grey lighten-5"
                        flat
                      >
                        <v-card-title primary-title>
                          <div>
                            <h4 class="headline mb-0">
                              <v-icon left>attach_money</v-icon> 成为赞助商 <v-icon right>chevron_right</v-icon>
                            </h4>
                          </div>
                        </v-card-title>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
      </v-container>
    </div>
  </div>
</template>

<style>
  .el-carousel__item:nth-child(2n) {
    background-color: transparent;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: transparent;
  }
</style>

<script>
import GameListCard from '~/components/GameListCard'
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)

export default {
  components: {
    GameListCard
  },
  async asyncData () {
    return axios
      .get('https://rest.steamhub.cn/api/v2/apps/lists?page=1&param=12')
      .then(function (response) {
        return { list: response.data }
      })
  },
  data: () => ({
    price: '',
    step: '0',
    isPrice: '',
    queue: '',
    feature: '',
    carouselLoading: 6,
    headerText: {
      title: '全球 Steam 数据统计分析 By SteamHub',
      descript:
          'SteamHub 是一个全球 Steam 的数据统计社区,每天为开发者和玩家提供实时的 价格,资讯 数据查询 ',
      button: '使用 API',
      dialog: {
        text: '功能开发中',
        progressBar: {
          height: '6'
        }
      }
    },
    carousel: [
      {
        src: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE26uIj',
        left: true,
        title: '古墓丽影：暗影',
        description: '劳拉 · 克劳馥一路狂奔，拯救世界免遭玛雅预言中的天灾摧毁，她终将迎接命运，成长为命中注定的古墓侠盗。',
        btn_title: '了解更多',
        color: 'white--text',
        light: true,
        to: '/apps/750920'
      },
      {
        src: 'https://cdn.steamstatic.com.8686c.com/steam/apps/513710/ss_a204af58b6de92e3151df4546c1428f9071dda7c.jpg?t=1535642765',
        left: true,
        title: '人渣',
        description: '娱乐巨头 TEC1 公司推出的惊世大作《SCUM》第二季，点燃了全球观众心中嗜血的欲望。',
        btn_title: '了解更多',
        color: 'white--text',
        light: true,
        to: '/apps/513710'
      },
      {
        src: 'https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc02EDIiHVva.zlM4YNLDcbGls0XD.tKgCL2Ya_T4MPFLnEDq6KaWYYyOFR_Utg.AEM5Fd8np3bVqJ3x2PGJ7hcUyjRi9JtQTpP.I5.e2A57ztX.Mvzlt7w7pUzJ.M7C5dhiJX.4PrQt7zvKcOrGSNXVKxugEGtiFuf0GElxRuGtk-&h=1080&w=1920&format=jpg',
        right: true,
        title: '城市：天际线',
        description: '《城市：天际线》是对经典城市模拟类游戏的现代演绎。该游戏引入了全新的游戏玩法元素，让玩家切身体会到创造和维持一座真正城市的兴奋和艰辛，同时扩展了城市建设体验中的一些经久不衰的主题。',
        btn_title: '了解更多',
        color: 'white--text',
        light: true,
        to: '/apps/255710',
        gradient: 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)'
      }
    ]
  }),
  methods: {
    carouselTo: function (id) {
      this.$router.push({ path: '/apps/' + id })
    }
  },
  created: function () {
    const Today = new Date()
    this.month = Today.getMonth() + 1
    this.day = Today.getDate()
    axios
      .get('https://rest.steamhub.cn/api/game/search/app/update_queue/count')
      .then(response => {
        this.queue = response.data
      })
    axios
      .get('https://api.steamhub.cn/api/v1/steam/game/features', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(response => {
        this.feature = response.data.specials.items
        this.carouselLoading = 0
      })
      .catch(e => {
        this.feature.error = '加载出错'
      })
    axios
      .get('https://rest.steamhub.cn/api/game/search/app/list/all/12')
      .then(function (response) {
        return { list: response.data }
      })
  }
}
</script>

<style>
.v-carousel__controls {
  background: transparent
}
.v-carousel__next, .v-carousel__prev {
  margin: 0 1vw
}
.v-carousel__prev .v-btn i, .v-carousel__next .v-btn i {
  color: #f5f5f5 !important;
  font-size: 30px !important;
  margin: 15px 20px
}
.v-carousel {
  box-shadow: none;
  -webkit-box-shadow: none;
}
</style>

