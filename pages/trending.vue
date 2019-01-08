<template>
  <div>
    <div
      class="grey-gradient"
      style="height:20vh"
    />
    <tabDefault 
      :tab="tab"
    />
    <VContainer
      fluid
      class="text-xs-center"
    >
      <nuxt-child />
    </VContainer>
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
          { title: '趋势', link: '/game/trending' }
        ]
      }
    }
  }
}
</script>
