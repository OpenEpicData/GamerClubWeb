<template>
  <v-sheet v-if="gameDetail" tile>
    {{ gameDetail.data }}
    <v-parallax :src="gameDetail.background"></v-parallax>
    <v-container style="position: relative;top: -15vh">
      <v-row no-gutters>
        <v-col cols="12">
          <v-card class="px-5" dark color="primary">
            <v-row>
              <v-col cols="12" md="auto">
                <v-card flat>
                  <v-img
                    :src="
                      `https://steamcdn-a.akamaihd.net/steam/apps/${id}/capsule_616x353.jpg`
                    "
                    :height="353 / 3"
                    :width="616 / 3"
                  >
                  </v-img>
                </v-card>
              </v-col>

              <v-col>
                <div class="d-flex align-center">
                  <h1 class="display-1">
                    {{ gameDetail.name }}
                  </h1>

                  <v-btn rounded color="primary" class="ml-2" disabled>
                    关注
                  </v-btn>
                </div>

                <div>
                  <v-row class="subtitle-1  grey--text">
                    <v-col cols="12" md="6">
                      <span class="line-clamp-2">{{
                        gameDetail.short_description
                      }}</span>
                    </v-col>

                    <v-col cols="6" md="3">
                      <div>开发者: {{ gameDetail.developers[0] }}</div>
                      <div>发行商: {{ gameDetail.publishers[0] }}</div>
                    </v-col>

                    <v-col cols="6" md="3">
                      <div>类型：{{ gameDetail.type }}</div>
                      <div>免费：{{ gameDetail.is_free ? '是' : '否' }}</div>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-row>
          <v-col cols="3">
            <v-card dark color="primary">
              <v-navigation-drawer permanent width="100%" color="primary">
                <v-list dense rounded dark>
                  <v-list-item
                    v-for="item in navs"
                    :key="item.title"
                    :to="item.link"
                    active-class="primary"
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      gameDetail: null,
      id: null,
      navs: [
        {
          title: '主页',
          icon: 'home',
          link: '/game/' + this.$route.params.id
        },
        { title: '新闻', icon: 'newspaper' }
      ]
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.getGameDetail(this.id)
  },
  methods: {
    async getGameDetail(id) {
      const res = await this.$axios.get(
        `https://bird.ioliu.cn/v1?url=https://store.steampowered.com/api/appdetails/?appids=${id}&l=schinese`
      )

      const data = res.data[id]
      if (data.success && data.data) {
        this.gameDetail = data.data
      }
    }
  }
}
</script>
