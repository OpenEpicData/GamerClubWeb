<template>
  <v-flex d-flex xs12>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4 lg3 v-for="(item,i) in list.data" :key="i" class="game-list-card px-3">
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`" flat class="grey lighten-4">
            <v-img style="cursor:pointer" :src="'https://cdn.steamstatic.com.8686c.com/steam/apps/' + item.AppID + '/header.jpg'" :lazy-src="'/unknow.jpg'" height="200px" v-on:click="cardTo(item.AppID)">
              <v-container fill-height fluid pa-2>
                <v-layout align-start justify-start row fill-height>
                  <v-flex xs12 flexbox class="text-xs-right" v-if="item.app_type">
                    <v-btn dark small color="grey" class="card-right-icon">
                      <v-icon left>
                        {{ item.app_type.DisplayName | typeIcon }}
                      </v-icon>
                      {{ item.app_type.DisplayName | typeName }}
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
            </v-img>
            <v-card-title primary-title class="grey lighten-4">
              <v-layout row>
                <v-flex xs9>
                  <nuxt-link :to="'/apps/'+ item.AppID" style="text-decoration: none;color: #000">
                    <span class="grey--text">更新于: {{ item.LastUpdated | time }}</span>
                    <h3 v-if="item.AppType === 0">
                      未知应用
                    </h3>
                    <h3 v-else>
                      {{ item.Name.slice(0, 20) }}...
                    </h3>
                  </nuxt-link>
                </v-flex>
                <v-flex xs3 class="text-xs-right">
                  <v-chip label class="text-xs-right">
                    <span v-if="item.app_price[0]">
                      <span v-if="item.app_price[0].PriceFinal">
                        {{ item.app_price | minAppPrice }} 元
                      </span>
                      <span v-else-if="item.app_info[0]">
                        <span v-if="item.app_info[0].Value === 'prerelease'">
                          未发售
                        </span>
                        <span v-else>
                          NaN
                        </span>
                      </span>
                      <span v-else>
                        NaN
                      </span>
                    </span>
                    <span v-else-if="item.app_info[0]">
                      <span v-if="item.app_info[0].Value === 'prerelease'">
                        未发售
                      </span>
                      <span v-else>
                        NaN
                      </span>
                    </span>
                    <span v-else>
                      NaN
                    </span>
                  </v-chip>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-hover>
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
  import _ from 'lodash'

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
      minAppPrice: function (value) {
        const price = _.minBy(value, 'PriceFinal')
        if (price.PriceFinal === value[0].PriceFinal) {
          if (value[0].PriceDiscount !== 0) {
            if (value[0].PriceDiscount !== value[1].PriceDiscount) {
              return '史低 ' + value[0].PriceFinal / 100
            }
          }
        } else if (value[0].PriceFinal < value[1].PriceFinal) {
          return '折扣中 ' + value[0].PriceFinal / 100
        }
        return value[0].PriceFinal / 100
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

<style>
  .v-image__image--preload {
    filter: blur(0)
  }
</style>
