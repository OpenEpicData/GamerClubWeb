<template>
  <div class="black">
    <v-card flat style="position: fixed;width: 50%;margin: 2vh auto 0 auto;left:0;right:0;z-index: 2;background-color:transparent">
      <h2 class="text-xs-center subheading">
        <v-btn dark>
          <span v-for="(item,i) in news" :key="i" class="px-3">
            <nuxt-link :to="item.link"  v-if="item.link === $route.path ? active = true : ''"  :class="active ? 'white--text' : ''">
              {{ item.title }}
            </nuxt-link>
            <nuxt-link :to="item.link" v-else class="grey--text">{{ item.title }}</nuxt-link>
          </span>
        </v-btn>
      </h2>
    </v-card>
    <v-container fluid grid-list-sm class="index-main-container">
      <div class="page-main">
        <v-card flat dark color="black">
          <nuxt-child />
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      news: [
        {
          title: this.$t('global.page.topic.default.title'),
          link: this.$i18n.path('topic')
        },
        {
          title: this.$t('global.page.topic.news.title'),
          link: this.$i18n.path('topic/news')
        },
        {
          title: this.$t('global.page.topic.reviews.title'),
          link: this.$i18n.path('topic/evaluation')
        }
      ],
      active: false
    }
  },
  mounted: async function () {
  },
}
</script>

<style>
a:-webkit-any-link {
  text-decoration: none;
}
</style>

<style lang="stylus" scoped>
@media only screen and (max-width: 959px)
    .v-card
        width: 100% !important
        margin-top: 0 !important

    .container
        padding-left: 0 !important
        padding-right: 0 !important
</style>