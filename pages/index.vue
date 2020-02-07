<template>
  <div>
    <v-container>
      <div class="py-5 mt-5">
        <h2 class="display-2 secondary--text">
          本周头条
        </h2>
      </div>

      <div v-if="$store.state.data.news">
        <v-row>
          <v-col cols="12" md="9" xl="10">
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col
                    v-for="(item, i) in $store.state.data.news.top"
                    :key="i"
                    cols="6"
                    md="6"
                    xl="3"
                  >
                    <v-card
                      @click=";(dialog = true), (url = item.ref_link)"
                      hover
                      shaped
                      class="drop-shadow"
                    >
                      <v-img
                        :src="item.image ? item.image : ''"
                        height="20vh"
                        max-height="200px"
                      >
                        <div class="text-right">
                          <v-card-text>
                            <v-btn rounded small class="tertiary">
                              {{ item.tag.name }}
                              -
                              {{ item.ref.name }}
                            </v-btn>
                          </v-card-text>
                        </div>
                      </v-img>
                    </v-card>
                    <v-card-title
                      @click=";(dialog = true), (url = item.ref_link)"
                    >
                      <h4 class="title font-weight-bold text-truncate">
                        {{ item.title }}
                      </h4>
                    </v-card-title>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="3" xl="2">
            <v-row>
              <v-col v-if="$store.state.analysis.news" cols="12">
                <v-card shaped flat>
                  <v-list>
                    <v-subheader>
                      <h4 class="title secondary--text">
                        热门话题
                      </h4>
                    </v-subheader>
                    <v-list-item
                      v-for="(item, i) in $store.state.analysis.news.data"
                      :key="i"
                      @click="
                        $store.commit('setSearch', { query: item.title })
                        $store.dispatch('fetch_news')
                        $router.push('news')
                      "
                      dense
                    >
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.title }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <v-btn text small class="float-right" to="/news">
                    浏览所有新闻
                    <v-icon right>
                      mdi-arrow-right
                    </v-icon>
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <v-dialog
      v-model="dialog"
      max-width="1300px"
      scrollable
      transition="scroll-x-transition"
    >
      <v-card height="80vh">
        <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dialog: false,
      url: null
    }
  },
  async mounted() {
    await this.$store.dispatch('fetch_news')
    await this.$store.dispatch('fetch_analysis_news')
  },
  head() {
    return {
      title: '游戏玩家俱乐部'
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
