<template>
  <div>
    <div>
      <v-container hidden-sm-and-down>
        <v-layout row wrap class="pb-5">
          <v-flex xs10>
            <div class="text-xs-left">
              <h1 class="display-2 font-weight-bold">全球 Steam 数据统计分析 By SteamHub</h1>
              <h3 class="mt-3 font-weight-regular grey--text">
                SteamHub 是一个全球 Steam 的数据统计社区,每天为开发者和玩家提供实时的 价格,资讯 数据查询
              </h3>
            </div>
          </v-flex>
          <v-flex xs2>
            <div class="text-xs-right">
              <v-btn large color="primary" round dark :loading="dialog2" @click.stop="dialog2 = true">
                立即加入</v-btn>
            </div>
          </v-flex>
          <v-dialog v-model="dialog2" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                功能开发中
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-container>
    </div>
    <div class="grey lighten-4">
      <v-container grid-list-sm>
        <div class="hidden-sm-and-down">
          <v-progress-linear indeterminate color="blue" class="mb-0" :height="carouselLoading"></v-progress-linear>
          <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="item in feature" :key="item.id" class="text-xs-center">
              <img :src="item.large_capsule_image" alt="" v-on:click="carouselTo(item.id)">
            </el-carousel-item>
          </el-carousel>
        </div>
        <v-layout row wrap id="today">
          <v-flex xs8>
            <v-btn color="deep-purple lighten-1" dark>
              <v-icon left class="mt-1">blur_on</v-icon>趋势
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
        <v-layout row wrap class="mt-3">
          <v-flex xs12 sm6 md6 lg4 xl3 v-for="(item,i) in list.data" :key="i">
            <v-card :to="'/apps/' + item.AppID" v-if="item.AppType">
              <v-card-media :src="'https://steamcdn-a.opskins.media/steam/apps/' + item.AppID + '/header.jpg'" height="200px">
                <v-container fill-height fluid pa-2>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox class="text-xs-right" v-if="item.AppsTypes">
                      <v-btn dark color="deep-purple lighten-1">
                        <v-icon left class="mt-1">{{ item.AppsTypes.DisplayName | typeIcon }}</v-icon> {{ item.AppsTypes.DisplayName | typeName }} </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">
                    <v-chip>
                      {{ item.AppID }}
                    </v-chip>
                    <v-btn>
                      {{ item.Name.slice(0, 20) }}
                    </v-btn>
                  </h3>
                  <h5 class="ml-3">更新于: {{ item.LastUpdated | time }}</h5>
                </div>
              </v-card-title>

            </v-card>
            <v-card v-else>
              <v-card-media :src="'/unknow.jpg'" height="200px">
                <v-container fill-height fluid pa-2>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox class="text-xs-right">
                        <v-btn dark color="red">
                          <v-icon left class="mt-1">device_unknown</v-icon> 未知 </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
              </v-card-media>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">
                    <v-chip>
                      {{ item.AppID }}
                    </v-chip>
                    <v-btn>
                      未知应用
                    </v-btn>
                  </h3>
                  <h5 class="ml-3">更新于: {{ item.LastUpdated | time }}</h5>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>

      </v-container>
    </div>
  </div>
</template>

<style>
  .el-carousel__item:nth-child(2n) {
    background-color: transparent
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: transparent
  }
</style>

<script>
  import axios from 'axios'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import dayjs from 'dayjs'

  import 'dayjs/locale/zh-cn'
  dayjs.extend(relativeTime)
  
  export default {
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
      dialog2: false,
      price: '',
      step: '0',
      isPrice: '',
      queue: '',
      feature: '',
      carouselLoading: 6
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
    },
    watch: {
      dialog2 (val) {
        if (!val) return
        setTimeout(() => (this.dialog2 = false), 1000)
      }
    },
    filters: {
      time: function (value) {
        return dayjs().locale('zh-cn').from(dayjs(value))
      },
      typeName: function (value) {
        switch (value) {
          case 'Game':
            return '游戏'
          case 'Tool':
            return '工具'
          case 'Video':
            return '影音'
          case 'Application':
            return '应用'
          case 'Demo':
            return '试玩版'
          case 'DLC':
            return '扩充包'
          case 'Hardware':
            return '硬件'
          default:
            return '未知'
        }
      },
      typeIcon: function (value) {
        switch (value) {
          case 'Game':
            return 'games'
          case 'Tool':
            return 'build'
          case 'Video':
            return 'videocam'
          case 'Application':
            return 'apps'
          case 'Demo':
            return 'play_circle_outline'
          case 'DLC':
            return 'playlist_add'
          case 'Hardware':
            return 'computer'
          default:
            return 'device_unknown'
        }
      }
    }
  }
</script>