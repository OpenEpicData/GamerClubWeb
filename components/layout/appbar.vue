<template>
  <v-app-bar color="primary tertiary--text" app fixed clipped-left>
    <span class="title ml-3 mr-5">
      EpicData&nbsp;|
      <span class="font-weight-light">Gamer</span>
    </span>
    <v-text-field
      v-model="search"
      solo-inverted
      flat
      hide-details
      label="搜索"
      prepend-inner-icon="mdi-magnify"
      class="d-none d-md-flex"
      @keyup.enter="searching()"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn
      rounded
      large
      color="secondary"
      @click="$store.dispatch('fetch_changelog')"
      >更新日志
    </v-btn>
  </v-app-bar>
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
