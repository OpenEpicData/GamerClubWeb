<template>
  <div>
    <Header />

    <v-container>
      <div>
        <v-row>
          <v-col cols="12" md="4" lg="4">
            <Drawer class="sticky" />
          </v-col>

          <v-col v-if="$store.state.news" cols="12" md="8" lg="8">
            <List
              v-if="$store.state.news.top.length > 0"
              :news.sync="$store.state.news.top.slice(0, 3)"
              :title="`热门新闻`"
              class="mb-5"
            />

            <List
              :news.sync="$store.state.news.latest.data"
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
import Header from '~/components/layout/Header'
import Drawer from '~/components/layout/Drawer'
import List from '~/components/layout/List'
export default {
  components: {
    Header,
    Drawer,
    List
  },
  async mounted() {
    await this.$store.dispatch('fetch_news')
    await this.$store.dispatch('fetch_tags')
    await this.$store.dispatch('fetch_refs')
    await this.$store.dispatch('fetch_analysis_news')
  }
}
</script>

<style lang="scss">
.sticky {
  position: sticky;
  top: 20px;
}
</style>
