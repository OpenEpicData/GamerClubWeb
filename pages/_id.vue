<template>
  <div v-if="game">
    <div 
      v-if="media && media.success === true && media.data" 
      fluid 
      class="text-xs-left">
      <v-sheet 
        height="100%" 
        tile>
        <v-img
          v-if="'screenshots' in media.data"
          :src="media.data.screenshots[0].path_full"
          aspect-ratio="16/9"
          height="60vh"
          gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.7), rgba(0,0,0,.9)"
        >
          <v-container fill-height>
            <v-layout 
              align-end 
              row 
              wrap 
              justify-space-between>
              <div>
                <div>
                  <h1>{{ game.name }}</h1>
                </div>
                <div>
                  <h4>
                    {{ game.developers }}
                    {{ game.type }}
                    <v-chip 
                      v-if="game.game_reviews.length > 0" 
                      small 
                      outlined>
                      <v-rating
                        v-if="rating = game.steam_user_review_score ? game.steam_user_review_score / 20 : null"
                        v-model="rating"
                        readonly
                        small
                        half-increments
                        color="secondary"
                        dense
                        background-color="secondary"
                      />
                      <v-avatar right>{{ game.steam_user_review_score / 10 }}</v-avatar>
                    </v-chip>
                  </h4>
                </div>
              </div>
              <div>
                <v-card>
                  <v-btn 
                    x-large 
                    color="accent" 
                    @click.stop="dialog.play = true">
                    <span v-if="game.price_final">购买 ￥{{ game.price_final / 100 }}</span>
                    <span v-else-if="game.free">立即游玩</span>
                  </v-btn>
                </v-card>
              </div>
            </v-layout>
          </v-container>
        </v-img>
      </v-sheet>
    </div>

    <v-dialog 
      v-if="game" 
      v-model="dialog.play" 
      max-width="500px">
      <v-card color="primary">
        <v-card-title class="headline">没有 Steam？</v-card-title>

        <v-card-text>您需要先安装 Steam 桌面应用程序才能安装并运行 {{ game.name }}。您是否已在本计算机上安装 Steam？</v-card-text>
        <v-card-actions>
          <v-layout 
            justify-start 
            column 
            align-start>
            <div>
              <v-btn :href="`steam://run/${game.appid}`">已经安装，立即开玩</v-btn>
              <v-btn href="https://media.st.dl.bscstorage.net/client/installer/SteamSetup.exe">下载客户端</v-btn>
            </div>
            <div>
              <v-switch 
                v-model="dialog.remember" 
                :label="`我已安装 Steam，下次不再弹出对话框`" 
                disabled/>
            </div>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container>
      <v-sheet 
        v-if="media && media.success === true && media.data" 
        class="mx-auto">
        <slideMedia :slide="media.data.screenshots"/>
      </v-sheet>
    </v-container>

    <v-container>
      <v-layout 
        align-start 
        justify-start 
        row 
        wrap>
        <v-flex xs3>
          <v-sheet class="mx-auto background">
            <v-divider/>
            <h2 class="mt-2">详细信息</h2>
            <h4 class="mt-2">发行商：{{ game.publishers }}</h4>
            <h4 class="mt-2">开发商：{{ game.developers }}</h4>
            <h4 class="mt-2">发行日期：{{ game.released_at }}</h4>
            <h4 class="mt-2">游戏类型：{{ game.type }}</h4>
          </v-sheet>
        </v-flex>

        <v-flex xs9>
          <v-sheet class="mx-auto background">
            <v-divider/>
            <h2 class="mt-2">介绍</h2>
            <p class="mt-2">{{ game.short_description }}</p>
            <h4 class="mt-2">详细描述</h4>
            <p 
              class="mt-2" 
              v-html="game.detailed_description.slice(0, 300)"/>
            <a 
              class="secondary--text" 
              @click.stop="dialog.view_more = true">显示更多</a>

            <v-divider class="mt-2"/>
            <h2 class="mt-2">功能</h2>
            <h4 v-if="media">
              <span 
                v-for="(item, k) in media.data.categories"
                :key="k" 
                class="mr-1">{{ item.description }}</span>
            </h4>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog 
      v-model="dialog.view_more" 
      max-width="500px">
      <v-card color="primary">
        <v-card-title class="headline">{{ game.name }} 详细描述</v-card-title>

        <v-card-text v-html="game.detailed_description"/>
      </v-card>
    </v-dialog>

    <v-container grid-list-xs>
      <v-layout 
        align-start 
        justify-start 
        row 
        wrap>
        <v-flex xs3>
          <v-sheet class="mx-auto background">
            <h2>平均评分</h2>
            <v-divider class="mt-2"/>
            <h4 class="display-1 mt-2">
              <span v-if="game.steam_user_review_score">
                {{ game.steam_user_review_score / 10 }}
              </span>
              <span v-else>
                NaN
              </span>
            </h4>
            <v-rating
              v-if="rating = game.steam_user_review_score ? game.steam_user_review_score / 20 : null"
              v-model="rating"
              readonly
              half-increments
              color="secondary"
              dense
              background-color="secondary"
              class="mt-2"
            />
          </v-sheet>
        </v-flex>
        <v-flex xs9>
          <v-sheet class="mx-auto background">
            <h2>
              评论
            </h2>
            <v-divider class="mt-2"/>
            <v-rating
              :v-model="5"
              readonly
              half-increments
              color="secondary"
              dense
              small
              background-color="secondary"
              class="mt-2"
            />
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import slideMedia from '~/components/slide/media'

export default {
  components: {
    slideMedia
  },
  data() {
    return {
      dialog: {
        play: false,
        switch: false,
        view_more: false
      },
      game: null,
      media: null,
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
      `https://bird.ioliu.cn/v1?url=https://store.steampowered.com/api/appdetails?appids=${id}&l=schinese`
    )
    const data = fetch_data.data[0]
    this.game = data
    this.media = fetch_media[id]
    if (data) {
      const title = data.name
      this.head.title = `${title} 的详细数据 -- SteamHub`
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
