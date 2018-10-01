<template>
  <div>
    <v-img v-if="appdetails[appid] && appdetails[appid].data" :src="appdetails[appid].data.screenshots[0].path_full" class="hidden-sm-and-down" style="height: 100vh">
      <v-content>
        <v-container fluid grid-list-sm class="index-main-container">
          <v-layout align-center justify-center row fill-height>
            <div>
              <v-flex xs10 lg6 class="px-3 py-5" style="background: linear-gradient(to right, rgba(170,75,107,.7), rgba(59,141,153,.7))">
                <div class="py-3 white--text">
                  <h1 class="display-3">
                    {{ title }}
                  </h1>
                  <h4 class="headline font-weight-thin">
                    <span v-for="(item,k) in appdetails" :key="k">
                      "<span v-html="item.data.short_description" v-if="item.data.short_description"></span>"
                    </span>
                  </h4>
                </div>
                <v-flex d-flex xs6>
                  <div>
                    <v-btn dark large flat outline class="mx-0" :href="'https://store.steampowered.com/app/' + appid" target="_balck">
                      <span>{{ $t('learn-more') }} ￥{{ appPrices[0].现价 }}</span>
                    </v-btn>
                    <v-btn dark large flat class="ml-3" v-if="appdetails[appid].data.movies[0]" @click="dialogOpenVideo(changeMoviePath(appdetails[appid].data.movies[0].webm.max))">
                      <v-icon left>far fa-play-circle</v-icon> <span>{{ $t('Play video') }}</span>
                    </v-btn>
                  </div>
                </v-flex>
                <ve-line v-if="chartData" height="30vh" :data="chartData" :legend-visible="false" backgroundColor="#fff" :extend="chartExtend"></ve-line>
              </v-flex>
            </div>
          </v-layout>
        </v-container>
      </v-content>
    </v-img>
    <v-container fluid grid-list-sm class="index-main-container">
      <div class="page-main">
        <div>
          <v-container fluid>
            <div>
              <v-tabs centered color="grey lighten-4" v-model="tabActice">
                <v-tabs-slider color="black"></v-tabs-slider>

                <v-layout align-center justify-center row fill-height>
                  <v-tab href="#tab-1">
                    浏览
                  </v-tab>
                  <v-tab href="#tab-2">
                    系统要求
                  </v-tab>
                  <v-tab href="#tab-3">
                    用户评价
                  </v-tab>
                  <v-tab href="#tab-4">
                    相似应用
                  </v-tab>
                </v-layout>

                <v-tab-item id="tab-1" class="mt-5 ml-1">
                  <v-layout align-start justify-start column fill-height>
                    <div class="mr-5">
                      <div class="mb-3">
                        <h2>可用于</h2>
                      </div>
                      <v-chip class="elevation-1" v-for="(item, i) in appSystem" :key="i">
                        <v-avatar>
                          <v-icon small v-if="item === 'windows'">fab fa-microsoft</v-icon>
                          <v-icon small v-else-if="item === 'macos'">fab fa-apple</v-icon>
                          <v-icon small v-else>fab fa-linux</v-icon>
                        </v-avatar>
                        {{ item }}
                      </v-chip>
                    </div>
                    <div>
                      <div class="mb-3 mt-5" v-if="appdetails[appid]">
                        <h2>功能</h2>
                      </div>
                      <span v-for="(item, i) in appdetails" :key="i">
                        <v-chip class="elevation-1" v-for="(data, i) in item.data.categories" :key="i">
                          <span>
                            {{ data.description }}
                          </span>
                        </v-chip>
                      </span>
                    </div>
                  </v-layout>
                  <div class="mt-5">
                    <h2>游戏介绍</h2>
                    <p class="mt-3">
                      <span v-for="(item,k) in appdetails" :key="k">
                        <span v-if="item.data.detailed_description" v-html="item.data.detailed_description.slice(0, 600)"></span>...
                      </span>
                    </p>
                    <p>
                      <a @click="dialogReadMore = true">更多</a>
                    </p>
                  </div>
                  <div class="mt-5">
                    <h2>游戏相册</h2>

                    <div class="mt-3">
                      <v-tabs grow v-if="appdetails[appid]" mobile-break-point="0" height="338" hide-slider class="grey lighten-4 screenshot"
                        next-icon="fas fa-arrow-circle-right" prev-icon="fas fa-arrow-circle-left">
                        <v-tab v-for="(item,i) in appdetails[appid].data.screenshots" :key="i">
                          <v-img :aspect-ratio="16/9" height="338" :src="item.path_thumbnail" :lazy-src="'/unknow.jpg'"></v-img>
                        </v-tab>
                      </v-tabs>
                    </div>
                  </div>
                  <div class="mt-5">
                    <h2>宣传片</h2>
                    <div class="mt-3">
                      <v-tabs grow v-if="appdetails[appid]" height="164" mobile-break-point="0" hide-slider class="grey lighten-4 video"
                        next-icon="fas fa-arrow-circle-right" prev-icon="fas fa-arrow-circle-left">
                        <v-tab v-for="(item,i) in appdetails[appid].data.movies" :key="i">
                          <v-img @click="dialogOpenVideo(item.webm.max)" style="cursor:pointer" :aspect-ratio="16/9"
                            :src="item.thumbnail" v-if="i <= 3" :lazy-src="'/unknow.jpg'" gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)">
                            <v-layout align-center justify-center row fill-height class="lightbox">
                              <v-icon center large class="white--text">fas fa-play-circle</v-icon>
                            </v-layout>
                          </v-img>
                        </v-tab>
                        <v-dialog v-model="dialogVideo" width="1024px">
                          <video id="videoElement" :src="videoUrl" autoplay controls="controls" width="100%" height="100%"
                            :aspect-ratio="16/9"></video>
                        </v-dialog>
                      </v-tabs>
                    </div>
                  </div>
                </v-tab-item>

                <v-tab-item id="tab-2" class="mt-5 ml-1">
                  <v-layout align-start justify-start column fill-height v-if="appdetails[appid]">
                    <div v-if="appdetails[appid].data.pc_requirements">
                      <h2>Windows: </h2>
                      <div class="mt-2">
                        <p v-html="appdetails[appid].data.pc_requirements.minimum"></p>
                      </div>
                    </div>
                    <div class="mt-5" v-if="appdetails[appid].data.mac_requirements">
                      <h2>Mac: </h2>
                      <div class="mt-2">
                        <p v-html="appdetails[appid].data.mac_requirements.minimum"></p>
                      </div>
                    </div>
                    <div class="mt-5" v-if="appdetails[appid].data.linux_requirements">
                      <h2>Linux: </h2>
                      <div class="mt-2">
                        <p v-html="appdetails[appid].data.linux_requirements.minimum"></p>
                      </div>
                    </div>
                  </v-layout>
                </v-tab-item>

                <v-tab-item id="tab-3" class="mt-5 ml-1">
                  <v-layout align-start justify-start column fill-height>
                    <div>
                      <h2>评分及评价</h2>
                      <v-layout align-space-around justify-start row fill-height>
                        <div>
                          <h2 class="display-4">0.0</h2>
                          <v-rating v-model="rating" readonly small color="pink" class="mx-0"></v-rating>
                        </div>
                      </v-layout>
                    </div>
                    <div class="mt-5">
                      <v-divider light color="black"></v-divider>
                      <div class="mt-3">
                        <h3>所有用户评价</h3>
                        <h4>功能开发中</h4>
                      </div>
                    </div>
                  </v-layout>
                </v-tab-item>

                <v-tab-item id="tab-4" class="mt-5 ml-1">
                  <v-layout align-start justify-start column fill-height>
                    <div>
                      <h2>人们同样喜欢</h2>
                    </div>
                  </v-layout>
                </v-tab-item>
              </v-tabs>
            </div>
          </v-container>
        </div>
      </div>
    </v-container>
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
        if (response.data[this.appid].data.package_groups[0].subs) {
          const getDetails =
              response.data[this.appid].data.package_groups[0].subs
          this.packages = getDetails
          this.details = true
        }
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
        step: 'middle',
        smooth: false
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