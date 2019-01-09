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
          { title: '流行趋势', link: '/game/trending' },
          { title: '媒体高分', link: '/game/high-score' },
          { title: '浏览游戏', link: '/game/' }
        ]
      }
    }
  }
}
</script>
