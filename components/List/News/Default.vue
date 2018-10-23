<template>
  <div>
    <v-container fluid class="index-main-container">
      <v-list subheader two-line class="grey lighten-4" v-if="newsData">
        <template v-for="(item, k) in newsData">
          <v-divider inset :key="item.ID"></v-divider>
          <v-list-tile
            :key="k"
            avatar
            @click="openDialog(item.Link, item.Title)"
          >
            <v-list-tile-avatar v-if="item.Type">
              <span v-html="item.Type"></span>
            </v-list-tile-avatar>
            <v-list-tile-content v-if="item.Title">
              <v-list-tile-title v-html="item.Title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.Description"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action v-if="item.LastUpdated" class="hidden-md-and-down">
              <h5 class="grey--text"><span>{{ time(item.LastUpdated) }}</span></h5>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
      <v-divider inset></v-divider>
    </v-container>
    <div class="mx-5">
      <v-btn block large color="grey lighten-2 elevation-0" @click="loadMore()">
        <h4>{{ $t('Load more') }}</h4>
        <v-icon right small class="g-blue-hydrogen-text">fas fa-long-arrow-alt-down</v-icon>
      </v-btn>
    </div>
    <v-dialog
      v-model="dialog.open"
      max-width="80%"
      lazy
    >
      <v-card height="90vh">
        <v-card-title class="headline">{{ dialog.title }}</v-card-title>
        <iframe :src="dialog.url" frameborder="0" width="100%" style="height: 90%" sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"></iframe>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
export default {
  props: ['newsData'],
  data: () => ({
    page: 1,
    dialog: {
      open: false,
      title: null,
      url: null
    },
  }),
  methods: {
    time: function (value) {
      if (this.$store.state.locale === 'zh-cn') return dayjs().locale('zh-cn').from(dayjs(value))
      if (this.$store.state.locale === 'en-us') return dayjs().from(dayjs(value))
    },
    loadMore: async function () {
      this.page ++
      let [newsData] = await Promise.all([
        axios.get('https://rest.steamhub.cn/api/v2/news/lists?size=20&type=' + this.type + '&page=' + this.page),
      ])
      this.newsData = this.newsData.concat(newsData.data.data)
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