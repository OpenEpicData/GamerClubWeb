<template>
  <div>
    <div class="white">
      <v-container hidden-sm-and-down>
        <v-layout row wrap class="py-5">
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
    <div>
      <v-container grid-list-sm>
        <div class="hidden-sm-and-down">
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
            <v-card :to="'/apps/' + item.AppID">
              <v-card-media
                :src="'https://steamcdn-a.opskins.media/steam/apps/' + item.AppID + '/header.jpg'"
                height="200px"
              >
              <v-container
                fill-height
                fluid
                pa-2
              >
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox class="text-xs-right">
                    <v-btn dark color="deep-purple lighten-1" v-if="item.AppsTypes.DisplayName === 'Game'"><v-icon left class="mt-1">games</v-icon> 游戏 </v-btn>
                    <v-btn color="info" v-if="item.AppsTypes.DisplayName === 'Tool'"><v-icon left class="mt-1">build</v-icon> 工具 </v-btn>
                    <v-btn color="info" v-if="item.AppsTypes.DisplayName === 'Video'"><v-icon left class="mt-1">videocam</v-icon> 影音 </v-btn>
                    <v-btn color="info" v-if="item.AppsTypes.DisplayName === 'Application'"><v-icon left class="mt-1">apps</v-icon> 应用 </v-btn>
                    <v-btn color="info" v-if="item.AppsTypes.DisplayName === 'Demo'"><v-icon left class="mt-1">play_circle_outline</v-icon> 试玩版 </v-btn>
                    <v-btn color="info" v-if="item.AppsTypes.DisplayName === 'DLC'"><v-icon left class="mt-1">playlist_add</v-icon> 扩充包 </v-btn>
                    <v-btn color="info" v-if="item.AppsTypes.DisplayName === 'Hardware'"><v-icon left class="mt-1">computer</v-icon> 硬件 </v-btn>
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
                </div>
              </v-card-title>

            </v-card>
          </v-flex>
          <v-flex xs6 class="mb-5">
            <div class="text-xs-left" v-if="page !== 1">
              <v-btn large round outline v-on:click="fetchPage(page - 1)"> 上一页 {{ page - 1 }}</v-btn>
            </div>
          </v-flex>
          <v-flex xs6 class="mb-5">
            <div class="text-xs-right" v-if="page !== list.total">
              <v-btn large round outline v-on:click="fetchPage(page + 1)"> 下一页 {{ page + 1 }}</v-btn>
            </div>
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

  export default {
    async asyncData () {
      return axios.get(`http://localhost:3333/api/v1/steam/apps`, {
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
      feature: ''
    }),
    methods: {
      carouselTo: function (id) {
        this.$router.push({path: '/apps/' + id})
      },
      fetchPage: function (page) {
        this.$vuetify.goTo('#today', 'easyInQuad')
        return axios.get(`http://localhost:3333/api/v1/steam/apps?page=` + page, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
          .then(response => {
            this.list = response.data
            this.page = page++
            this.price = ''
          })
      }
    },
    created: function () {
      const Today = new Date()
      this.month = Today.getMonth() + 1
      this.day = Today.getDate()
      axios.get(`http://localhost:3333/api/v1/steam/app/store/update/queues`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => {
          this.queue = response.data.total
        })
      axios.get(`http://localhost:3333/api/v1/steam/game/features`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => {
          this.feature = response.data.specials.items
        })
    },
    watch: {
      dialog2 (val) {
        if (!val) return
        setTimeout(() => (this.dialog2 = false), 1000)
      }
    }
  }
</script>