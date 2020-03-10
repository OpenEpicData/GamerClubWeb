<template>
  <div>
    <v-sheet color="grey darken-3" dark>
      <v-container>
        <v-alert text>
          <v-row justify="center" class="subtitle-1">
            <v-col cols="auto">
              2020/3/10
            </v-col>

            <v-col cols="auto">
              OpenEpicData · Curator: We are propulsion the project redesign
              check out:
              <a
                href="https://t.co/NArFpwwaJ4"
                target="_blank"
                rel="noopener noreferrer"
                class="white--text"
                >https://github.com/OpenEpicData/GamerClubWeb</a
              >
            </v-col>
          </v-row>
        </v-alert>

        <div v-if="$store.state.data.news" class="my-12">
          <v-row
            v-for="(item, i) in $store.state.data.news.top.slice(0, 1)"
            :key="i"
          >
            <v-col cols="12" md="4">
              <div class="subtitle-1">
                <a
                  @click="
                    $store.commit('setSearch', { refName: item.ref.name })
                    $store.dispatch('fetch_news')
                    $router.push('news')
                  "
                  class="text-uppercase white--text"
                >
                  {{ item.ref.name }}
                </a>

                <span class="font-weight-regular ml-5">
                  {{ $dayjs(item.updated_at).format('MMM DD, YYYY @ HH:mmA') }}
                </span>
              </div>

              <div class="display-1 mt-10" style="line-height: 1.2;">
                <a
                  @click=";(dialog = true), (url = item.ref_link)"
                  class="white--text"
                >
                  <h3 class="font-weight-regular">
                    {{ item.title }}
                  </h3>

                  <h3 class="font-weight-regular">
                    {{ item.description }}
                  </h3>
                </a>
              </div>
            </v-col>

            <v-col cols="12" md="8" class="pl-12">
              <a @click=";(dialog = true), (url = item.ref_link)">
                <v-img :src="item.image"></v-img>
              </a>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-sheet>

    <v-container>
      <div v-if="$store.state.data.news">
        <v-row>
          <v-col cols="12" md="9" xl="10">
            <v-row
              v-for="(item, i) in $store.state.data.news.latest.data"
              :key="i"
              class="my-12"
            >
              <v-col cols="12" md="4">
                <div class="subtitle-1">
                  <a
                    @click="
                      $store.commit('setSearch', { refName: item.ref.name })
                      $store.dispatch('fetch_news')
                      $router.push('news')
                    "
                    class="text-uppercase black--text"
                  >
                    {{ item.ref.name }}
                  </a>

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
                    <h3 class="font-weight-regular">
                      {{ item.title }}
                    </h3>

                    <h3 class="font-weight-regular">
                      {{ item.description }}
                    </h3>
                  </a>
                </div>
              </v-col>

              <v-col md="1"></v-col>
              <v-col cols="12" md="6">
                <a @click=";(dialog = true), (url = item.ref_link)">
                  <v-img :src="item.image"></v-img>
                </a>
              </v-col>
            </v-row>

            <v-row>
              <v-col
                v-for="(item, i) in $store.state.data.news.latest.data"
                :key="i"
                cols="6"
                md="4"
                lg="3"
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
                <v-card-title @click=";(dialog = true), (url = item.ref_link)">
                  <h4 class="subtitle-1 font-weight-bold text-truncate">
                    {{ item.title }}
                  </h4>
                </v-card-title>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="3" xl="2">
            <v-row style="position: sticky;top: 0; ">
              <v-col v-if="$store.state.analysis.news" cols="12">
                <v-card flat>
                  <v-list>
                    <v-subheader>
                      <h4 class="title">
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
                    >
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.title }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <v-btn text class="float-right" to="/news">
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
