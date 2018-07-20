<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm4>
        <v-overflow-btn :items="dropdown_font" label="类型 暂不可用"></v-overflow-btn>
      </v-flex>

    </v-layout>
    <v-layout row wrap>
      <v-flex xs8>
        <v-btn color="deep-purple lighten-1" dark>
          <v-icon left class="mt-1">search</v-icon>搜索
        </v-btn>
        <h2 class="mt-3">搜索 {{ q }} 的结果:
          <span v-if="isData">共查询到: {{ resultLength }} 条结果</span>
          <span v-else>暂无数据</span>
        </h2>
      </v-flex>
      <v-flex xs4>
        <div class="text-xs-right mt-3">
          <h3>查询数据用时: {{ fecthSearchTime }} 毫秒</h3>
        </div>
      </v-flex>
      <v-progress-linear indeterminate color="blue" class="mb-0" :height="fecthProgressBarHeight"></v-progress-linear>
      <v-flex d-flex xs12 lg12>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm6 md6 lg4 v-for="(item,i) in result.data" :key="i" class="game-list-card px-3">
            <v-card v-if="item.AppType" flat class="grey lighten-4">
              <v-card-media style="cursor:pointer" :src="'https://cdn.steamstatic.com.8686c.com/steam/apps/' + item.AppID + '/header.jpg'"
                height="200px" v-on:click="cardTo(item.AppID)">
                <v-container fill-height fluid pa-2>
                  <v-layout align-start justify-start row fill-height>
                    <v-flex xs12 flexbox class="text-xs-right" v-if="item.AppType">
                      <v-btn dark small color="grey" class="card-right-icon">
                        <v-icon left class="mt-1">
                          {{ item.AppType | typeIcon }}
                        </v-icon>
                        {{ item.AppType | typeName }}
                      </v-btn>
                      <v-btn class="card-right-attention-icon" small color="primary" dark :loading="dialogAttention" @click.stop="dialogAttention = true">
                        <v-icon left class="mt-1">
                          add
                        </v-icon>
                        关注
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-title primary-title class="grey lighten-4">
                <v-layout row>
                  <v-flex xs9>
                    <nuxt-link :to="'/apps/'+ item.AppID" style="text-decoration: none;color: #000">
                      <span class="grey--text">更新于: {{ item.LastUpdated | time }}</span>
                      <h3 class="mb-0">
                        {{ item.Name.slice(0, 20) }}...
                      </h3>
                    </nuxt-link>
                  </v-flex>
                  <v-flex xs3 class="text-xs-right" v-if="item.AppType">
                    <v-chip label class="text-xs-right">
                      {{ item.AppID }}
                    </v-chip>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>

            <v-card v-else flat class="grey lighten-4">
              <v-card-media :src="'/unknow.jpg'" height="200px">
                <v-container fill-height fluid pa-2>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox class="text-xs-right">
                      <v-btn dark small color="grey">
                        <v-icon left class="mt-1">device_unknown</v-icon> 未知 </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-title primary-title class="grey lighten-4">
                <v-layout row>
                  <v-flex xs9>
                    <span class="grey--text">更新于: {{ item.LastUpdated | time }}</span>
                    <h3 class="mb-0">
                      未知应用...
                    </h3>
                  </v-flex>
                  <v-flex xs3 class="text-xs-right">
                    <v-chip label class="text-xs-right">
                      {{ item.AppID }}
                    </v-chip>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
        <v-dialog v-model="dialogAttention" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              功能开发中
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import axios from 'axios'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import dayjs from 'dayjs'

  import 'dayjs/locale/zh-cn'
  dayjs.extend(relativeTime)

  export default {
    layout: 'search',
    async asyncData ({ params }) {
      return { q: params.q }
    },
    data: () => ({
      dialogAttention: false,
      headerText: {
        title: ``,
        descript: `SteamHub Search 提供丰富的搜索选项以供全世界范围内的开发者及用户进行深度挖掘`,
        button: `使用 API`,
        dialog: {
          text: `功能开发中`,
          progressBar: {
            height: `6`
          }
        }
      },
      fecthSearchTime: '',
      fecthProgressBarHeight: 6,
      q: '',
      isData: true,
      result: '',
      resultLength: '',
      search: '',
      dropdown_font: ['游戏', '工具', '影音', '应用', '试玩版', '扩充包', '硬件']
    }),
    methods: {
      cardTo: function (id) {
        this.$router.push({ path: '/apps/' + id })
      },
      searchButton: function () {
        if (this.search === 'undefined' || this.search === '') {
          this.$router.push({ path: '/search/' })
        } else {
          this.$router.push({ path: '/search/q/' + this.search })
        }
      }
    },
    mounted: function () {
      this.search = this.$route.params.q
      let fecthSearchTimeStart = performance.now()
      this.headerText.title = '搜索有关 ' + this.q + ' 应用的数据信息'
      axios.get(`https://api.steamhub.cn/api/v1/steam/game/searches?q=` + this.q, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => {
          let fecthSearchTimeEnd = performance.now()
          this.fecthSearchTime = fecthSearchTimeEnd - fecthSearchTimeStart
          this.fecthProgressBarHeight = 0
          if (response.data.length === 0) {
            this.isData = false
          } else {
            this.resultLength = response.data.length
            this.result = response
          }
        })
    },
    watch: {
      dialogAttention (val) {
        if (!val) return
        setTimeout(() => (this.dialogAttention = false), 1000)
      },
      search (value) {
        if (value === 'undefined' || value === '') {
          this.$router.push({ path: '/search/' })
        } else {
          this.$router.push({ path: '/search/q/' + value })
        }
      }
    },
    filters: {
      time: function (value) {
        return dayjs().locale('zh-cn').from(dayjs(value))
      },
      typeName: function (value) {
        switch (value) {
          case 18:
            return '游戏'
          case 20:
            return '工具'
          case 21:
            return '影音'
          case 22:
            return '应用'
          case 23:
            return '试玩版'
          case 24:
            return '扩充包'
          case 25:
            return '硬件'
          default:
            return '未知'
        }
      },
      typeIcon: function (value) {
        switch (value) {
          case 18:
            return 'games'
          case 20:
            return 'build'
          case 21:
            return 'videocam'
          case 22:
            return 'apps'
          case 23:
            return 'play_circle_outline'
          case 24:
            return 'playlist_add'
          case 25:
            return 'computer'
          default:
            return 'device_unknown'
        }
      }
    },
    head () {
      return {
        title: '搜索有关 ' + this.q + ' 应用的数据信息  -- SteamHub Search',
        meta: [
          { hid: 'description', name: 'description', content: '在 SteamHub Search 中搜索并使用有关 ' + this.q + ' 的应用数据信息' }
        ]
      }
    }
  }
</script>

<style>
  .card-right-attention-icon {
    display: none;
  }

  .game-list-card :hover .card-right-icon {
    display: none;
  }

  .game-list-card :hover .card-right-attention-icon {
    display: inline;
  }

  @media (max-width: 960px) {
    .card-right-attention-icon {
      display: inline;
    }
    .card-right-icon {
      display: none;
    }
  }
</style>