<template>
  <div>
    <v-tabs :v-model="1" centered fixed-tabs color="grey lighten-4" slider-color="g-blue-hydrogen">
      <v-tab v-for="(item, i) in news" :key="i" ripple>
        {{ item.title }}
      </v-tab>
      <v-tab-item v-for="(item, i) in news" :key="i">
        <v-card flat color="grey lighten-4">
          <div class="mt-4" v-if="newsData">
            <h2 class="text-xs-center g-blue-hydrogen-text">
              <a :href="newsData.data[0].Link" target="_black" v-if="i === 0">{{ newsData.data[0].Title }}</a>
            </h2>
          </div>
          <v-container fluid class="index-main-container" v-if="newsData && i === 0">
            <v-list subheader class="grey lighten-4">
              <template v-for="(item, k) in newsData.data">
                <v-divider inset :key="item.Title"></v-divider>
                <v-list-tile
                  :key="item.ID"
                  avatar
                  :href="item.Link"
                  target="_black"
                  v-if="k !== 0"
                >
                  <v-list-tile-avatar v-if="item.Type">
                    <span v-html="item.Type"></span>
                  </v-list-tile-avatar>
                  <v-list-tile-content v-if="item.Title">
                    <v-list-tile-sub-title v-html="item.Title"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action v-if="item.LastUpdated">
                    <h5 class="grey--text"><span>{{ item.LastUpdated }}</span></h5>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
            <v-divider inset :key="item.ID"></v-divider>
          </v-container>
          <div class="mx-5">
            <v-btn block large color="grey lighten-2 elevation-0" v-if="i === 0">
              <h4>阅读更多
                <span class="g-blue-hydrogen-text">最新资讯</span>
              </h4>
              <v-icon right small class="g-blue-hydrogen-text">fas fa-long-arrow-alt-right</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    news: [
      {
        title: '综合'
      },
      {
        title: '公告'
      },
      {
        title: '攻略'
      }
    ],
    newsData: null
  }),
  mounted: async function () {
    let [newsData] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/v2/news/lists?size=6'),
    ])
    this.newsData = newsData.data
  }
}
</script>
