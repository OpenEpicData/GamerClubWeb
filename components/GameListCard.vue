<template>
  <v-layout row wrap class="mt-3" id="GameList">
    <v-flex xs12 sm6 md6 lg4 xl3 v-for="(item,i) in list.data" :key="i" class="game-list-card">
      <v-card v-if="item.AppType">
        <v-card-media :to="'/apps/' + item.AppID"  :src="'https://steamcdn-a.opskins.media/steam/apps/' + item.AppID + '/header.jpg'" height="200px">
          <v-container fill-height fluid pa-2>
            <v-layout align-start justify-start row fill-height>
              <v-flex xs12 flexbox class="text-xs-right" v-if="item.AppsTypes">
                <v-btn dark small color="grey" class="card-right-icon">
                  <v-icon left class="mt-1">
                    {{ item.AppsTypes.DisplayName | typeIcon }}
                  </v-icon> 
                  {{ item.AppsTypes.DisplayName | typeName }} 
                </v-btn>
                <v-btn class="card-right-attention-icon" small color="primary" dark :loading="dialogAttention" @click.stop="dialogAttention = true">
                  <v-icon left class="mt-1">
                    add
                  </v-icon> 
                  关注
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <span class="grey--text ml-3">更新于: {{ item.LastUpdated | time }}</span>
            <h3 class="mb-0">
              <v-chip>
                {{ item.AppID }}
              </v-chip>
              {{ item.Name.slice(0, 20) }}
            </h3>
          </div>
        </v-card-title>
  
      </v-card>
      <v-card v-else>
        <v-card-media :src="'/unknow.jpg'" height="200px">
          <v-container fill-height fluid pa-2>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox class="text-xs-right">
                  <v-btn dark small color="grey">
                    <v-icon left class="mt-1">device_unknown</v-icon> 未知 </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <span class="grey--text ml-3">更新于: {{ item.LastUpdated | time }}</span>
            <h3 class="mb-0">
              <v-chip>
                {{ item.AppID }}
              </v-chip>
              未知应用
            </h3>
          </div>
        </v-card-title>
      </v-card>
      <v-dialog v-model="dialogAttention" hide-overlay persistent width="300">
          <v-card color="primary" dark>
            <v-card-text>
              功能开发中
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
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