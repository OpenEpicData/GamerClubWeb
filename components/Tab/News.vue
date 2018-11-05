<template>
  <div>
    <v-tabs :v-model="1" centered fixed-tabs slider-color="white" color="black" dark>
      <v-tab v-for="(item, i) in news" :key="i" ripple>
        {{ item.title }}
      </v-tab>
      <v-tab-item v-for="(item, i) in news" :key="i">
        <v-card flat dark class="black">
          <div class="mt-4" v-if="newsData">
            <h2 class="text-xs-center">
              <nuxt-link :to="$i18n.path('topic/' + newsData.data[0].Title)" v-if="i === 0">{{ newsData.data[0].Title }}</nuxt-link>
            </h2>
          </div>
          <v-container fluid class="index-main-container">
            <v-list subheader v-if="newsData && i === 0" dark>
              <template v-for="(item, k) in newsData.data">
                <v-divider inset :key="item.Title"></v-divider>
                <v-list-tile
                  :key="item.ID"
                  avatar
                  :to="$i18n.path('topic/' + item.Title)"
                  v-if="k !== 0"
                  class="black"
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
            <v-btn block large dark :to="newsLink = i === 0 ? $i18n.path('topic') : i === 1 ? $i18n.path('topic/news') : i === 2 ? $i18n.path('topic/evaluation') : ''"  v-if="newsLinkText = i === 0 ? '最新资讯' : i === 1 ? '最新新闻' : '最新评测'">
              <h4>阅读更多
                <span class="red--text">{{ newsLinkText }}</span>
              </h4>
              <v-icon right small class="red--text">fas fa-long-arrow-alt-right</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <vs-prompt :vs-active.sync="dialog.open" :vs-title="dialog.title" class="news-tab-dialog" color='danger' :vs-buttons-hidden="true">
      <iframe :src="dialog.url" frameborder="0" width="100%" style="height: 100%" sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"></iframe>
    </vs-prompt>
  </div>
</template>


<style lang="stylus">
.news-tab-dialog
  .vs-dialog
    max-width 80vw !important
    height 90vh !important
    .vs-dialog-text
      height 85vh !important
</style>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
export default {
  props: ['newsData', 'newsOnly', 'evaluation'],
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
  }),
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
    },
  }
}
</script>

<style lang="stylus" scoped>
@media only screen and (max-width: 959px)
    .container
        padding-left: 0 !important
        padding-right: 0 !important

</style>


