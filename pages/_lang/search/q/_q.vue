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
                  :label="$t('Search game, id') + '...'"
                  append-icon="search"
                  v-model="search"
                  full-width
                  autofocus
                ></v-text-field>
              </v-flex>
              <v-flex xs4 md4>
                <v-btn large color="g-blue-hydrogen" dark @click="searchButton">{{ $t('Search now') }}</v-btn>
              </v-flex>
              <v-flex xs12 md4>
                <h2 class="mt-3 ml-3">
                  <span v-if="isData">{{ $t('Total inquiry') }}: {{ resultLength }}</span>
                  <span v-else>{{ $t('No data') }}</span>
                </h2>
                <h3 class="ml-3">{{ $t('Query data time') }}: {{ fecthSearchTime }} MS</h3>
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
                class="game-list-card">
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
                              :to="$i18n.path('apps/'+ item.AppID)"
                              style="color: #000"
                            >
                              <h3 class="mb-0 display-1">
                                <span v-if="item.Name && item.ChineseName && language === 'zh-cn'">{{ item.ChineseName }}</span>
                                <span v-else-if="item.Name">{{ item.Name }}</span>
                              </h3>
                            </nuxt-link>
                            <!-- <ve-line :data="chartData[i]" :legend-visible="false"></ve-line> -->
                            <div>
                              <span v-for="(item, i) in item.app_info" :key="i">
                                <span v-if="item.Key === 117">{{ $t('Supported system') }}：{{ item.Value }}</span>
                              </span>
                            </div>

                            <span class="grey--text">{{ $t('Updated on') }}: {{ time(item.LastUpdated) }}</span>
                          </v-flex>
                          <v-flex
                            flexbox
                            class="text-xs-right"
                            v-if="item.AppType"
                          >
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
                              {{ $t('attention') }}
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
          </v-content>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default {
  async asyncData ({ params, store }) {
    return {
      q: params.q,
      language: store.state.locale
    }
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
    list: '',
    chartPrice: '',
    chartData: Array,
    page: 1,
    language: String
  }),
  created () {
  },
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
    },
    time: function (value) {
      if (this.$store.state.locale === 'zh-cn') return dayjs().locale('zh-cn').from(dayjs(value))
      if (this.$store.state.locale === 'en-us') return dayjs().from(dayjs(value))
    }
  },
  mounted: function () {
    this.search = this.$route.params.q
    let fecthSearchTimeStart = performance.now()
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
  },
  head () {
    return {
      title: this.$t('global.page.search.q.title', { q: this.q }),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('global.page.search.q.description', { q: this.q }), }
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