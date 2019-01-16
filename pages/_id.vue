<template>
  <div>
    <div
      class="grey-gradient"
      style="height:20vh"
    />
    <tabDefault
      :tab.sync="tab"
    />
    <v-container
      fluid
      class="text-xs-center"
    >
      <div v-if="game" >
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
            xl3 
            class="px-3">
            <v-card
              class="mt-5"
            >
              <v-sheet
                class="v-sheet--offset mx-auto"
                color="cyan"
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
                      <span>
                        {{ game.game_reviews[0].score / 10 }}
                      </span>
                    </v-chip>
                    <span>
                      {{ game.game_reviews[0].count }} 篇评测中 {{ game.game_reviews[0].score }}% 的用户推荐
                    </span>
                  </v-tooltip>
                </div>
                <v-divider class="my-2"/>
                <v-icon
                  class="mr-2"
                  small
                >
                  far fa-clock
                </v-icon>
                <span class="caption grey--text font-weight-light">
                  上次更新 {{ game.game_reviews[game.game_reviews.length - 1].created_at }}
                </span>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex 
            v-if="game.game_prices.length > 0" 
            xs12 
            md6 
            xl3 
            class="px-3">
            <v-card
              class="mt-5"
            >
              <v-sheet
                class="v-sheet--offset mx-auto"
                color="cyan"
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
                    small>
                    -{{ game.game_prices[game.game_prices.length -1].discount }}%
                  </v-chip>
                </div>
                <div class="subheading font-weight-light grey--text">
                  <span>
                    当前价格: 
                    <del>
                      ￥{{ game.game_prices[game.game_prices.length -1].initial }}
                    </del>
                  </span>
                  <span class="red--text">
                    ￥{{ game.game_prices[game.game_prices.length -1].final }}
                  </span>
                </div>
                <v-divider class="my-2"/>
                <v-icon
                  class="mr-2"
                  small
                >
                  far fa-clock
                </v-icon>
                <span class="caption grey--text font-weight-light">
                  上次更新 {{ game.game_prices[game.game_prices.length -1].created_at }}
                </span>
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
            xl3 
            class="px-3">
            <v-card
              class="mx-auto"
            >
              <v-card-title>
                <v-icon
                  large
                  left
                >
                  fas fa-info-circle
                </v-icon>
                <span class="title font-weight-light">游戏信息</span>
              </v-card-title>

              <v-card-text class="headline text-xs-left">
                <v-layout 
                  align-start 
                  justify-start 
                  fill-height 
                  column 
                  wrap>
                  <div>
                    游戏名: {{ game.name }}
                  </div>
                  <div>
                    游戏类型: {{ game.type }}
                  </div>
                  <div>
                    支持语言: <span v-html="game.languages"/>
                  </div>
                  <div>
                    支持系统: {{ game.platforms }}
                  </div>
                  <div>
                    发行商: {{ game.publishers }}
                  </div>
                  <div>
                    发行日期: {{ game.released_at }}
                  </div>
                  <div>
                    最后更新于: {{ game.updated_at }}
                  </div>
                  <div v-if="game.game_tags">
                    游戏标签: <br>
                    <v-chip 
                      v-for="(item, i) in game.game_tags" 
                      :key="i">
                      {{ item.tag }}
                    </v-chip>
                  </div>
                </v-layout>
              </v-card-text>

              <v-card-actions>
                <v-list-tile class="grow">
                  <v-list-tile-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      src="/logo.png"
                    />
                  </v-list-tile-avatar>

                  <v-btn 
                    :href="`https://store.steampowered.com/app/${game.appid}`" 
                    round 
                    dark 
                    small 
                    target="_black">
                    购买 
                    <span 
                      v-if="game.game_prices.length > 0" 
                      class="ml-2">
                      ￥ {{ game.game_prices[game.game_prices.length -1].final }}
                    </span>
                  </v-btn>

                  <v-layout
                    align-center
                    justify-end
                  >
                    <span 
                      v-if="game.game_reviews.length > 0" 
                      class="subheading ml-2">
                      {{ game.game_reviews[0].score }}% 的 Steam 用户推荐
                    </span>
                    <span 
                      v-else 
                      class="subheading ml-2">
                      用户评分未知
                    </span>
                  </v-layout>
                </v-list-tile>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex 
            xs12 
            md6 
            xl3 
            class="px-3">
            <v-card
              class="mx-auto"
            >
              <v-card-title>
                <v-icon
                  large
                  left
                >
                  far fa-smile-beam
                </v-icon>
                <span class="title font-weight-light">媒体均分</span>
              </v-card-title>

              <v-card-text 
                v-if="game.metacritic_review_score" 
                class="headline font-weight-bold">
                <v-progress-circular
                  :rotate="-90"
                  :size="150"
                  :width="15"
                  :value="game.metacritic_review_score"
                  color="cyan"
                >
                  <h2 class="title">
                    {{ game.metacritic_review_score }}
                  </h2>
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
                  color=""
                >
                  <h2 class="title">
                    评分未知
                  </h2>
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
              class="mx-auto mt-5"
            >
              <v-card-title>
                <v-icon
                  large
                  left
                >
                  far fa-file-video
                </v-icon>
                <span class="title font-weight-light">媒体宣传</span>
              </v-card-title>

              <v-layout 
                v-if="media.data.movies" 
                row 
                wrap>
                <v-flex
                  v-for="(item) in media.data.movies"
                  :key="item.thumbnail"
                  xs4
                >
                  <v-card 
                    flat 
                    tile>
                    <a 
                      :href="item.webm.max" 
                      target="_black">
                      <v-img
                        :src="item.thumbnail"
                        height="150px"
                      />
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
                  xs4
                >
                  <v-card 
                    flat 
                    tile>
                    <a 
                      :href="item.path_full" 
                      target="_black">
                      <v-img
                        :src="item.path_thumbnail"
                        height="150px"
                      />
                    </a>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>

        </v-layout>
      </div>
      <div v-if="loading === true">
        <loading class="primary--text" />
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
      tab: {
        model: this.$route.fullPath,
        color: 'grey-gradient',
        slider: {
          color: 'white'
        },
        centered: true,
        fixed: true,
        dark: true,
        item: [
          { title: this.$route.params.id, link: this.$route.fullPath },
          { title: '流行趋势', link: '/game/trending' }
        ]
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
</style>
