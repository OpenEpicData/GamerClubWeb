<template>
  <div>
    <div id="ListGame" class="grey lighten-4" v-scroll="onScroll">
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="page-main mt-5">
          <div class="px-2">
              <v-btn color="g-purple-purplin mx-0" dark>
                <v-icon left>apps</v-icon>{{ $t('game') }}
              </v-btn>
          </div>
          <v-layout class="px-2 mt-3" row wrap id="today">
            <v-flex xs12>
              <h2>
                {{ $t('Recorded game') }}: <span v-if="list[0]">{{ list[0].total }}</span>
              </h2>
            </v-flex>
          </v-layout>
          <div class="my-3" id="ListGame">
            <div v-for="(item, i) in list" :key="i">
              <ListGameCard :list.sync="item.data"></ListGameCard>
            </div>
          </div>
        </div>
        <v-progress-linear :indeterminate="true" background-color="transparent" color="g-purple-purplin"></v-progress-linear>
      </v-container>
    </div>
  </div>
</template>

<script>
import ListGameCard from '~/components/List/Game/Card/Default'
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)

export default {
  components: {
    ListGameCard
  },
  data: () => ({
    dialogAPI: false,
    page: 1,
    list: String,
    cc: String
  }),
  methods: {
    async onScroll (e) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop
      let windowHeight = document.documentElement.clientHeight
      let scrollHeight = document.documentElement.scrollHeight
      if (scrollTop + windowHeight === scrollHeight) {
        let [apps] = await Promise.all([
          axios.get('https://rest.steamhub.cn/api/v2/apps/lists?param=36&page=' + (this.page + 1) + '&cc=' + this.cc)
        ])
        this.page = apps.data.current_page
        this.list = this.list.concat(apps.data)
      }
    }
  },
  mounted: async function () {
    let cc = 'cn'
    if (this.$store.state.locale === 'zh-cn') { cc = 'cn' }
    if (this.$store.state.locale === 'en-us') { cc = 'us' }
    this.cc = cc
    let [apps] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/v2/apps/lists?param=36&page=' + this.$route.params.id + '&cc=' + cc)
    ])
    let list = []
    let page = apps.data.current_page
    this.page = page
    this.list = list.concat(apps.data)
  },
  watch: {
    dialogAPI (val) {
      if (!val) return
      setTimeout(() => (this.dialogAPI = false), 1000)
    }
  },
  filters: {
    time: function (value) {
      return dayjs().from(dayjs(value))
    }
  },
  head () {
    return {
      title: this.$t('global.page.game.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('global.page.game.description') }
      ]
    }
  }
}
</script>

