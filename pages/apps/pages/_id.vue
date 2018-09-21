<template>
  <div class="mt-5">
    <div id="ListGame" class="grey lighten-4" v-scroll="onScroll">
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="page-main mt-5">
          <div class="px-2">
              <v-btn color="g-purple-purplin mx-0" dark>
                <v-icon left>apps</v-icon>游戏
              </v-btn>
          </div>
          <v-layout class="px-2 mt-3" row wrap id="today">
            <v-flex xs12>
              <h2>
                记录在案的游戏: <span v-if="list[0]">{{ list[0].total }}</span>, 数据采集中...
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

  import 'dayjs/locale/zh-cn'
  dayjs.extend(relativeTime)

  export default {
    components: {
      ListGameCard
    },
    data: () => ({
      dialogAPI: false,
      page: 1,
      list: String
    }),
    methods: {
      async onScroll (e) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        let windowHeight = document.documentElement.clientHeight
        let scrollHeight = document.documentElement.scrollHeight
        if (scrollTop + windowHeight === scrollHeight) {
          let [apps] = await Promise.all([
            axios.get('https://rest.steamhub.cn/api/v2/apps/lists?param=36&page=' + (this.page + 1))
          ])
          this.page = apps.data.current_page
          this.list = this.list.concat(apps.data)
        }
      }
    },
    mounted: async function () {
      let [apps] = await Promise.all([
        axios.get('https://rest.steamhub.cn/api/v2/apps/lists?param=36&page=' + this.$route.params.id)
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
        return dayjs().locale('zh-cn').from(dayjs(value))
      }
    },
    head () {
      return {
        title: ' Steam 应用列表 -- SteamHub',
        meta: [
          { hid: 'description', name: 'description', content: 'SteamHub 为开发者提供第一手 Steam 应用数据' }
        ]
      }
    }
  }
</script>

