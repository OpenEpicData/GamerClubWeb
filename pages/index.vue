<template>
  <v-container>
    <div v-if="news">
      <v-row>
        <v-col
          v-for="(item, i) in news.data"
          :key="i"
          xs="6"
          sm="6"
          md="4"
          xl="3"
          cols="12"
          class="pa-5"
        >
          <v-card
            class="mx-auto secondary-primary"
            elevation="6"
            @click=";(dialog = true), (url = item.ref_link)"
          >
            <v-img :src="item.image" height="200px"></v-img>

            <v-card-title>
              <span class="subtitle-1 text-truncate">{{ item.title }}</span>
            </v-card-title>

            <v-card-text class="text-truncate">
              <span class="tertiary--text subtitle-2">
                {{ item.description }}
              </span>
            </v-card-text>

            <v-toolbar dense color="secondary-primary">
              <v-btn color="primary tertiary--text" x-small>
                {{ item.ref.name }}
              </v-btn>
              <v-btn color="success" x-small>{{ item.tag.name }}</v-btn>

              <v-spacer></v-spacer>

              <v-btn color="secondary tertiary--text" x-small>
                {{ item.author }}
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>

      <v-pagination
        v-model="page"
        class="news-pagination"
        :length="news.last_page"
        color="primary"
        circle
      ></v-pagination>

      <v-dialog v-model="dialog" max-width="60vw">
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
        <v-col
          v-for="i in 8"
          :key="i"
          xs="6"
          sm="6"
          md="4"
          xl="3"
          cols="12"
          class="pa-5"
        >
          <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      news: null,
      dialog: false,
      url: null,
      page: null
    }
  },
  watch: {
    async page(oldVal, newVal) {
      await this.fecth_news()
    }
  },
  async mounted() {
    await this.fecth_news()
  },
  methods: {
    async fecth_news() {
      this.news = null
      const fetchNews = await this.$axios.get(
        `/api/article/news?length=16&page=${this.page}`
      )
      const data = fetchNews.data
      this.page = data.current_page
      this.news = data
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
</style>
