<template>
  <div id="GameList">
    <v-container grid-list-sm>
      <v-layout row wrap>
        <v-flex xs8>
          <v-btn color="deep-purple lighten-1" dark>
            <v-icon left class="mt-1">apps</v-icon>游戏
          </v-btn>
          <h4 class="mt-2">记录在案的游戏: {{ list.total }}, 数据采集中...</h4>
        </v-flex>
        <v-flex xs4>
          <div class="text-xs-right mt-3">
            <h3>第 {{ page }} 页</h3>
          </div>
        </v-flex>
      </v-layout>
      
      <GameListCard :list.sync="list"></GameListCard>
      <v-layout>
        <v-pagination
          v-model="page"
          :length=list.lastPage
        ></v-pagination>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import GameListCard from '~/components/GameListCard'
  import axios from 'axios'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import dayjs from 'dayjs'

  import 'dayjs/locale/zh-cn'
  dayjs.extend(relativeTime)

  export default {
    components: {
      GameListCard
    },
    async asyncData ({ params }) {
      return axios.get(`https://api.steamhub.cn/api/v1/steam/apps?list=` + params.id, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(function (response) {
          let page = parseInt(response.data.page)
          if (params.id === undefined) {
            page = 1
          }
          return { list: response.data, page: page }
        })
    },
    data: () => ({
      page: 1
    }),
    methods: {

    },
    watch: {
      page: function (newPage, oldPage) {
        this.$vuetify.goTo('#GameList', 'easyInQuad')
        this.$router.push({path: '/apps/pages/' + newPage})
        return axios.get(`https://api.steamhub.cn/api/v1/steam/apps?list=` + newPage, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
          .then(response => {
            this.list = response.data
          })
      }
    },
    filters: {
      time: function (value) {
        return dayjs().locale('zh-cn').from(dayjs(value))
      },
      typeName: function (value) {
        switch (value) {
          case 'Game':
            return '游戏'
          case 'Tool':
            return '工具'
          case 'Video':
            return '影音'
          case 'Application':
            return '应用'
          case 'Demo':
            return '试玩版'
          case 'DLC':
            return '扩充包'
          case 'Hardware':
            return '硬件'
          default:
            return '未知'
        }
      },
      typeIcon: function (value) {
        switch (value) {
          case 'Game':
            return 'games'
          case 'Tool':
            return 'build'
          case 'Video':
            return 'videocam'
          case 'Application':
            return 'apps'
          case 'Demo':
            return 'play_circle_outline'
          case 'DLC':
            return 'playlist_add'
          case 'Hardware':
            return 'computer'
          default:
            return 'device_unknown'
        }
      }
    }
  }
</script>