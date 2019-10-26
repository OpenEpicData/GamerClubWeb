<template>
  <v-container>
    <div>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="8" xl="6">
          <div>
            <v-row>
              <v-col v-if="$store.state.tags" cols="6">
                <v-select
                  v-model="$store.state.search.tagName"
                  :items="$store.state.tags"
                  label="标签"
                  outlined
                  @input="change_tag"
                ></v-select>
              </v-col>

              <v-col v-if="$store.state.refs" cols="6">
                <v-select
                  v-model="$store.state.search.refName"
                  :items="$store.state.refs"
                  label="来源"
                  outlined
                  @input="change_ref"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12">
                <v-banner
                  v-if="
                    $store.state.search.query ||
                      $store.state.search.tagName ||
                      $store.state.search.refName
                  "
                  single-line
                  class="secondary search-chip"
                >
                  <v-chip
                    v-if="$store.state.search.query"
                    close
                    label
                    class="primary elevation-2"
                    @click:close="
                      $store.commit('set_search_query', '')
                      $store.dispatch('fetch_news')
                    "
                    >{{ $store.state.search.query }}</v-chip
                  >

                  <v-chip
                    v-if="$store.state.search.tagName"
                    close
                    label
                    class="primary elevation-2"
                    @click:close="
                      $store.commit('set_search_tag_name', '')
                      $store.dispatch('fetch_news')
                    "
                    >{{ $store.state.search.tagName }}</v-chip
                  >

                  <v-chip
                    v-if="$store.state.search.refName"
                    close
                    label
                    class="primary elevation-2"
                    @click:close="
                      $store.commit('set_search_ref_name', '')
                      $store.dispatch('fetch_news')
                    "
                    >{{ $store.state.search.refName }}</v-chip
                  >

                  <template v-slot:actions>
                    <v-btn
                      color="secondary"
                      @click="
                        ;($store.state.search.query = ''),
                          ($store.state.search.tagName = ''),
                          ($store.state.search.refName = ''),
                          $store.dispatch('fetch_news')
                      "
                      >清除所有</v-btn
                    >
                  </template>
                </v-banner>
              </v-col>
            </v-row>
          </div>
          <v-row v-if="$store.state.news">
            <v-col
              v-for="(item, i) in $store.state.news.data"
              :key="i"
              cols="12"
            >
              <v-card class="mx-auto secondary-primary news_card" outlined>
                <v-row no-gutters>
                  <v-col cols="9">
                    <div>
                      <v-card-title
                        @click="
                          ;(dialog = true),
                            (url = item.ref_link),
                            (open_news = i)
                        "
                      >
                        <v-sheet class="link text-truncate transparent">
                          <span class="underline pointer">
                            {{ item.title }}
                          </span>
                        </v-sheet>
                      </v-card-title>

                      <v-card-subtitle class="news_subtitle">
                        <span>
                          {{ item.description }}
                        </span>
                        <br />
                        <span class="link" @click="change_ref(item.ref.name)">
                          <span class=" pointer underline">
                            {{ item.ref.name }}
                          </span>
                        </span>

                        <span>
                          ·
                          {{ $dayjs.utc(item.updated_at).toNow() }}
                        </span>
                      </v-card-subtitle>
                    </div>
                  </v-col>
                  <v-col align="end" cols="3">
                    <v-avatar
                      class="pointer"
                      size="125"
                      tile
                      @click="
                        ;(dialog = true), (url = item.ref_link), (open_news = i)
                      "
                    >
                      <v-img :src="item.image"></v-img>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-row v-else>
            <v-col cols="12">
              <v-skeleton-loader
                v-for="i in 16"
                :key="i"
                class="mx-auto"
                type="list-item-avatar-three-line"
              ></v-skeleton-loader>
            </v-col>
            <v-col md="4"></v-col>
          </v-row>

          <v-pagination
            v-if="$store.state.news"
            v-model="page"
            class="news-pagination"
            :length="$store.state.news.last_page"
            color="primary"
            circle
          ></v-pagination>
        </v-col>

        <v-col cols="12" md="4" lg="4" xl="4">
          <v-card outlined color="secondary-primary" class="news_card">
            <v-card-title class="ml-1">
              热点趋势
            </v-card-title>
            <v-card-text v-if="$store.state.analysis.news">
              <v-btn
                v-for="(item, i) in $store.state.analysis.news.data"
                :key="i"
                class="ma-1"
                small
                outlined
                @click="
                  $store.commit('set_search_query', item.title)
                  $store.dispatch('fetch_news')
                "
              >
                {{ item.title }} {{ item.hit }}
              </v-btn>
            </v-card-text>

            <v-card-text v-else>
              <v-row>
                <v-col v-for="i in 16" :key="i" cols="2">
                  <v-skeleton-loader type="button"></v-skeleton-loader>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog">
        <v-card height="90vh" color="secondary-primary">
          <v-row class="fill-height" no-gutters>
            <v-col cols="12" xs="12" md="8" xl="9">
              <iframe
                :src="url"
                frameborder="0"
                width="100%"
                height="100%"
              ></iframe>
            </v-col>

            <v-col v-if="open_news" cols="12" md="4" xl="3">
              <v-card-title>
                <v-row justify="space-between">
                  <v-col cols="9">
                    {{ $store.state.news.data[open_news].title }}
                    <br />
                    <span class="tertiary--text  subtitle-2">
                      By {{ $store.state.news.data[open_news].author }}
                    </span>
                  </v-col>
                  <v-col align="right" cols="3">
                    <v-btn
                      icon
                      color="secondary"
                      depressed
                      @click="dialog = false"
                    >
                      <v-icon color="tertiary">
                        mdi-close-circle-outline
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col cols="12" xs="6" sm="6" md="5" xl="6">
                    <a
                      class="link white--text"
                      href="https://github.com/OpenEpicData/GamerClubAPI"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span class="underline">
                        EpicData Gamer Bot
                      </span>
                    </a>
                    <span class="tertiary--text subtitle-2">
                      最后抓取于
                      {{ $store.state.news.data[open_news].created_at }} UTC
                    </span>
                  </v-col>
                  <v-col cols="12" xs="6" sm="6" md="7" xl="6" align="right">
                    <v-btn large color="secondary" disabled>
                      收藏
                    </v-btn>
                    <v-btn large color="secondary" disabled>
                      <v-icon left>
                        mdi-thumb-up-outline
                      </v-icon>
                      0
                    </v-btn>
                  </v-col>
                </v-row>
                <v-text-field
                  disabled
                  color="tertiary"
                  class="mt-5"
                  label="说点什么？"
                  outlined
                  dense
                ></v-text-field>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </div>

    <v-btn
      color="parimary"
      dark
      fixed
      bottom
      right
      fab
      @click="$store.dispatch('fetch_news')"
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      url: null,
      open_news: null,
      page: 1
    }
  },
  watch: {
    page(oldVal, newVal) {
      this.$store.commit('set_search_page', this.page)
      this.$store.dispatch('fetch_news')
    },
    dialog(oldVal, newVal) {
      if (newVal) {
        this.url = null
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('fetch_news')
    await this.$store.dispatch('fetch_tags')
    await this.$store.dispatch('fetch_refs')
    await this.$store.dispatch('fetch_analysis_news')
  },
  methods: {
    async change_tag(data) {
      this.$store.commit('set_search_tag_name', data)
      await this.$store.dispatch('fetch_news')
    },

    async change_ref(data) {
      this.$store.commit('set_search_ref_name', data)
      await this.$store.dispatch('fetch_news')
    }
  }
}
</script>

<style lang="scss">
.news-pagination {
  button,
  i {
    background: #3d4a5c !important;
    color: #cccccc !important;
  }
}
.search-chip {
  .v-banner__wrapper {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
.ref {
  height: auto !important;
}
</style>
