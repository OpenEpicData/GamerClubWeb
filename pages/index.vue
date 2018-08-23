<template>
  <div>
    <PageHeader :headerText.sync="headerText"></PageHeader>
    <div class="grey lighten-4">
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="hidden-sm-and-down">
          <v-progress-linear indeterminate color="blue" class="mb-0" :height="carouselLoading"></v-progress-linear>
          {{ feature.error }}
          <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="item in feature" :key="item.id" class="text-xs-center">
              <img :src="item.large_capsule_image" alt="" v-on:click="carouselTo(item.id)">
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="page-main">
          <v-layout row wrap id="today">
            <v-flex xs8>
              <v-btn color="deep-purple lighten-1" dark>
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

          <v-layout row wrap class="mt-3" id="GameList">
            <GameListCard :list.sync="list"></GameListCard>
            <v-flex d-flex lg3>
              <v-layout row wrap hidden-md-and-down>
                <v-flex d-flex>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-card color="deep-purple lighten-1 mb-5" flat dark>
                        <v-card-title primary-title>
                          <div>
                            <h4 class="headline mb-0"><v-icon left>edit</v-icon> 加入创作挑战</h4>
                          </div>
                        </v-card-title>
                        <v-card-text>
                          <span>是时候投票选出你最喜欢的文章了</span>
                        </v-card-text>
                        <v-card-actions class="ml-1 pb-3">
                          <v-btn color="white" class="black--text">
                            立即开始
                          </v-btn>
                        </v-card-actions>
                      </v-card>

                      <v-card color="grey lighten-5" flat>
                        <v-card-title primary-title>
                          <div>
                            <h4 class="headline mb-0"><v-icon left>attach_money</v-icon> 成为赞助商 <v-icon right>chevron_right</v-icon></h4>
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
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: transparent;
  }
</style>

<script>
  import GameListCard from '~/components/GameListCard'
  import PageHeader from '~/components/PageHeader'
  import axios from 'axios'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import dayjs from 'dayjs'

  import 'dayjs/locale/zh-cn'
  dayjs.extend(relativeTime)
  
  export default {
    components: {
      GameListCard,
      PageHeader
    },
    async asyncData () {
      return axios.get(`https://api.steamhub.cn/api/v1/steam/apps?page=1`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(function (response) {
          return { list: response.data, page: response.data.page }
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
        title: `全球 Steam 数据统计分析 By SteamHub`,
        descript: `SteamHub 是一个全球 Steam 的数据统计社区,每天为开发者和玩家提供实时的 价格,资讯 数据查询 `,
        button: `立即加入`,
        dialog: {
          text: `功能开发中`,
          progressBar: {
            height: `6`
          }
        }
      }
    }),
    methods: {
      carouselTo: function (id) {
        this.$router.push({path: '/apps/' + id})
      }
    },
    created: function () {
      const Today = new Date()
      this.month = Today.getMonth() + 1
      this.day = Today.getDate()
      axios.get(`https://api.steamhub.cn/api/v1/steam/app/store/update/queues`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => {
          this.queue = response.data.total
        })
      axios.get(`https://api.steamhub.cn/api/v1/steam/game/features`, {
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
    }
  }
</script>