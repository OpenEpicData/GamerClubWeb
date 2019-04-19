<template>
  <nuxt-child/>
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
        color: 'primary',
        slider: {
          color: 'white'
        },
        centered: true,
        fixed: true,
        dark: true,
        item: [
          { title: '热门游戏', link: '/trending/hot' },
          { title: '玩家高分', link: '/trending/review' },
          { title: '最近更新', link: '/trending/latest' }
        ]
      }
    }
  }
}
</script>
