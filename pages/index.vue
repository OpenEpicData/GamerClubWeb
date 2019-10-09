<template>
  <v-container>
    <v-row v-if="news">
      <v-col
        v-for="(item, i) in news"
        :key="i"
        xs="6"
        sm="6"
        md="4"
        xl="3"
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

    <v-dialog v-model="dialog" max-width="60vw">
      <v-card height="80vh">
        <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      news: null,
      dialog: false,
      url: null
    }
  },
  async mounted() {
    const fetchNews = await this.$axios.get(`/api/article/news`)
    this.news = fetchNews.data.data
  }
}
</script>
