<template>
  <div 
    @mousemove="zoom_img" 
    @scroll.native="handleScroll">
    <div style="height:15vh"/>
    <v-container class="text-xs-center">
      <div 
        v-if="media && media.success === true && media.data" 
        class="text-xs-left">
        <video 
          v-if="'movies' in media.data"
          id="zoom-img" 
          :src="media.data.movies[0].webm.max"
          :style="{opacity: opacity - 0.2}"
          class="zoom elevation-3"
          width="100%"
          autoplay
          loop
          muted
          style="height:80vh; object-fit: fill"
        />
        <v-img
          v-else-if="'screenshots' in media.data"
          id="zoom-img"
          :style="{opacity: opacity}"
          :src="media.data.screenshots[0].path_full"
          gradient="to top right, rgba(117,117,117,.33), rgba(117,117,117, .33)"
          class="zoom elevation-3"
          height="80vh"
        />
        <h1
          v-if="game && game.name"
          id="zoom-title"
          :style="{opacity: title_opacity + 0.2}"
          class="display-4 img-view-title font-weight-black"
        >{{ game.name }}</h1>
      </div>
    </v-container>
    <v-container>
      <div id="game">
        <div v-if="game">
          <v-layout 
            row 
            wrap 
            class="text-xs-center">
            <v-flex 
              xs12 
              sm12
              md8 
              class="mt-5">
              <div>
                <v-layout 
                  row 
                  justify-center 
                  align-start 
                  fill-height 
                  wrap>
                  <v-flex 
                    v-if="game.game_reviews.length > 0" 
                    xs12 
                    
                    class="px-3">
                    <v-card 
                      class="elevation-3" 
                      color="secondary">
                      <v-sheet
                        class="v-sheet--offset mx-auto"
                        color="cyan darken-1"
                        elevation="12"
                        max-width="calc(100% - 32px)"
                      >
                        <v-sparkline
                          :labels="parse_label(game.game_reviews)"
                          :smooth="true"
                          :value="parse_value(game.game_reviews)"
                          color="white"
                          line-width="2"
                          padding="16"
                        />
                      </v-sheet>

                      <v-card-text class="pt-0">
                        <div class="mb-2">
                          <h2 class="display-1">评价趋势</h2>
                        </div>
                        <div class="subheading font-weight-light grey--text">
                          <v-tooltip 
                            top 
                          >
                            <v-chip
                              v-if="rating = game.game_reviews.length > 0 ? game.game_reviews[0].score / 20 : null"
                              slot="activator"
                              large
                              class="transparent"
                            >
                              <v-rating
                                v-model="rating"
                                :color="'orange'"
                                readonly
                                background-color="transparent"
                                half-increments
                                
                                
                              />
                              <span>{{ game.game_reviews[0].score / 10 }}</span>
                            </v-chip>
                            <h3 class="display-1">{{ game.game_reviews[0].count }} 篇评测中 {{ game.game_reviews[0].score }}% 的用户推荐</h3>
                          </v-tooltip>
                        </div>
                        <v-divider class="my-2"/>
                        <v-icon 
                          class="mr-2" 
                          small>far fa-clock</v-icon>
                        <span
                          class="caption grey--text font-weight-light"
                        >上次更新 {{ game.game_reviews[game.game_reviews.length - 1].created_at }}</span>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex 
                    v-if="game.game_prices.length > 0" 
                    xs12 
                    
                    class="px-3 pt-5">
                    <v-card 
                      class="elevation-3" 
                      color="secondary">
                      <v-sheet
                        class="v-sheet--offset mx-auto"
                        color="cyan darken-1"
                        elevation="12"
                        max-width="calc(100% - 32px)"
                      >
                        <v-sparkline
                          :labels="parse_label(game.game_prices)"
                          :smooth="true"
                          :value="parse_value(game.game_prices)"
                          color="white"
                          line-width="2"
                          padding="16"
                        />
                      </v-sheet>

                      <v-card-text class="pt-0">
                        <div class="mb-2">
                          <h2 class="display-1">价格走势</h2>
                          

                        </div>
                        <div class="subheading font-weight-light grey--text">
                          <h2 class="display-1">
                            当前价格: <del>￥{{ game.game_prices[game.game_prices.length -1].initial }}</del>
                            <span class="accent--text">
                              ￥{{ game.game_prices[game.game_prices.length -1].final }}
                            </span>
                          </h2>

                        </div>
                        <v-divider class="my-2"/>
                        <v-icon 
                          class="mr-2" 
                          small>far fa-clock</v-icon>
                        <span
                          class="caption grey--text font-weight-light"
                        >上次更新 {{ game.game_prices[game.game_prices.length -1].created_at }}</span>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
            <v-flex 
              xs12 
              sm12
              md4 
              class="mt-5">
              <v-card 
                class="elevation-3" 
                color="secondary">
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="display-2">{{ game.name }}</v-list-item-title>
                    <v-list-item-subtitle class="title">
                      <span v-if="is_support_simplified_chinese">
                        支持简体中文
                      </span>
                      <span v-if="is_support_traditional_chinese">/繁体中文</span>
                      <span v-if="!is_support_simplified_chinese && !is_support_traditional_chinese">
                        不支持中文
                      </span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <div :style="`height: 5px;width:${scrollY / 100}%;background-color:#0ebeff`"/>
                <div class="mt-5">
                  <p class="mx-3 title">{{ game.short_description }}</p>
                </div>
                <v-card-text v-if="game.steam_user_review_score">
                  <v-layout align-center>
                    <v-flex 
                      xs6 
                      display-3>{{ game.steam_user_review_summary }}</v-flex>
                    <v-flex xs6>
                      <v-progress-circular
                        :rotate="-90"
                        :size="150"
                        :width="15"
                        :value="game.steam_user_review_score"
                        color="cyan darken-1"
                      >
                        <h2 class="title">{{ game.steam_user_review_score }}</h2>
                      </v-progress-circular>
                    </v-flex>
                  </v-layout>
                </v-card-text>

                <v-list-item>
                  <v-list-item-subtitle 
                    class="title" 
                    v-html="game.languages"/>
                </v-list-item>
                <v-btn 
                  :href="`https://store.steampowered.com/app/${game.appid}`" 
                  target="_black"
                  outline 
                  block
                  large
                  class="my-3"
                  color="accent">
                  立即购买 ￥{{ game.game_prices[game.game_prices.length -1].final }}
                </v-btn>
              </v-card>
            </v-flex>


          </v-layout>
          <v-layout 
            
            class="mt-5 mx-3" 
            row 
            wrap>
            <v-flex xs12 >
              <v-layout 
                v-if="media.data.movies && scrollY < 0" 
                row 
                wrap>
                <v-flex 
                  v-for="(item, k) in media.data.movies" 
                  :key="k" 
                  xs4
                >
                  <v-card 
                    flat 
                    tile 
                    color="secondary">
                    <a 
                      :href="item.webm.max" 
                      target="_black">
                      <v-img 
                        :src="item.thumbnail" 
                        height="164px"
                        width="293px"/>
                    </a>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-layout 
                v-if="media && media.success === true && media.data" 
                row 
                wrap>
                <v-flex 
                  v-for="(item, n) in media.data.screenshots" 
                  :key="n"
                  md6 
                  xs12
                >
                  <v-card  
                    class="ma-3 elevation-3">
                    <a 
                      :href="item.path_full" 
                      target="_black">
                      <v-img 
                        :src="item.path_full" 
                        :aspect-ratio="16/9" 
                      />
                    </a>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
        <div v-if="loading === true">
          <loading class="primary--text"/>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import tabDefault from '~/components/tab/default'
