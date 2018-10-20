<template>
  <div>
    <div class="grey lighten-4">
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="page-main">
          <v-card flat color="grey lighten-4">
            <div class="mt-4">
              <h2 class="text-xs-center">
                <span v-for="(item,i) in news" :key="i" class="mx-3">
                  <nuxt-link :to="item.link"  v-if="item.link === $route.path ? active = true : ''"  :class="active ? 'g-blue-hydrogen-text' : ''">
                    {{ item.title }}
                  </nuxt-link>
                  <nuxt-link :to="item.link" v-else class="black--text">{{ item.title }}</nuxt-link>
                </span>
              </h2>
            </div>
            <nuxt-child/>
          </v-card>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      news: [
        {
          title: '综合资讯',
          link: this.$i18n.path('topic')
        },
        {
          title: '业内新闻',
          link: this.$i18n.path('topic/news')
        },
        {
          title: '游戏评测',
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

<style scoped>
a:-webkit-any-link {
  text-decoration: none;
}
</style>
