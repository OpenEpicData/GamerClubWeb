<template>
  <div>
    <div
      v-for="(item, i) in text"
      :key="i"
      class="mt-5"
    >
      <h1 class="display-1">
        {{ item.title }}
      </h1>
      <h2 class="subheading mt-2">
        {{ item.description }}
      </h2>

      <div v-if="popular && item.type === 'popular'">
        <v-layout
          align-start
          justify-center
          row
          wrap
        >
          <v-flex
            v-for="(item,i) in popular.slice(0, 4)"
            :key="i"
            xs12
            sm6
            md3
            xl2
            class="px-3 my-5"
          >
            <popularWithSmallCard
              v-if="item"
              :popular.sync="item"
            />
          </v-flex>
        </v-layout>
      </div>

      <div v-else-if="latest && item.type === 'latest'">
        <v-layout
          v-for="k in 2"
          :key="k"
          align-start
          justify-center
          row
          wrap
        >
          <v-flex
            v-for="(item,i) in latest.data.slice((k-1)*4,(k) * 4)"
            :key="i"
            xs12
            sm6
            md3
            xl2
            class="px-3 my-5"
          >
            <latestWithSmallCard
              :latest.sync="item"
            />
          </v-flex>
        </v-layout>
      </div>

      <div v-else-if="topReview && item.type === 'topReview'">
        <v-layout
          v-for="k in 2"
          :key="k"
          align-start
          justify-center
          row
          wrap
        >
          <v-flex
            v-for="(reviewItem, reviewIndex) in topReview.data.slice((k-1)*4,(k) * 4)"
            :key="reviewIndex"
            xs12
            sm6
            md3
            xl2
            class="px-3 my-5"
          >
            <reviewtWithSmallCard
              :review.sync="reviewItem"
            />
          </v-flex>
        </v-layout>
      </div>

      <div v-else>
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
    </div>
  </div>
</template>

<script>
import popularWithSmallCard from '~/components/card/trending/popular'
import latestWithSmallCard from '~/components/card/trending/latest'
import reviewtWithSmallCard from '~/components/card/trending/review'
export default {
  components: {
    popularWithSmallCard,
    latestWithSmallCard,
    reviewtWithSmallCard
  },
  data () {
    return {
      popular: null,
      latest: null,
      topReview: null,
      text: [
        {
          title: '时下热门',
          description: '你身边的大多数朋友都可能在玩',
          type: 'popular'
        },
        {
          title: '好评如潮',
          description: '来自每一位真实用户的评测,他们可不会说假话',
          type: 'topReview'
        },
        {
          title: '最近更新',
          description: '我们的后端数据程序正源源不断的拉取最新内容',
          type: 'latest'
        },
      ]
    }
  },
  async mounted () {
    await this.fetchTrending()
  },
  methods: {
    async fetchSomething (url) {
      return await this.$axios.$get(encodeURI(url))
    },
    async fetchTrending () {
      let [popular, latest, topReview] = await Promise.all([
        await this.fetchSomething('https://rest.steamhub.cn/api/v2/apps/trending'),
        await this.fetchSomething('https://rest.steamhub.cn/api/v2/apps/lists?page=1&param=8'),
        await this.fetchSomething('https://rest.steamhub.cn/api/v2/apps/reviews?type=top&param=8'),
      ])
      this.popular = popular
      this.latest = latest
      this.topReview = topReview
    }
  },
}
</script>

<style>
.v-card, .v-image__image {
  border-radius: .5rem;
}
</style>
