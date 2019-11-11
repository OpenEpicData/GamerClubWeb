<template>
  <v-container>
    <div>
      <v-row>
        <v-col cols="12" md="8" lg="8">
          <div>
            <v-row>
              <v-col v-if="$store.state.tags" cols="6" class="py-0">
                <v-select
                  v-model="$store.state.search.tagName"
                  :items="$store.state.tags"
                  @input="change_tag"
                  label="标签"
                  outlined
                ></v-select>
              </v-col>

              <v-col v-if="$store.state.refs" cols="6" class="py-0">
                <v-select
                  v-model="$store.state.search.refName"
                  :items="$store.state.refs"
                  @input="change_ref"
                  label="来源"
                  outlined
                ></v-select>
              </v-col>
            </v-row>

            <v-row
              v-if="
                $store.state.search.query ||
                  $store.state.search.tagName ||
                  $store.state.search.refName
              "
            >
              <v-col cols="12" sm="12">
                <v-banner single-line class="search-chip">
                  <v-chip
                    v-if="$store.state.search.query"
                    @click:close="
                      $store.commit('set_search_query', '')
                      $store.dispatch('fetch_news')
                    "
                    close
                    label
                    class="primary elevation-2"
                    >{{ $store.state.search.query }}</v-chip
                  >

                  <v-chip
                    v-if="$store.state.search.tagName"
                    @click:close="
                      $store.commit('set_search_tag_name', '')
                      $store.dispatch('fetch_news')
                    "
                    close
                    label
                    class="primary elevation-2"
                    >{{ $store.state.search.tagName }}</v-chip
                  >

                  <v-chip
                    v-if="$store.state.search.refName"
                    @click:close="
                      $store.commit('set_search_ref_name', '')
                      $store.dispatch('fetch_news')
                    "
                    close
                    label
                    class="primary elevation-2"
                    >{{ $store.state.search.refName }}</v-chip
                  >

                  <template v-slot:actions>
                    <v-btn
                      @click="
                        ;($store.state.search.query = ''),
                          ($store.state.search.tagName = ''),
                          ($store.state.search.refName = ''),
                          $store.dispatch('fetch_news')
                      "
                      color="secondary"
                      >清除所有</v-btn
                    >
                  </template>
                </v-banner>
              </v-col>
            </v-row>
          </div>

          <v-row v-if="$store.state.news">
            <v-col v-if="$store.state.news.top.length > 0" cols="12">
              <v-card class="mx-auto" shaped elevation="24" max-height="300px">
                <v-img
                  :src="$store.state.news.top[0].image"
                  :aspect-ratio="16 / 9"
                  gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
                  max-height="300px"
                >
                  <v-row class="fill-height mx-5">
                    <v-col
                      class="d-flex align-start flex-column"
                      cols="12"
                      md="7"
                    >
                      <v-rating
                        v-model="$store.state.news.top.length"
                        class="mb-auto"
                        readonly
                        color="amber"
                        dense
                        background-color="lime darken-4"
                      ></v-rating>

                      <v-sheet
                        @click="
                          ;(dialog = true),
                            (url = $store.state.news.top[0].ref_link),
                            (open_news = i)
                        "
                        class="link text-truncate transparent"
                        style="width:100%"
                      >
                        <span class="underline pointer title">
                          {{ $store.state.news.top[0].title }}
                        </span>
                      </v-sheet>
                    </v-col>

                    <v-col class="d-flex align-end flex-column">
                      <v-btn icon class="mb-auto">
                        <v-icon>mdi-share-outline</v-icon>
                      </v-btn>

                      <div>
                        <span class="mr-2">
                          <v-icon color="teal accent-2">
                            mdi-newspaper-variant-outline
                          </v-icon>
                          {{ $store.state.news.top[0].tag.name }}
                        </span>
                        <span>
                          <v-icon color="teal accent-2">
                            mdi-fire
                          </v-icon>
                          本周热门
                        </span>
                      </div>

                      <div class="mt-5">
                        <v-btn
                          @click="
                            ;(dialog = true),
                              (url = $store.state.news.top[0].ref_link),
                              (open_news = i)
                          "
                          color="secondary"
                          x-large
                        >
                          阅读更多
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-img>
              </v-card>
            </v-col>

            <v-col
              v-for="(item, i) in $store.state.news.latest.data"
              :key="i"
              cols="12"
            >
              <v-card class="mx-auto news_card" outlined>
                <v-row no-gutters>
                  <v-col md="9" class="mr-auto">
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
                        <span @click="change_ref(item.ref.name)" class="link">
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
                  <v-col v-if="item.image" cols="auto">
                    <v-avatar
                      @click="
                        ;(dialog = true), (url = item.ref_link), (open_news = i)
                      "
                      class="pointer"
                      size="125"
                      tile
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
            :length="$store.state.news.latest.last_page"
            class="news-pagination"
            color="primary"
            circle
          ></v-pagination>
        </v-col>

        <v-col cols="12" md="4" lg="4">
          <v-card outlined class="news_card">
            <v-card-title class="ml-1">
              热点趋势
            </v-card-title>
            <v-card-text v-if="$store.state.analysis.news">
              <v-btn
                v-for="(item, i) in $store.state.analysis.news.data"
                :key="i"
                @click="
                  $store.commit('set_search_query', item.title)
                  $store.dispatch('fetch_news')
                "
                class="ma-1"
                small
                outlined
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

      <v-dialog v-model="dialog" max-width="1300px" scrollable>
        <v-card height="80vh">
          <iframe
            :src="url"
            frameborder="0"
            width="100%"
            height="100%"
          ></iframe>
        </v-card>
      </v-dialog>
    </div>

    <v-btn
      @click="$store.dispatch('fetch_news')"
      color="parimary"
      dark
      fixed
      bottom
      right
      fab
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
.top-learn-more {
  margin: 0 calc(50% - 50vw);
}
</style>
