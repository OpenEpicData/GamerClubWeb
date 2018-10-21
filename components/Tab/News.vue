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
              <a @click="openDialog(newsData.data[0].Link, newsData.data[0].Title)" v-if="i === 0">{{ newsData.data[0].Title }}</a>
              <a @click="openDialog(newsOnly.data[0].Link, newsOnly.data[0].Title)" v-else-if="i === 1">{{ newsOnly.data[0].Title }}</a>
              <a @click="openDialog(evaluation.data[0].Link, evaluation.data[0].Title)" v-else-if="i === 2">{{ evaluation.data[0].Title }}</a>
            </h2>
          </div>
          <v-container fluid class="index-main-container">
            <v-list subheader class="grey lighten-4" v-if="newsData && i === 0">
              <template v-for="(item, k) in newsData.data">
                <v-divider inset :key="item.Title"></v-divider>
                <v-list-tile
                  :key="item.ID"
                  avatar
                  @click="openDialog(item.Link, item.Title)"
                  v-if="k !== 0"
                >
                  <v-list-tile-avatar v-if="item.Type">
                    <span v-html="item.Type"></span>
                  </v-list-tile-avatar>
                  <v-list-tile-content v-if="item.Title">
                    <v-list-tile-sub-title v-html="item.Title"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action v-if="item.LastUpdated" class="hidden-md-and-down">
                    <h5 class="grey--text"><span>{{ time(item.LastUpdated) }}</span></h5>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
            <v-list subheader class="grey lighten-4" v-if="newsOnly && i === 1">
              <template v-for="(item, k) in newsOnly.data">
                <v-divider inset :key="item.Title"></v-divider>
                <v-list-tile
                  :key="item.ID"
                  avatar
                  @click="openDialog(item.Link, item.Title)"
                  v-if="k !== 0"
                >
                  <v-list-tile-avatar v-if="item.Type">
                    <span v-html="item.Type"></span>
                  </v-list-tile-avatar>
                  <v-list-tile-content v-if="item.Title">
                    <v-list-tile-sub-title v-html="item.Title"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action v-if="item.LastUpdated" class="hidden-md-and-down">
                    <h5 class="grey--text"><span>{{ time(item.LastUpdated) }}</span></h5>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
            <v-list subheader class="grey lighten-4" v-if="evaluation && i === 2">
              <template v-for="(item, k) in evaluation.data">
                <v-divider inset :key="item.Title"></v-divider>
                <v-list-tile
                  :key="item.ID"
                  avatar
                  @click="openDialog(item.Link, item.Title)"
                  v-if="k !== 0"
                >
                  <v-list-tile-avatar v-if="item.Type">
                    <span v-html="item.Type"></span>
                  </v-list-tile-avatar>
                  <v-list-tile-content v-if="item.Title">
                    <v-list-tile-sub-title v-html="item.Title"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action v-if="item.LastUpdated" class="hidden-md-and-down">
                    <h5 class="grey--text"><span>{{ time(item.LastUpdated) }}</span></h5>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
            <v-divider inset :key="item.ID"></v-divider>
          </v-container>
          <div class="mx-5">
            <v-btn block large color="grey lighten-2 elevation-0" :to="newsLink = i === 0 ? $i18n.path('topic') : i === 1 ? $i18n.path('topic/news') : i === 2 ? $i18n.path('topic/evaluation') : ''"  v-if="newsLinkText = i === 0 ? '最新资讯' : i === 1 ? '最新新闻' : '最新评测'">
              <h4>阅读更多
                <span class="g-blue-hydrogen-text">{{ newsLinkText }}</span>
              </h4>
              <v-icon right small class="g-blue-hydrogen-text">fas fa-long-arrow-alt-right</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-dialog
      v-model="dialog.open"
      max-width="80%"
      lazy
    >
      <v-card height="90vh">
        <v-card-title class="headline">{{ dialog.title }}</v-card-title>

        <iframe :src="dialog.url" frameborder="0" width="100%" style="height: 90%"></iframe>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
export default {
  data: () => ({
    news: [
      {
        title: '综合'
      },
      {
        title: '新闻'
      },
      {
        title: '评测'
      }
    ],
    dialog: {
      open: false,
      title: null,
      url: null
    },
    newsLink: null,
    newsData: null,
    newsOnly: null,
    evaluation: null,
  }),
  mounted: async function () {
    let [newsData, newsOnly, evaluation] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/v2/news/lists?size=6'),
      axios.get('https://rest.steamhub.cn/api/v2/news/lists?size=6&type=新闻'),
      axios.get('https://rest.steamhub.cn/api/v2/news/lists?size=6&type=评测'),
    ])
    this.newsData = newsData.data
    this.newsOnly = newsOnly.data
    this.evaluation = evaluation.data
  },
  methods: {
    time: function (value) {
      if (this.$store.state.locale === 'zh-cn') return dayjs().locale('zh-cn').from(dayjs(value))
      if (this.$store.state.locale === 'en-us') return dayjs().from(dayjs(value))
    },
    openDialog: function (url, title) {
      this.dialog = {
        open: true,
        title: title,
        url: url
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@media only screen and (max-width: 959px)
    .container
        padding-left: 0 !important
        padding-right: 0 !important

</style>


