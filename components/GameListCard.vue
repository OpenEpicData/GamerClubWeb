<template>
  <v-flex d-flex xs12 lg9>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md6 lg4 v-for="(item,i) in list.data" :key="i" class="game-list-card px-3">
        <v-card v-if="item.AppType" flat class="grey lighten-4">
          <v-card-media style="cursor:pointer" :src="'https://cdn.steamstatic.com.8686c.com/steam/apps/' + item.AppID + '/header.jpg'" :lazy-src="'/unknow.jpg'" height="200px" v-on:click="cardTo(item.AppID)">
            <v-container fill-height fluid pa-2>
              <v-layout align-start justify-start row fill-height>
                <v-flex xs12 flexbox class="text-xs-right" v-if="item.AppsTypes">
                  <v-btn dark small color="grey" class="card-right-icon">
                    <v-icon left>
                      {{ item.AppsTypes.DisplayName | typeIcon }}
                    </v-icon>
                    {{ item.AppsTypes.DisplayName | typeName }}
                  </v-btn>
                  <v-btn class="card-right-attention-icon" small color="primary" dark :loading="dialogAttention" @click.stop="dialogAttention = true">
                    <v-icon left>
                      add
                    </v-icon>
                    关注
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title primary-title class="grey lighten-4">
            <v-layout row>
              <v-flex xs9>
                <nuxt-link :to="'/apps/'+ item.AppID" style="text-decoration: none;color: #000">
                  <span class="grey--text">更新于: {{ item.LastUpdated | time }}</span>
                  <h3 class="mb-0">
                    {{ item.Name.slice(0, 20) }}...
                  </h3>
                </nuxt-link>
              </v-flex>
              <v-flex xs3 class="text-xs-right" v-if="item.AppsTypes">
                <v-chip label class="text-xs-right">
                  {{ item.AppID }}
                </v-chip>
              </v-flex>
            </v-layout>
          </v-card-title>
        </v-card>

        <v-card v-else flat class="grey lighten-4">
          <v-card-media :lazy-src="'/unknow.jpg'" height="200px">
            <v-container fill-height fluid pa-2>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox class="text-xs-right">
                  <v-btn dark small color="grey">
                    <v-icon left>device_unknown</v-icon> 未知 </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-media>
          <v-card-title primary-title class="grey lighten-4">
            <v-layout row>
              <v-flex xs9>
                <span class="grey--text">更新于: {{ item.LastUpdated | time }}</span>
                <h3 class="mb-0">
                  未知应用...
                </h3>
              </v-flex>
              <v-flex xs3 class="text-xs-right">
                <v-chip label class="text-xs-right">
                  {{ item.AppID }}
                </v-chip>
              </v-flex>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialogAttention" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          功能开发中
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<style>
  .card-right-attention-icon {
    display: none;
  }

  .game-list-card :hover .card-right-icon {
    display: none;
  }

  .game-list-card :hover .card-right-attention-icon {
    display: inline;
  }
  @media (max-width: 960px) {
    .card-right-attention-icon {
      display: inline;
    }
    .card-right-icon {
      display: none;
    }
  }
</style>

<script>
  import relativeTime from 'dayjs/plugin/relativeTime'
  import dayjs from 'dayjs'

  import 'dayjs/locale/zh-cn'
  dayjs.extend(relativeTime)

  export default {
    props: ['list'],
    data () {
      return {
        dialogAttention: false,
        page: this.page
      }
    },
    methods: {
      cardTo: function (id) {
        this.$router.push({path: '/apps/' + id})
      }
    },
    created: function () {
      this.page = parseInt(this.list.page)
    },
    watch: {
      dialogAttention (val) {
        if (!val) return
        setTimeout(() => (this.dialogAttention = false), 1000)
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
