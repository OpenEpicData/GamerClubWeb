<template>
  <div>
    <v-container>
      <div class="py-5">
        <v-badge>
          <template v-slot:badge v-if="$store.state.data.news">
            <v-icon dark small>mdi-magnify</v-icon>
            {{ $store.state.data.news.latest.total }}
          </template>
          <h2 class="display-2 secondary--text">
            业内新闻
          </h2>
        </v-badge>
      </div>

      <v-divider />

      <div>
        <v-row class="align-center">
          <v-col cols="12" md="9">
            <v-row>
              <v-col v-if="$store.state.data.tags" cols="6" md="3">
                <v-select
                  v-model="$store.state.search.tagName"
                  :items="$store.state.data.tags"
                  @input="change_tag"
                  @click:clear="change_tag('')"
                  clearable
                  label="标签"
                  outlined
                  hide-details
                />
              </v-col>

              <v-col v-if="$store.state.data.refs" cols="6" md="3">
                <v-select
                  v-model="$store.state.search.refName"
                  :items="$store.state.data.refs"
                  @input="change_ref"
                  @click:clear="change_tag('')"
                  label="来源"
                  outlined
                  hide-details
                  clearable
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="search"
                  @keyup.enter="
                    $store.commit('setSearch', { query: search })
                    $store.dispatch('fetch_news')
                  "
                  :placeholder="$store.state.search.query"
                  @click:clear="
                    $store.commit('setSearch', { query: '' })
                    $store.dispatch('fetch_news')
                  "
                  flat
                  hide-details
                  label="搜索"
                  prepend-inner-icon="mdi-magnify"
                  single-line
                  outlined
                  solo
                  clearable
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="3">
            <v-row
              no-gutters
              class="justify-md-end align-center justify-space-between"
            >
              <v-col cols="3">
                排序：
              </v-col>

              <v-col cols="4">
                <v-btn block x-large disabled>
                  日期
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn block x-large disabled>
                  热门
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <v-divider />
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-color: #fafafa;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23cccccc' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23cccccc'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: auto 20vh;
}
</style>

<script>
export default {
  data() {
    return {
      search: this.$store.state.search.query,
      sort: null
    }
  },
  methods: {
    change_tag(data) {
      this.$store.commit('setSearch', { tagName: data })
      this.$store.dispatch('fetch_news')
    },
    change_ref(data) {
      this.$store.commit('setSearch', { refName: data })
      this.$store.dispatch('fetch_news')
    }
  }
}
</script>
