<template>
  <div>
    <div id="ListGame" class="grey lighten-4" v-scroll="onScroll">
      <v-container fluid grid-list-sm>
        <div class="page-main">
          <v-layout class="px-2" row wrap>
            <div class="px-2">
              <vs-button type="line" icon="apps" size="large">
                {{ $t('game') }} 
                <span v-if="list[0]">{{ list[0].total }}</span>
              </vs-button>
            </div>
            <v-flex xs12>
              <div id="ListGame">
                <div v-for="(item, i) in list" :key="i">
                  <ListGameCard :list.sync="item.data" :xl2="true"></ListGameCard>
                </div>
              </div>
            </v-flex>
          </v-layout>
          <ListGameCardLoading></ListGameCardLoading>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import ListGameCard from '~/components/List/Game/Card/Default'
import ListGameCardLoading from '~/components/List/Game/Card/Loading'
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)

export default {
  components: {
    ListGameCard,
    ListGameCardLoading
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
        this.$store.commit('DISPLAY_LOADING', true)
        let [apps] = await Promise.all([
          axios.get('https://rest.steamhub.cn/api/v2/apps/lists?param=36&page=' + (this.page + 1) + '&cc=' + this.$store.state.display.country)
        ])
        this.page = apps.data.current_page
        this.list = this.list.concat(apps.data)
        this.$store.commit('DISPLAY_LOADING', false)
      }
    }
  },
  mounted: async function () {
    let [apps] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/v2/apps/lists?param=36&page=' + this.$route.params.id + '&cc=' + this.$store.state.display.country)
    ])
    let list = []
    let page = apps.data.current_page
    this.page = page
    this.list = list.concat(apps.data)
    this.$store.commit('DISPLAY_LOADING', false)
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

