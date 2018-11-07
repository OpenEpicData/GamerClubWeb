<template>
  <div v-if="appDetail">
    <v-parallax :src="parallaxImgPath(apps.screenshots)">
      <v-container fluid grid-list-sm class="index-main-container">
        <v-layout align-center justify-start row fill-height>
          <v-flex xs12 lg8 class="px-3 py-5" style="background: linear-gradient(to right, rgba(170,75,107,.7), rgba(59,141,153,.7))">
            <div>
              <div>
                <h1 class="display-3 hidden-sm-and-down">
                  {{ appDetail.Name }}
                </h1>
                <h1 class="display-1 hidden-md-and-up">
                  {{ appDetail.Name }}
                </h1>
              </div>
              <div>
                <h4 class="headline font-weight-thin py-3 hidden-sm-and-down">
                  "{{ appDetail.ShortDescription }}"
                </h4>
                <h4 class="subheading font-weight-thin py-3 hidden-md-and-up">
                  "{{ appDetail.ShortDescription }}"
                </h4>
              </div>
            </div>
            <v-flex d-flex xs3>
              <v-btn flat outline dark :href="'https://store.steampowered.com/app/' + this.appid " target="_black" class="mx-0">
                <span>{{ $t('learn-more') }}</span>
                <span v-if="appPrice && appPrice.now" class="mx-2">{{ turnNowPrice(appPrice.now) }}</span>
              </v-btn>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>
    <div>
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="mt-5">
          <div class="mx-2 py-2">
            <v-layout row wrap>
              <v-flex xs12 md9>
                <div v-if="apps.movies">
                  <video :src="apps.movies[0].webm.max" v-if="apps.movies" height="100%" width="100%" controls preload></video>
                </div>
                <div v-else-if="apps.screenshots">
                  <img :src="parallaxImgPath(apps.screenshots)" height="100%" width="100%">
                </div>
                <div v-if="chartData">
                  <div class="pt-4">
                    <h2 class="display-1 text-xs-center">{{ $t('Historical price') }}</h2>
                  </div>
                  <ve-line :data="chartData" :colors="chartColors" :legend-visible="false" :extend="chartExtend" :settings="chartSettings"></ve-line>
                </div>
              </v-flex>
              <v-flex xs12 md3 class="white--text pl-3">
                <div>
                  <h4 class="title">
                    推荐游戏
                  </h4>
                  <v-layout row wrap class="py-3" v-for="i in 4" :key="i">
                    <v-flex xs8>
                      <img :src="'https://cdn.steamstatic.com.8686c.com/steam/apps/' + appid + '/header.jpg'" height="100%" width="100%">
                    </v-flex>
                    <v-flex xs4 class="pl-2">
                      <h5 class="title">
                        {{ appDetail.Name }}
                      </h5>
                      <h6>
                        {{ apps.developers[0] }}
                        <br>
                        {{ appDetail.ReleaseDate.split('|')[1] }}
                      </h6>
                    </v-flex>
                  </v-layout>
                </div>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-container>
    </div>
  </div>
  <div v-else>
    <h1 class="display-4 mt-5 text-xs-center">数据采集中</h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => {
    return {
      name: 'Unknown app',
      lang: String,
      appid: Number,
      appDetail: null,
      appPrice: null,
      appInfo: null,
      chartData: null,
      chartExtend: {
        series: {
          step: 'end',
          type:'line',
          smooth: false,
          lineStyle: {
            width: 5,
            shadowColor: 'rgb(242, 19, 93)',
            shadowBlur: 1,
            shadowOffsetY: 0,
            shadowOffsetX: 2
          }
        },
        yAxis: {
          scale: true,
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        xAxis: {
          axisLabel: {
            color: '#fff'
          },
          inverse: true
        }
      },
    }
  },
  methods: {
    turnNowPrice: function (value) {
      if (this.lang === 'schinese') { return '￥' + value / 100 }
      if (this.lang === 'english') { return '$' + value / 100 }
    },
    parallaxImgPath: function (value) {
      if (value && value.length !== 0 && value[0]['path_full']) { return value[0]['path_full'] }
      else { return '/unknow.jpg' }
    },
    turnChartData: function (value) {
      for(let k in value) {
        value[k]['PriceFinal'] = value[k]['PriceFinal'] / 100
      }
      if (this.lang === 'schinese') {
        this.chartSettings = {
          labelMap: {
            'PriceFinal': this.$t('Current price')
          }
        }
      }
      return value
    }
  },
  async asyncData ({ params }) {
    let [apps] = await Promise.all([
      axios.get('https://bird.ioliu.cn/v2?url=https://store.steampowered.com/api/appdetails?appids='+ params.id),
    ])
    if (apps.data && apps.data[params.id]['success']) {
      let data = apps.data[params.id]['data']
      return {
        apps: data,
        appid: params.id,
        name: data['name']
      }
    }
  },
  mounted: async function () {
    this.lang = this.$store.state.display.lang
    this.country = this.$store.state.display.country
    let [appDetail, appPrice, appInfo] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/v2/apps/lists/'+ this.appid + '?lang=' + this.lang),
      axios.get('https://rest.steamhub.cn/api/v2/apps/prices/'+ this.appid + '?cc=' + this.country),
      axios.get('https://rest.steamhub.cn/api/v2/apps/infos/'+ this.appid)
    ])
    if (appDetail.data && appDetail.data.length !== 0) {
      this.appDetail = appDetail.data[0]
    }
    if (appPrice.data && appPrice.data.length !== 0) {
      let checkPrice = appPrice.data[0]
      if (checkPrice.PriceInitial) {
        this.appPrice = {
          price: appPrice.data,
          now: checkPrice.PriceInitial
        }
        this.chartData = {
          columns: ['LastUpdated', 'PriceFinal'],
          rows: this.turnChartData(appPrice.data)
        }
        this.chartColors = [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#fff' },
            { offset: 0.5, color: ' #fff' },
            { offset: 1, color: ' #fff' },
          ]),
        ]
      }
    }
    if (appInfo.data && appInfo.data.length !== 0) {
      this.appInfo = appInfo.data
    }
    this.$store.commit('DISPLAY_LOADING', false)
  },
  head () {
    return {
      title: this.$t('global.page.game.info.title', { AppID: this.appid, title: this.name }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('global.page.game.info.description', { AppID: this.appid, title: this.name })
        }
      ]
    }
  }
}
</script>
