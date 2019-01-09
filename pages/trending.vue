<template>
  <div>
    <div
      class="grey-gradient"
      style="height:20vh"
    />
    <tabDefault
      :tab="tab"
    />
    <v-container
      fluid
      class="text-xs-center"
    >
      <nuxt-child />
    </v-container>
  </div>
</template>

<script>
import tabDefault from '~/components/tab/default'
export default {
  components: {
    tabDefault
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
          { title: '热门游戏', link: '/trending/hot' },
          { title: '玩家高分', link: '/trending/review' },
          { title: '最近更新', link: '/trending/latest' },
          { title: '流行趋势', link: '/game/trending' }
        ]
      }
    }
  }
}
</script>
