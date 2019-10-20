<template>
  <v-app>
    <div>
      <v-app-bar color="primary tertiary--text">
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

        <v-btn rounded large color="secondary" disabled>加入抢先体验计划</v-btn>
      </v-app-bar>
    </div>
    <v-content class="secondary">
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      search: null
    }
  },
  methods: {
    searching() {
      this.$store.commit('set_search_query', this.search)
      this.$store.dispatch('fetch_news')
    }
  }
}
</script>

<style lang="scss">
.theme--dark.v-list {
  background: #3d4a5c !important;
}
.secondary-primary {
  background: linear-gradient(90deg, #3d4a5c, #243042);
}
.v-card {
  $height: 34px;
  .v-toolbar__content {
    height: $height !important;
  }
  .v-toolbar__content {
    padding: 0px 14px;
  }
}
</style>
