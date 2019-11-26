<template>
  <v-card flat color="transparent">
    <v-card-text>
      <h2 class="subtitle-2 mb-2">搜索条件</h2>

      <div
        v-if="
          $store.state.search.query ||
            $store.state.search.tagName ||
            $store.state.search.refName
        "
      >
        <v-chip
          v-if="$store.state.search.query"
          @click:close="
            $store.commit('setSearch', { query: '' })
            $store.dispatch('fetch_news')
          "
          close
          label
          >{{ $store.state.search.query }}</v-chip
        >

        <v-chip
          v-if="$store.state.search.tagName"
          @click:close="
            $store.commit('setSearch', { tagName: '' })
            $store.dispatch('fetch_news')
          "
          close
          label
          >{{ $store.state.search.tagName }}</v-chip
        >

        <v-chip
          v-if="$store.state.search.refName"
          @click:close="
            $store.commit('setSearch', { refName: '' })
            $store.dispatch('fetch_news')
          "
          close
          label
          >{{ $store.state.search.refName }}</v-chip
        >
      </div>
    </v-card-text>

    <v-card-text v-if="$store.state.analysis.news">
      <h2 class="subtitle-2 mb-2">热门趋势</h2>

      <v-btn
        v-for="(item, i) in $store.state.analysis.news.data.slice(0, 3)"
        :key="i"
        @click="
          $store.commit('setSearch', { query: item.title })
          $store.dispatch('fetch_news')
        "
        class="mr-1 mb-1"
        small
        outlined
        >{{ item.title }}</v-btn
      >
    </v-card-text>

    <v-card-text v-else>
      <v-row>
        <v-col v-for="i in 3" :key="i">
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text class="redio">
      <v-radio-group v-model="refName" hide-details>
        <template v-slot:label>
          <h2 class="subtitle-2">按来源筛选</h2>
        </template>

        <v-radio
          v-for="(item, i) in $store.state.data.refs"
          :key="i"
          :label="item"
          :value="item"
          color="primary"
        ></v-radio>
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      refName: this.$store.state.search.refName
    }
  },
  watch: {
    refName(newVal, oldVal) {
      this.$store.commit('setSearch', { refName: newVal })
      this.$store.dispatch('fetch_news')
    }
  }
}
</script>

<style lang="scss">
.redio {
  .v-input {
    margin-top: 0;
    padding-top: 0;
  }
}

.breadcrumbsClass {
  padding: 0 !important;
}
</style>
