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
          { title: '流行趋势', link: '/game/trending' },
          { title: '媒体高分', link: '/game/high-score' },
          { title: '浏览游戏', link: '/game/' }
        ]
      }
    }
  }
}
</script>
