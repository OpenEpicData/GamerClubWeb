<template>
  <div>
    <div
      class="grey-gradient"
      style="height:20vh"
    />
    <TabDefault 
      :tab="tab"
    />
    <VContainer
      fluid
      class="text-xs-center"
    >
      <NuxtChild />
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
          { title: '趋势', link: '/game/trending' },
          { title: '高分', link: '/game/high-score' },
          { title: '浏览', link: '/game/' }
        ]
      }
    }
  }
}
</script>
