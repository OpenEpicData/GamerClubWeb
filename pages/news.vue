<template>
  <div>
    <Header class="mt-5" />

    <v-container>
      <div>
        <v-row>
          <v-col v-if="$store.state.data.news" cols="12">
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
    List: () => import('~/components/news/List')
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: '新闻',
          to: this.$route.path,
          exact: true
        }
      ]
    }
  },
  async mounted() {
    await this.$store.dispatch('fetch_news')
    await this.$store.dispatch('fetch_tags')
    await this.$store.dispatch('fetch_refs')
    await this.$store.dispatch('fetch_analysis_news')
  },
  head() {
    return {
      title: '业内新闻',
      meta: [
        {
          hid: 'news',
          name: 'description',
          content: '在 EpicGamer 里浏览最新的业界资讯。'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.sticky {
  position: sticky !important;
  top: 20px !important;
}
</style>
