<template>
  <v-row>
    <v-col class="bar">
      <v-toolbar flat>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          flat
          hide-details
          label="搜索"
          prepend-inner-icon="mdi-magnify"
          @keyup.enter="searching()"
        ></v-text-field>
      </v-toolbar>
    </v-col>

    <v-col>
      <v-toolbar flat>
        <v-btn v-if="$store.state.news" color="tertiary">
          <v-icon left>mdi-newspaper-variant-multiple-outline</v-icon>
          {{ $store.state.news.latest.total }}
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn text>
          <v-icon left>mdi-account-circle-outline</v-icon>
          登录
        </v-btn>
      </v-toolbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    search: null
  }),
  methods: {
    searching() {
      this.$store.commit('set_search_query', this.search)
      this.$store.dispatch('fetch_news')
    }
  }
}
</script>

<style lang="scss">
.bar {
  .v-toolbar__content {
    padding: 0 !important;
  }
}
</style>
