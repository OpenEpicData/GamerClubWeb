<template>
  <div>
    <div class="grey lighten-4">
      <v-container
        fluid
        grid-list-sm
        class="index-main-container"
      >
        <div class="page-main" id="SearchList">
          <v-content>
            <v-layout
              row
              wrap
            >
              <v-flex xs8 md6>
                <v-text-field
                  solo
                  outline
                  single-line
                  color="black"
                  label="搜索游戏, ID..."
                  append-icon="search"
                  v-model="search"
                  full-width
                  autofocus
                  class="ml-3"
                ></v-text-field>
              </v-flex>
              <v-flex xs4 md4>
                <v-btn large color="g-blue-hydrogen" dark @click="searchButton">立即搜索</v-btn>
              </v-flex>
              <v-flex xs12 md4>
                <h2 class="mt-3 ml-3">搜索 {{ q }} 的结果:
                  <span v-if="isData">共查询到: {{ resultLength }} 条结果</span>
                  <span v-else>暂无数据</span>
                </h2>
                <h3 class="ml-3">查询数据用时: {{ fecthSearchTime }} 毫秒</h3>
              </v-flex>
              <v-progress-linear
                indeterminate
                color="blue"
                class="mb-0"
                :height="fecthProgressBarHeight"
              ></v-progress-linear>
            </v-layout>
            <v-layout
              wrap
              row
            >
              <v-flex
                xs12 md8
                v-for="(item,i) in result.data"
                :key="i"
                class="game-list-card px-3">
                <v-hover>
                  <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 0}`"
                    v-if="item.AppType"
                    flat
                    class="grey lighten-4"
                    height="18vh"
                  >
                    <div>
                      
                      <v-card-title
                        primary-title
                        class="grey lighten-4"
                      >
                        <v-layout
                          align-start
                          justify-start
                          row
                          fill-height
                        >
                          <v-flex>
                            <nuxt-link
                              :to="'/apps/'+ item.AppID"
                              style="color: #000"
                            >
                              <h3 class="mb-0 display-1">
                                <span v-if="item.Name && item.ChineseName">{{ item.ChineseName }}</span>
                                <span v-else-if="item.Name && !item.ChineseName">{{ item.Name }}</span>
                              </h3>
                            </nuxt-link>
                            <!-- <ve-line :data="chartData[i]" :legend-visible="false"></ve-line> -->
                            <div>
                              <span v-for="(item, i) in item.app_info" :key="i">
                                <span v-if="item.Key === 117">支持的系统：{{ item.Value }}</span>
                              </span>
                            </div>

                            <span class="grey--text">更新于: {{ item.LastUpdated | time }}</span>
                          </v-flex>
                          <v-flex
                            flexbox
                            class="text-xs-right"
                            v-if="item.AppType"
                          >
                            <v-btn
                              dark
                              small
                              color="grey"
                              class="card-right-icon"
                            >
                              <v-icon left>
                                {{ item.AppType | typeIcon }}
                              </v-icon>
                              {{ item.AppType | typeName }}
                            </v-btn>
                            <v-btn
                              class="card-right-attention-icon"
                              small
                              color="g-blue-hydrogen"
                              dark
                              :loading="dialogAttention"
                              @click.stop="dialogAttention = true"
                            >
                              <v-icon left>
                                add
                              </v-icon>
                              关注
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-card-title>
                    </div>
                  </v-card>
                </v-hover>
              </v-flex>
              <v-pagination v-model="page" :length=result.last_page></v-pagination>
            </v-layout>
            <v-dialog
              v-model="dialogAttention"
              hide-overlay
              persistent
              width="300"
            >
              <v-card
                color="primary"
                dark
              >
                <v-card-text>
                  功能开发中
                  <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                  ></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-content>
        </div>
      </v-container>
    </div>
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
        title: '',
        descript: 'SteamHub Search 提供丰富的搜索选项以供全世界范围内的开发者及用户进行深度挖掘',
        button: '使用 API',
        dialog: {
          text: '功能开发中',
          progressBar: {
            height: '6'
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
      dropdown_font: ['全部', '游戏', '工具', '影音', '应用', '试玩版', '扩充包', '硬件'],
      list: '',
      chartPrice: '',
      chartData: Array,
      page: 1
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
      axios.get('https://rest.steamhub.cn/api/v2/apps/search?q=' + this.q + '&page=1')
        .then(response => {
          let fecthSearchTimeEnd = performance.now()
          this.fecthSearchTime = fecthSearchTimeEnd - fecthSearchTimeStart
          this.fecthProgressBarHeight = 0
          this.page = response.data.current_page
          if (response.data.length === 0) {
            this.isData = false
          } else {
            this.resultLength = response.data.total
            this.result = response.data
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
        } else {
        }
      },
      page: function (newPage, oldPage) {
        this.$vuetify.goTo('#SearchList', 'easyInQuad')
        axios.get('https://rest.steamhub.cn/api/v2/apps/search?q=' + this.q + '&page=' + newPage)
          .then(response => {
            this.result = response.data
          })
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

  .v-image__image--preload {
    filter: blur(0)
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