<template>
  <v-container
    fluid
    class="text-xs-center"
  >
    <fullScreenPromotion />
    <div class="mt-5">
      <h4 class="display-1">
        为开发人员/游戏爱好者提供全量数据
      </h4>
    </div>
    <div>
      <v-layout
        wrap
        row
        justify-center
        fill-height
        class="mt-5"
      >
        <v-flex
          v-for="i in 3"
          :key="i"
          xs4
          md3
          lg2
          class="px-3"
          style="border: 1px solid #fff;border-image: url(/border.svg) 1 round"
        >
          <div class="my-3">
            <h5 v-if="i === 1">
              <span
                v-if="gameTotal"
                class="headline"
              >
                {{ gameTotal.toLocaleString() }}
              </span>
              <span v-else>
                <v-progress-circular
                  indeterminate
                  color="primary"
                />
              </span>
              <br>
              <span class="subheading grey--text mt-2">
                已知游戏
              </span>
            </h5>
            <h5 v-if="i === 2">
              <span
                v-if="priceTotal"
                class="headline"
              >
                {{ priceTotal.toLocaleString() }}
              </span>
              <span v-else>
                <v-progress-circular
                  indeterminate
                  color="primary"
                />
              </span>
              <br>
              <span class="subheading grey--text mt-2">
                归档价格
              </span>
            </h5>
            <h5 v-if="i === 3">
              <span
                v-if="reviewTotal"
                class="headline"
              >
                {{ reviewTotal.toLocaleString() }}
              </span>
              <span v-else>
                <v-progress-circular
                  indeterminate
                  color="primary"
                />
              </span>
              <br>
              <span class="subheading grey--text mt-2">
                用户评测
              </span>
            </h5>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        align-start
        justify-center
        row
        wrap
        class="mt-5"
      >
        <v-flex
          v-for="(item,i) in tagWithSmall"
          :key="i"
          xs6
          md3
          lg2
          class="px-3 my-3"
        >
          <tagWithSmallCard
            :tagWithSmall="item"
            :tagTotal.sync="tagTotal"
            :tagReviewTotal.sync="tagReviewTotal"
          />
        </v-flex>
      </v-layout>
      <div class="mt-3">
        <v-btn
          outline
          large
          round
          to="/game/"
        >浏览所有游戏</v-btn>
      </div>
      <div class="mt-5">
        <h4 class="display-1">
          接下来您将了解到什么?
        </h4>
        <h6 class="subheading grey--text mt-2">
          SteamHub 的内容并不匮乏,浏览大多数报道，发现您喜爱的拓展知识。
        </h6>
      </div>
      
      <div class="my-5">
        <swiperWitchLargeCard
          v-if="news"
          :news.sync="news.data"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
import fullScreenPromotion from '~/components/jumbotron/fullScreenPromotion'
import tagWithSmallCard from '~/components/card/tag/small'
import swiperWitchLargeCard from '~/components/card/swiper/large'
export default {
  components: {
    fullScreenPromotion,
    tagWithSmallCard,
    swiperWitchLargeCard
  },
  data () {
    return {
      gameTotal: null,
      priceTotal: null,
      reviewTotal: null,
      tagTotal: null,
      tagReviewTotal: null,
      news: null,
      tagWithSmall: [
        {
          title: '动作',
          color: 'blue-gradient',
          dark: true,
          img: 'https://i.loli.net/2018/11/15/5bed6062dce47.png',
          knownGame: {
            title: '已知游戏',
          },
          knownReview: {
            title: '收录评测',
            total: this.actionGameReview
          }
        },
        {
          title: '开放世界',
          color: 'red-gradient',
          dark: true,
          img: 'https://i.loli.net/2018/11/15/5bed6061120a7.png',
          knownGame: {
            title: '已知游戏',
          },
          knownReview: {
            title: '收录评测',
          }
        },
        {
          title: '角色扮演',
          color: 'purple-gradient',
          dark: true,
          img: 'https://i.loli.net/2018/11/15/5bed60661504e.png',
          knownGame: {
            title: '已知游戏',
          },
          knownReview: {
            title: '收录评测',
          }
        },
        {
          title: '模拟',
          color: 'yello-gradient',
          dark: true,
          img: 'https://i.loli.net/2018/11/15/5bed60612e917.png',
          knownGame: {
            title: '已知游戏',
          },
          knownReview: {
            title: '收录评测',
          }
        },
      ]
    }
  },
  async mounted () {
    await this.fetchTags()
  },
  methods: {
    async fetchSomething (url) {
      return await this.$axios.$get(encodeURI(url))
    },
    async fetchTags () {
      let [gameTotal, priceTotal, reviewTotal, tagTotal, tagReviewTotal, news] = await Promise.all([
        await this.fetchSomething('https://rest.steamhub.cn/api/v2/apps/lists?math=count'),
        await this.fetchSomething('https://rest.steamhub.cn/api/v2/apps/prices?math=count'),
        await this.fetchSomething('https://rest.steamhub.cn/api/v2/apps/reviews?math=count'),
        await this.fetchSomething('https://rest.steamhub.cn/api/v2/apps/tags?name[]=动作&name[]=开放世界&name[]=角色扮演&name[]=模拟&math=count'),
        await this.fetchSomething('https://rest.steamhub.cn/api/v2/apps/tags?name[]=动作&name[]=开放世界&name[]=角色扮演&name[]=模拟&type=reviews&math=count'),
        await this.fetchSomething('https://rest.steamhub.cn/api/v2/news/lists?size=16'),
      ])
      this.gameTotal = gameTotal
      this.priceTotal = priceTotal
      this.reviewTotal = reviewTotal
      this.tagTotal = tagTotal
      this.tagReviewTotal = tagReviewTotal
      this.news = news
    }
  },
  head () {
    return {
      title: '全球 Steam 数据统计分析',
      meta: [
        { hid: 'description', name: 'description', content: 'SteamHub 是一个全球 Steam 的数据统计社区,每天为开发者和玩家提供实时的 价格,资讯 数据查询。' }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  padding: 0
}
</style>

