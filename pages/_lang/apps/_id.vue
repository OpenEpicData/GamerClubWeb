<template>
  <div v-if="appDetail" class="black">
    <v-parallax dark :src="parallaxImgPath(appDetail.screenshots)">
      <v-container fluid grid-list-sm class="index-main-container">
        <v-layout align-center justify-start row fill-height>
          <v-flex xs12 lg8 class="px-3 py-5" style="background: linear-gradient(to right, rgba(170,75,107,.7), rgba(59,141,153,.7))">
            <div>
              <div>
                <h1 class="display-3 hidden-sm-and-down">
                  {{ appDetail.name }}
                </h1>
                <h1 class="display-1 hidden-md-and-up">
                  {{ appDetail.name }}
                </h1>
              </div>
              <div>
                <h4 class="headline font-weight-thin py-3 hidden-sm-and-down">
                  "{{ appDetail.short_description }}"
                </h4>
                <h4 class="subheading font-weight-thin py-3 hidden-md-and-up">
                  "{{ appDetail.short_description }}"
                </h4>
              </div>
            </div>
            <v-flex d-flex xs3>
              <v-btn dark flat outline :href="'https://store.steampowered.com/app/' + this.appid " target="_black" class="mx-0">
                <span>{{ $t('learn-more') }}</span>
                <span v-if="appPrice && appPrice.now" class="mx-2">{{ turnNowPrice(appPrice.now) }}</span>
              </v-btn>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>
    <div class="black">
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="mt-5">
          <v-card dark>
            <div class="mx-2 py-2">
              <v-layout row wrap>
                <v-flex xs12 v-if="!chartData">
                  <div v-if="appDetail.movies">
                    <video :src="appDetail.movies[0].webm.max" v-if="appDetail.movies[0]" height="100%" width="100%" controls preload></video>
                  </div>
                  <div v-else-if="appDetail.screenshots">
                    <img :src="parallaxImgPath(appDetail.screenshots)" height="100%" width="100%">
                  </div>
                </v-flex>
                <v-flex xs12 md6 v-else>
                  <div v-if="appDetail.movies">
                    <video :src="appDetail.movies[0].webm.max" v-if="appDetail.movies[0]" height="100%" width="100%" controls preload></video>
                  </div>
                  <div v-else-if="appDetail.screenshots">
                    <img :src="parallaxImgPath(appDetail.screenshots)" height="100%" width="100%">
                  </div>
                </v-flex>
                <v-flex xs12 md6 v-if="chartData">
                  <div class="pt-4">
                    <h2 class="display-1 text-xs-center">{{ $t('Historical price') }}</h2>
                  </div>
                  <ve-line :data="chartData" :colors="chartColors" :legend-visible="false" :extend="chartExtend" :settings="chartSettings"></ve-line>
                </v-flex>
              </v-layout>
            </div>
          </v-card>
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
      appDetail: Object,
      appPrice: Object,
      appInfo: Object,
      chartData: null,
      chartExtend: {
        series: {
          step: 'end',
          type:'line',
          smooth: false,
          lineStyle: {
            width: 5,
            color: '#fff'
          }
        },
        yAxis: {
          scale: true,
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            lineStyle: {
              color: '#000'
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
  mounted: async function () {
    this.appDetail = null
    this.appPrice = null
    this.appInfo = null
    this.lang = this.$store.state.display.lang
    this.country = this.$store.state.display.country
    let appid = this.appid = this.$route.params.id
    let [appDetail, appPrice, appInfo] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/v2/apps/details/'+ this.appid + '?lang=' + this.lang),
      axios.get('https://rest.steamhub.cn/api/v2/apps/prices/'+ this.appid + '?cc=' + this.country),
      axios.get('https://rest.steamhub.cn/api/v2/apps/infos/'+ this.appid)
    ])
    if (appDetail.data && appDetail.data.length !== 0 && appDetail.data.Data !== 'null') {
      let parseAppDetail = JSON.parse(JSON.parse(appDetail.data.Data))
      if (parseAppDetail[appid]['success'] === true) {
        this.appDetail = parseAppDetail[appid]['data']
        this.name = this.appDetail.name
      }
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
            { offset: 0, color: '#667db6' },
            { offset: 0.33, color: ' #0082c8' },
            { offset: 0.66, color: ' #0082c8' },
            { offset: 1, color: ' #667db6' }
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
