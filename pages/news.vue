<template>
  <div id="top">
    <div 
      class="secondary" 
      style="height:15vh"/>
    <v-container>
      <v-layout 
        v-if="news && !loading" 
        row 
        wrap>
        <v-flex 
          v-for="(item, i) in news.data" 
          :key="i">
          <v-card 
            class="mx-3 my-3" 
            color="secondary" 
            dark 
            hover 
            @click="target(item.Link)">
            <v-img 
              :src="item.Image" 
              height="250"/>
            <v-card-title>
              <v-icon 
                large 
                left>far fa-newspaper</v-icon>
              <span class="title font-weight-light">{{ item.Site }}</span>
            </v-card-title>

            <v-card-text>
              <div class="headline font-weight-bold">
                <a 
                  :href="item.Link" 
                  class="white--text" 
                  target="_black">{{ item.Title }}</a>
              </div>

              <div class="my-3 subtitle-1">{{ item.Description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ item.Author }}</v-list-item-title>
                </v-list-item-content>

                <v-layout 
                  align-center 
                  justify-end>
                  <span class="subheading">{{ item.Type }}</span>
                </v-layout>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <div v-if="loading">
        <v-layout 
          align-start 
          justify-center 
          row 
          wrap>
          <v-flex 
            v-for="i in 20" 
            :key="i" 
            xs12 
            md6 
            class="px-3 my-3">
            <loading :loading="loading"/>
          </v-flex>
        </v-layout>
      </div>
      <v-layout 
        align-start 
        justify-center 
        row 
        wrap>
        <v-pagination 
          v-if="news && !loading" 
          v-model="page" 
          :length="news.last_page" 
          circle/>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import loading from '~/components/card/loading'

export default {
  components: {
    loading
  },
  data() {
    return {
      loading: true,
      size: 21,
      page: 1,
      news: null,
      head: {
        title: '游戏新闻 -- SteamHub',
        description: '在 SteamHub 上浏览游戏新闻'
      }
    }
  },
  watch: {
    page: async function(e) {
      document.getElementById('top').scrollIntoView()
      this.loading = true
      this.page = e
      const news = await this.$axios.$get(
        `https://rest.steamhub.cn/api/v2/news/lists?size=${this.size}&page=${
          this.page
        }`
      )
      this.page = news.current_page
      this.news = news
      this.loading = false
    }
  },
  async mounted() {
    const news = await this.$axios.$get(
      `https://rest.steamhub.cn/api/v2/news/lists?size=${this.size}&page=${
        this.page
      }`
    )
    this.page = news.current_page
    this.news = news
    this.loading = false
  },
  methods: {
    target: function(e) {
      window.open(e, '_blank')
    }
  },
  head() {
    return {
      title: this.head.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.head.description
        }
      ]
    }
  }
}
</script>
