<template>
  <div>
    <div v-if="$store.state.data.news">
      <v-sheet
        v-if="$store.state.data.news.top.length > 0"
        color="primary"
        dark
        tile
      >
        <v-container>
          <div class="my-12">
            <v-row
              v-for="(item, i) in $store.state.data.news.top.slice(0, 1)"
              :key="i"
            >
              <v-col cols="12" lg="4">
                <div class="subtitle-1">
                  <a
                    @click="
                      $store.commit('setSearch', { refName: item.ref.name })
                      $store.dispatch('fetch_news')
                      $router.push('news')
                    "
                    class="text-uppercase accent--text"
                    >{{ item.ref.name }}</a
                  >

                  <span class="font-weight-regular ml-5 accent--text">
                    {{
                      $dayjs(item.updated_at).format('MMM DD, YYYY @ HH:mmA')
                    }}
                  </span>
                </div>

                <div class="display-1 mt-10" style="line-height: 1.2;">
                  <a
                    @click=";(dialog = true), (url = item.ref_link)"
                    class="white--text"
                  >
                    <h3 class="font-weight-regular">{{ item.title }}</h3>

                    <h3 class="font-weight-regular">{{ item.description }}</h3>
                  </a>
                </div>
              </v-col>

              <v-col cols="12" lg="6" xl="5" offset-lg="1">
                <a @click=";(dialog = true), (url = item.ref_link)">
                  <v-img :src="item.image ? item.image : ''"></v-img>
                </a>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-sheet>

      <v-container>
        <div>
          <v-row>
            <v-col cols="12" lg="10">
              <v-row
                v-for="(item, i) in $store.state.data.news.latest.data"
                :key="i"
                class="my-12"
              >
                <v-col cols="12" md="5" xl="5">
                  <div class="subtitle-1">
                    <a
                      @click="
                        $store.commit('setSearch', { refName: item.ref.name })
                        $store.dispatch('fetch_news')
                        $router.push('news')
                      "
                      class="text-uppercase black--text"
                      >{{ item.ref.name }}</a
                    >

                    <span class="font-weight-regular ml-5">
                      {{
                        $dayjs(item.updated_at).format('MMM DD, YYYY @ HH:mmA')
                      }}
                    </span>
                  </div>

                  <div class="display-1 mt-10" style="line-height: 1.2;">
                    <a
                      @click=";(dialog = true), (url = item.ref_link)"
                      class="black--text"
                    >
                      <h3 class="font-weight-regular">{{ item.title }}</h3>

                      <h3 class="font-weight-regular line-clamp-2">
                        {{ item.description }}
                      </h3>
                    </a>
                  </div>
                </v-col>

                <v-col cols="12" md="6" xl="5" offset-lg="1">
                  <a @click=";(dialog = true), (url = item.ref_link)">
                    <v-img :src="item.image ? item.image : ''"></v-img>
                  </a>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" lg="2">
              <v-row style="position: sticky;top: 0; ">
                <v-col v-if="$store.state.analysis.news" cols="12">
                  <v-card flat>
                    <v-list>
                      <v-subheader>
                        <h4 class="title">热门话题</h4>
                      </v-subheader>
                      <v-list-item
                        v-for="(item, i) in $store.state.analysis.news.data"
                        :key="i"
                        @click="
                          $store.commit('setSearch', { query: item.title })
                          $store.dispatch('fetch_news')
                          $router.push('news')
                        "
                      >
                        <v-list-item-content>
                          <v-list-item-title>{{
                            item.title
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

                    <v-btn text class="float-right" to="/news">
                      浏览所有新闻
                      <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>

    <div v-else>
      <v-container>
        <v-skeleton-loader
          v-for="i in 8"
          :key="i"
          type="article"
        ></v-skeleton-loader>
      </v-container>
    </div>

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

    <v-btn
      @click="$vuetify.goTo(0, 'easeInOutCubic')"
      color="primary"
      dark
      fixed
      bottom
      right
      fab
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
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