import loading from '~/components/loading'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default {
  components: {
    tabDefault,
    loading
  },
  data() {
    return {
      is_support_simplified_chinese: null,
      is_support_traditional_chinese: null,
      title_opacity: 1,
      scrollY: null,
      totalOffset: null,
      opacity: null,
      tab: {
        model: this.$route.fullPath,
        color: 'primary',
        slider: {
          color: 'white'
        },
        centered: true,
        fixed: true,
        dark: true,
        item: [{ title: this.$route.params.id, link: this.$route.fullPath }]
      },
      game: null,
      media: null,
      loading: true,
      head: {
        title: `AppID: ${this.$route.params.id} 的详细数据 -- SteamHub`,
        description: `在 SteamHub 查看 AppID: ${
          this.$route.params.id
        } 的评价趋势,价格走势,媒体信息...`
      }
    }
  },

  async mounted() {
    let _this = this
    window.addEventListener('scroll', _this.handleScroll)
    const id = this.$route.params.id
    const api_domain = `https://v3.steamhub.cn/api/v3/game/list?length=1&simple_paginate=1&appids=`
    const fetch_data = await this.$axios.$get(`${api_domain}${id}`)
    const fetch_media = await this.$axios.$get(
      `https://bird.ioliu.cn/v1?url=https://store.steampowered.com/api/appdetails?appids=${id}`
    )
    const data = fetch_data.data[0]
    this.loading = false
    this.game = data
    this.media = fetch_media[id]
    const tab = this.tab.item[0]
    const title = data.name
    this.tab.item[0].title = title
    this.head.title = `${title} 的详细数据 -- SteamHub`
    let is_support_simplified_chinese = data.languages.indexOf('简体中文')
    let is_support_traditional_chinese = data.languages.indexOf('繁体中文')
    if (is_support_simplified_chinese === -1) {
      this.is_support_simplified_chinese = false
    } else {
      this.is_support_simplified_chinese = true
    }
    if (is_support_traditional_chinese === -1) {
      this.is_support_traditional_chinese = false
    } else {
      this.is_support_traditional_chinese = true
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    parse_label: function(val) {
      let array_label = []
      let review = val.slice().reverse()
      for (let index = 0; index < 5; index++) {
        if (review[index] && 'created_at' in review[index]) {
          array_label.push(dayjs(review[index].created_at).toNow())
        }
      }
      if (array_label.length === 1) {
        array_label.push([dayjs().toNow()][0])
        return array_label
      } else {
        return array_label.reverse()
      }
    },
    parse_value: function(val) {
      let array_label = []
      let review = val.slice().reverse()
      for (let index = 0; index < 5; index++) {
        if (review[index] && 'score' in review[index]) {
          array_label.push(review[index].score)
        } else if (review[index] && 'final' in review[index]) {
          array_label.push(review[index].final)
        }
      }
      if (array_label.length === 1) {
        array_label.push([review[0].final][0])
      }
      return array_label.reverse()
    },
    zoom_img: function(e) {
      let zoomer = e.currentTarget
      let x = (e.x / zoomer.offsetWidth) * 30
      let y = (e.y / zoomer.offsetHeight) * 30
      let img = document.getElementById('zoom-img')
      if (img) {
        img.style.transform = `translate(${x}px ,${y}px)`
      }
      let title = document.getElementById('zoom-title')
      if (title) {
        title.style.transform = `translate(${y}px ,${x}px)`
      }
    },
    handleScroll: function(e) {
      let elem = document.getElementById('game')
      let game = document.getElementById('scroll-game')
      let distanceScrolled = document.body.scrollTop
      let elemRect = elem.getBoundingClientRect()
      let elemViewportOffset = elemRect.top
      let totalOffset = distanceScrolled + elemViewportOffset
      this.totalOffset = totalOffset
      this.scrollY = window.scrollY
      if (totalOffset > 100) {
        if (elem && totalOffset) {
          elem.style.transform = `translate3d(0px, ${-window.scrollY}px, 0)`
          elem.style.marginBottom = `${-window.scrollY}px`
        }
      }
      if (window.scrollY < 10) {
        this.opacity = 0.8
        this.title_opacity = 1
      }
      if (totalOffset > 200 && totalOffset < 1000) {
        this.opacity = totalOffset / 2000
        this.title_opacity = totalOffset / 1500
      }
    }
  },
  head() {
    return {
      title: this.head.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.head.description
        }
      ]
    }
  }
}
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
.img-view-title {
  top: -25vh;
  left: -5vw;
  position: relative;
  font: bold calc(60px + 90 * ((100vw - 400px) / 1200)) /
      calc(60px + 90 * ((100vw - 400px) / 1200)) 'Eczar',
    serif !important;
}
</style>

<style lang="scss" scoped>
.zoom {
  & img:hover {
    opacity: 0.3;
  }
  img {
    transition: opacity 0.5s;
    display: block;
    width: 100%;
  }
  background-position: 50% 50%;
  position: relative;
  overflow: hidden;
}
.rich-text {
  letter-spacing: 3px;
}
</style>
