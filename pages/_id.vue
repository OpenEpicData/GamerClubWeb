<template>
  <div>
    <div 
      class="secondary" 
      style="height:15vh"/>
    <v-alert
      type="info"
      colored-border
      border="left"
      icon="new_releases"
      class="primary"
    >SteamHub 后端出现中断问题,开发团队正在尝试复现并修复.{{ x / 100 }}</v-alert>
    <v-container class="text-xs-center">
      <div 
        v-if="media && media.success === true && media.data" 
        class="text-xs-left">
        <v-img :src="media.data.screenshots[0].path_full"/>
        <h1 class="display-4 img-view-title font-weight-black">{{ game.name }}</h1>
      </div>

      <v-layout 
        row 
        wrap>
        <v-flex
          :class="{ xs11: this.$vuetify.breakpoint.smAndUp, xs12: this.$vuetify.breakpoint.smAndDown }"
        >
          <div v-if="game">
            <v-layout 
              row 
              justify-center 
              align-start 
              fill-height 
              wrap>
              <v-flex 
                v-if="game.game_reviews.length > 0" 
                xs12 
                md6 
                class="px-3">
                <v-card 
                  class="mt-5 elevation-3" 
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
                    <div class="title font-weight-light mb-2">评价趋势</div>
                    <div class="subheading font-weight-light grey--text">
                      <v-tooltip top>
                        <v-chip
                          v-if="rating = game.game_reviews.length > 0 ? game.game_reviews[0].score / 20 : null"
                          slot="activator"
                          small
                          class="transparent"
                        >
                          <v-rating
                            v-model="rating"
                            :color="'orange'"
                            readonly
                            background-color="transparent"
                            half-increments
                            dense
                            small
                          />
                          <span>{{ game.game_reviews[0].score / 10 }}</span>
                        </v-chip>
                        <span>{{ game.game_reviews[0].count }} 篇评测中 {{ game.game_reviews[0].score }}% 的用户推荐</span>
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
                md6 
                class="px-3">
                <v-card 
                  class="mt-5 elevation-3" 
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
                    <div class="title font-weight-light mb-2">
                      价格走势
                      <v-chip
                        color="green"
                        dark
                        small
                      >-{{ game.game_prices[game.game_prices.length -1].discount }}%</v-chip>
                    </div>
                    <div class="subheading font-weight-light grey--text">
                      <span>
                        当前价格:
                        <del>￥{{ game.game_prices[game.game_prices.length -1].initial }}</del>
                      </span>
                      <span
                        class="red--text"
                      >￥{{ game.game_prices[game.game_prices.length -1].final }}</span>
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
            <v-layout 
              class="mt-5" 
              row 
              justify-center 
              align-start 
              fill-height 
              wrap>
              <v-flex 
                xs12 
                md6 
                class="px-3">
                <v-card 
                  class="mx-auto elevation-3" 
                  color="secondary">
                  <v-list-item two-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline">{{ game.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ game.short_description }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

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
                    <v-list-item-subtitle v-html="game.languages"/>
                  </v-list-item>
                </v-card>
              </v-flex>
              <v-flex 
                xs12 
                md6 
                class="px-3">
                <v-card 
                  class="mx-auto elevation-3" 
                  color="secondary">
                  <v-card-title>
                    <v-icon 
                      large 
                      left>far fa-smile-beam</v-icon>
                    <span class="title font-weight-light">媒体均分</span>
                  </v-card-title>

                  <v-card-text
                    v-if="game.metacritic_review_score"
                    class="headline font-weight-bold"
                  >
                    <v-progress-circular
                      :rotate="-90"
                      :size="150"
                      :width="15"
                      :value="game.metacritic_review_score"
                      color="cyan darken-1"
                    >
                      <h2 class="title">{{ game.metacritic_review_score }}</h2>
                    </v-progress-circular>
                  </v-card-text>

                  <v-card-text 
                    v-else 
                    class="headline font-weight-bold">
                    <v-progress-circular 
                      :rotate="-90" 
                      :size="150" 
                      :width="15" 
                      value="0" 
                      color>
                      <h2 class="title">评分未知</h2>
                    </v-progress-circular>
                  </v-card-text>

                  <v-card-actions>
                    <v-list-tile class="grow">
                      <v-list-tile-avatar color="grey darken-3">
                        <v-img
                          class="elevation-6"
                          src="https://i.loli.net/2019/01/09/5c35aa0f55b3e.png"
                        />
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title>Metacritic</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-card-actions>
                </v-card>

                <v-card
                  v-if="typeof media !== 'undefined'"
                  class="mx-auto mt-5 elevation-3"
                  color="secondary"
                >
                  <v-card-title>
                    <v-icon 
                      large 
                      left>far fa-file-video</v-icon>
                    <span class="title font-weight-light">媒体宣传</span>
                  </v-card-title>

                  <v-layout 
                    v-if="media.data.movies" 
                    row 
                    wrap>
                    <v-flex 
                      v-for="(item) in media.data.movies" 
                      :key="item.thumbnail" 
                      xs4>
                      <v-card 
                        flat 
                        tile>
                        <a 
                          :href="item.webm.max" 
                          target="_black">
                          <v-img 
                            :src="item.thumbnail" 
                            height="150px"/>
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
                      xs4>
                      <v-card 
                        flat 
                        tile>
                        <a 
                          :href="item.path_full" 
                          target="_black">
                          <v-img 
                            :src="item.path_thumbnail" 
                            height="150px"/>
                        </a>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </div>
          <div v-if="loading === true">
            <loading class="primary--text"/>
          </div>
        </v-flex>
        <v-flex xs1>
          <tabDefault :tab.sync="tab"/>
        </v-flex>
      </v-layout>
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
  top: -70px;
  left: -40px;
  position: relative;
}
</style>
