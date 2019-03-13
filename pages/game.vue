<template>
  <div>
    <div
      class="secondary"
      style="height:15vh"
    />
    <v-container
      fluid
      class="text-xs-center"
    >
      <v-layout 
        row 
        wrap>
        <v-flex xs11>
          <nuxt-child />
        </v-flex>
        <v-flex xs1>
          <tabDefault
            :tab="tab"
            style="position:sticky; top: 15vh;"
          />
        </v-flex>
      </v-layout>
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
