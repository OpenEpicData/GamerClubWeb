<template>
  <div class="mx-5">
    <v-card class="header tertiary" dark height="200px">
      <v-container class="fill-height">
        <v-row class="d-flex justify-center">
          <v-col cols="12" lg="10" xl="8">
            <div class="text-center">
              <h3 class="mt-5 display-1">
                查询到
                <span v-if="$store.state.data.news">
                  {{ $store.state.data.news.latest.total }}
                </span>
                条新闻
              </h3>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-container class="search">
      <v-row justify="center">
        <v-col cols="12" xs="8" md="8">
          <v-card raised>
            <v-row no-gutters>
              <v-col cols="6">
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
                ></v-text-field>
              </v-col>

              <v-col v-if="$store.state.data.tags" cols="6">
                <v-select
                  v-model="$store.state.search.tagName"
                  :items="$store.state.data.tags"
                  @input="change_tag"
                  label="标签"
                  outlined
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
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

.search {
  position: relative;
  top: -50px;
}
</style>

<style lang="scss">
.search {
  .v-input {
    border-radius: 0;
  }
}
</style>

<script>
export default {
  data() {
    return {
      search: this.$store.state.search.query
    }
  },
  methods: {
    change_tag(data) {
      this.$store.commit('setSearch', { tagName: data })
      this.$store.dispatch('fetch_news')
    }
  }
}
</script>
