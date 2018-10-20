<template>
  <div>
    <v-tabs :v-model="1" centered fixed-tabs color="grey lighten-4" slider-color="g-blue-hydrogen">
      <v-tab v-for="(item, i) in news" :key="i" ripple>
        {{ item.title }}
      </v-tab>
      <v-tab-item v-for="(item, i) in news" :key="i">
        <v-card flat color="grey lighten-4">
          <div class="mt-4">
            <h2 class="text-xs-center g-blue-hydrogen-text">10月19日网站更新公告</h2>
          </div>
          <v-container fluid class="index-main-container">
            <v-list subheader class="grey lighten-4">
              <template v-for="(item, i) in 5">
                <v-divider inset :key="item"></v-divider>
                <v-list-tile
                  :key="item"
                  avatar
                >
                  <v-list-tile-avatar>
                    <span v-html="'新闻'"></span>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-sub-title v-html="'加班这么常见，怎么就成了欧美游戏业的“政治错误”？'"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <h5 class="grey--text"><span>10/19</span></h5>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
            <v-divider inset :key="item"></v-divider>
          </v-container>
          <div class="mx-5">
            <v-btn block large color="grey lighten-2 elevation-0">
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
    ]
  })
}
</script>
