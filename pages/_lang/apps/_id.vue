<template>
  <div class="pt-5">
    <h1 class="display-4 text-xs-center">页面维护中</h1>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  async asyncData ({ query, params, store }) {
    let [apps, appInfos, appPrices] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/v2/apps/lists/' + params.id),
      axios.get('https://rest.steamhub.cn/api/v2/apps/infos/' + params.id),
      axios.get(
        'https://rest.steamhub.cn/api/v2/apps/prices/' +
          params.id +
          '?cc=' +
          store.state.display.country
      )
    ])
    let result = appPrices.data.map(function (o) {
      return Object.assign({
        现价: o.PriceFinal / 100,
        原价: o.PriceInitial / 100,
        更新时间: o.LastUpdated
      })
    })
    return {
      apps: apps.data,
      appInfos: appInfos.data,
      appid: params.id,
      title: apps.data[0]['Name'],
      lastUpdated: apps.data[0]['LastUpdated'],
      appPrices: result,
      chartData: {
        columns: ['更新时间', '现价'],
        rows: _.orderBy(result, ['更新时间'], ['asc'])
      }
    }
  },
  data: () => ({
    lang: '',
    appid: '',
    appdetails: '',
    carouselLoading: 6,
    lastUpdated: '',
    rating: 0,
    dialogReadMore: false,
    dialogVideo: false,
    videoUrl: '',
    playVideo: '',
    videoElement: '',
    chartData: {
      columns: '',
      rows: ''
    },
    discountPrice: '',
    minPriceFinal: '',
    isDiscount: '',
    appSystem: '',
    systemRequire: {
      windows: '',
      linux: '',
      macos: ''
    },
    starPL: 0,
    tabActice: 'tab-1'
  }),
  created: function () {
    axios
      .get('https://rest.steamhub.cn/api/v2/apps/details/' + this.appid + '?lang=' + this.$store.state.display.lang)
      .then(response => {
        this.appdetails = response.data
        this.carouselLoading = 0
      })
    axios
      .get(
        'https://rest.steamhub.cn/api/game/search/app/list/view/' +
          this.appid +
          '/price?country=' + this.$store.state.display.country + '&math=min'
      )
      .then(response => {
        this.minPriceFinal = response.data / 100
      })
    this.chartExtend = {
      series: {
        step: 'start',
        smooth: false,
        lineStyle: {
          width: 5,
          shadowColor: 'rgba(106,48,147, 0.5)',
          shadowBlur: 5,
          shadowOffsetY: 5,
          shadowOffsetX: 5
        }
      },
      yAxis: {
        scale: true
      }
    }
  },
  mounted: function () {
    let appSystem = ''
    this.appInfos.forEach(element => {
      if (element.Key === 117) {
        appSystem = element.Value
      }
    })
    this.appSystem = appSystem.split(',')
    this.chartColors = [
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#667db6' },
        { offset: 0.33, color: ' #0082c8' },
        { offset: 0.66, color: ' #0082c8' },
        { offset: 1, color: ' #667db6' }
      ])
    ]
  },
  methods: {
    dialogOpenVideo: function (value) {
      this.videoUrl = value
      this.dialogVideo = true
    },
    changeMoviePath: function (value) {
      return value.replace(/http/, 'https')
    }
  },
  filters: {
    moviePath: function (value) {
      return value.replace(/http/, 'https')
    }
  },
  watch: {
    dialogVideo: function (value) {
      this.videoElement = document.getElementById('videoElement')
      if (value === false) {
        this.videoElement.pause()
      } else {
        this.videoElement.play()
      }
    }
  },
  head () {
    return {
      title: this.$t('global.page.game.info.title', { AppID: this.appid, title: this.title }),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('global.page.game.info.description', { AppID: this.appid, title: this.title })
        }
      ]
    }
  }
}
</script>

<style>
  .v-datatable th {
    text-align: center !important;
  }

  .screenshot .v-responsive__content {
    width: 400px;
  }

  .screenshot .v-tabs__bar {
    background-color: transparent;
  }

  .screenshot .v-tabs__icon--prev {
    left: 30px;
  }

  .screenshot .v-tabs__icon--next {
    right: 30px;
  }

  .screenshot .v-tabs__icon--next,
  .screenshot .v-tabs__icon--prev {
    font-size: 32px;
    z-index: 99;
    color: #fff;
    line-height: 338px;
  }

  .screenshot .v-tabs__wrapper--show-arrows {
    margin: 0;
  }

  .screenshot .v-tabs__item {
    padding-left: 0;
  }

  .video .v-responsive__content {
    width: 400px;
  }

  .video .v-tabs__bar {
    background-color: transparent;
  }

  .video .v-tabs__icon--prev {
    left: 30px;
  }

  .video .v-tabs__icon--next {
    right: 30px;
  }

  .video .v-tabs__icon--next,
  .video .v-tabs__icon--prev {
    font-size: 32px;
    z-index: 99;
    color: #fff;
    line-height: 164px;
  }

  .video .v-tabs__wrapper--show-arrows {
    margin: 0;
  }

  .video .v-tabs__item {
    padding-left: 0;
  }

  .accent--text {
    color: #000 !important;
    caret-color: #000 !important;
  }

  .card--flex-toolbar {
    margin-top: -20vh;
  }

  .header_video {
    height: 100vh;
  }

  .discount_original_price {
    text-decoration: line-through;
  }

  @media screen and (max-width: 1264px) {
    .header_video {
      height: 80vh;
    }
  }

  @media screen and (max-width: 960px) {
    .header_video {
      height: 75vh;
    }
  }

  @media screen and (max-width: 600px) {
    .header_video {
      height: 50vh;
    }
  }
</style>