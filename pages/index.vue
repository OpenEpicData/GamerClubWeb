<template>
  <div>
    <Header />

    <v-container style="position: relative;top: -50px;">
      <div>
        <v-row>
          <v-col v-if="options" cols="12">
            <Chart :options.sync="options" :series.sync="series" />
          </v-col>

          <v-col cols="12" md="4" lg="4">
            <Drawer class="sticky" />
          </v-col>

          <v-col v-if="$store.state.data.news" cols="12" md="8" lg="8">
            <List
              v-if="
                $store.state.data.news.top.length > 0 &&
                  !$store.state.search.query &&
                  !$store.state.search.tagName &&
                  !$store.state.search.refName
              "
              :news.sync="$store.state.data.news.top.slice(0, 3)"
              :title="`热门新闻`"
              class="mb-5"
            />

            <List
              :news.sync="$store.state.data.news.latest.data"
              :title="`刚刚发生`"
              :pagination="true"
            />
          </v-col>
        </v-row>
      </div>
    </v-container>

    <v-btn
      @click="$store.dispatch('fetch_news')"
      color="primary"
      dark
      fixed
      bottom
      right
      fab
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  components: {
    Header: () => import('~/components/news/Header'),
    Drawer: () => import('~/components/news/Drawer'),
    List: () => import('~/components/news/List'),
    Chart: () => import('~/components/steam/user/Chart')
  },
  data() {
    return {}
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`/api/game/steam/user_count`)
    return {
      series: [{ name: '在线人数', data: data.user }],
      options: {
        xaxis: {
          type: 'datetime',
          categories: data.created_at
        },
        theme: {
          monochrome: {
            enabled: true,
            color: '#085FF4'
          }
        }
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('fetch_news')
    await this.$store.dispatch('fetch_tags')
    await this.$store.dispatch('fetch_refs')
    await this.$store.dispatch('fetch_analysis_news')
    await this.$store.dispatch('fetch_steam_user_count')
  }
}
</script>

<style lang="scss">
.sticky {
  position: sticky !important;
  top: 20px !important;
}
</style>
