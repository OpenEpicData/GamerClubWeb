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
      
      <v-layout row wrap class="mt-3">
        <v-flex xs12 sm6 md6 lg4 xl3 v-for="(item,i) in list.data" :key="i">
          <v-card :to="'/apps/' + item.AppID" v-if="item.AppType">
            <v-card-media :src="'https://steamcdn-a.opskins.media/steam/apps/' + item.AppID + '/header.jpg'" height="200px">
              <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox class="text-xs-right" v-if="item.AppsTypes">
                    <v-btn dark color="deep-purple lighten-1">
                      <v-icon left class="mt-1">{{ item.AppsTypes.DisplayName | typeIcon }}</v-icon> {{ item.AppsTypes.DisplayName | typeName }} </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">
                  <v-chip>
                    {{ item.AppID }}
                  </v-chip>
                  <v-btn>
                    {{ item.Name.slice(0, 20) }}
                  </v-btn>
                </h3>
                <h5 class="ml-3">更新于: {{ item.LastUpdated | time }}</h5>
              </div>
            </v-card-title>

          </v-card>
          <v-card v-else>
            <v-card-media :src="'/unknow.jpg'" height="200px">
              <v-container fill-height fluid pa-2>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox class="text-xs-right">
                      <v-btn dark color="red">
                        <v-icon left class="mt-1">device_unknown</v-icon> 未知 </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">
                  <v-chip>
                    {{ item.AppID }}
                  </v-chip>
                  <v-btn>
                    未知应用
                  </v-btn>
                </h3>
                <h5 class="ml-3">更新于: {{ item.LastUpdated | time }}</h5>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
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
  import axios from 'axios'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import dayjs from 'dayjs'

  import 'dayjs/locale/zh-cn'
  dayjs.extend(relativeTime)

  export default {
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