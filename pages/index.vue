<template>
  <v-container>
    <div>
      <v-row>
        <v-col v-if="$store.state.tags" cols="6" sm="6" xs="6" md="4" xl="3">
          <v-select
            v-model="$store.state.search.tagName"
            :items="$store.state.tags"
            label="标签"
            outlined
            @input="change_tag"
          ></v-select>
        </v-col>

        <v-col v-if="$store.state.refs" cols="6" sm="6" xs="6" md="4" xl="3">
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
        <v-col cols="12" sm="12" md="8" lg="8" xl="6">
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
            >
              {{ $store.state.search.query }}
            </v-chip>

            <v-chip
              v-if="$store.state.search.tagName"
              close
              label
              class="primary elevation-2"
              @click:close="
                $store.commit('set_search_tag_name', '')
                $store.dispatch('fetch_news')
              "
            >
              {{ $store.state.search.tagName }}
            </v-chip>

            <v-chip
              v-if="$store.state.search.refName"
              close
              label
              class="primary elevation-2"
              @click:close="
                $store.commit('set_search_ref_name', '')
                $store.dispatch('fetch_news')
              "
            >
              {{ $store.state.search.refName }}
            </v-chip>

            <template v-slot:actions>
              <v-btn
                color="secondary"
                @click="
                  ;($store.state.search.query = ''),
                    ($store.state.search.tagName = ''),
                    ($store.state.search.refName = ''),
                    $store.dispatch('fetch_news')
                "
              >
                清除所有
              </v-btn>
            </template>
          </v-banner>
        </v-col>
      </v-row>
    </div>

    <div v-if="$store.state.news">
      <v-row>
        <v-col
          v-for="(item, i) in $store.state.news.data"
          :key="i"
          xs="6"
          sm="6"
          md="4"
          xl="3"
          cols="12"
        >
          <v-card class="mx-auto secondary-primary" elevation="6">
            <v-img
              :src="item.image"
              height="200px"
              class="pointer"
              @click=";(dialog = true), (url = item.ref_link)"
            ></v-img>

            <v-card-title @click=";(dialog = true), (url = item.ref_link)">
              <span class="subtitle-1 text-truncate link pointer">{{
                item.title
              }}</span>
            </v-card-title>

            <v-card-text class="text-truncate">
              <span class="tertiary--text subtitle-2">{{
                item.description
              }}</span>
            </v-card-text>

            <v-toolbar dense color="secondary-primary" class="ref">
              <v-btn
                color="primary tertiary--text"
                x-small
                @click="change_ref(item.ref.name)"
                >{{ item.ref.name }}</v-btn
              >
              <v-btn
                color="success"
                x-small
                @click="change_tag(item.tag.name)"
                >{{ item.tag.name }}</v-btn
              >

              <v-spacer></v-spacer>

              <v-btn
                v-if="item.author"
                color="secondary tertiary--text"
                x-small
                @click="
                  $store.commit('set_search_query', item.author)
                  $store.dispatch('fetch_news')
                "
                >{{ item.author }}</v-btn
              >
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>

      <v-pagination
        v-model="page"
        class="news-pagination"
        :length="$store.state.news.last_page"
        color="primary"
        circle
      ></v-pagination>

      <v-dialog v-model="dialog" max-width="80vw">
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
    <div v-else>
      <v-row>
        <v-col v-for="i in 8" :key="i" xs="6" sm="6" md="4" xl="3" cols="12">
          <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
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
