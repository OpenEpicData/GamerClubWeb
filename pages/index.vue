<template>
  <div>
    <div class="white">
      <v-container hidden-sm-and-down>
        <v-layout row wrap class="py-5">
          <v-flex xs10>
            <div class="text-xs-left">
              <h1 class="display-2 font-weight-bold">全球 Steam 数据统计分析 By SteamHub</h1>
              <h3 class="mt-3 font-weight-regular grey--text">
                SteamHub 是一个全球 Steam 的数据统计社区,每天为开发者和玩家提供实时的 价格,资讯 数据查询
              </h3>
            </div>
          </v-flex>
          <v-flex xs2>
            <div class="text-xs-right">
              <v-btn large color="primary" round dark :loading="dialog2" @click.stop="dialog2 = true">
                立即加入</v-btn>
            </div>
          </v-flex>
          <v-dialog v-model="dialog2" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                功能开发中
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-container>
    </div>
    <div>
      <v-container grid-list-sm>
        <v-btn color="deep-purple lighten-1" dark>
          <v-icon left class="mt-1">blur_on</v-icon>趋势</v-btn>
        <h2 class="mt-3">今日
          <v-chip>{{ month }}月{{ day }}日</v-chip>
        </h2>
        <h4 class="mt-2">记录在案的游戏: {{ list.total }}, 每日第十二小时更新</h4>
        <v-layout row wrap class="mt-3">
          <v-flex xs12 sm6 md6 lg4 xl3 v-for="(item,i) in list.data" :key="i">
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">
                    <v-chip>
                      {{ item.appid }}
                    </v-chip>
                    <v-btn v-on:click="fetchPrice(item.appid)" @click.stop="dialogPrice = true">
                      {{ item.name.slice(0,20) }}
                    </v-btn>
                  </h3>
                </div>
              </v-card-title>

            </v-card>
          </v-flex>
          <v-flex xs6 class="mb-5">
            <div class="text-xs-left" v-if="page !== 1">
              <v-btn large round outline v-on:click="fetchPage(page - 1)"> 上一页 {{ page - 1 }}</v-btn>
            </div>
          </v-flex>
          <v-flex xs6 class="mb-5">
            <div class="text-xs-right" v-if="page !== list.total">
              <v-btn large round outline v-on:click="fetchPage(page + 1)"> 下一页 {{ page + 1 }}</v-btn>
            </div>
          </v-flex>
        </v-layout>
        <v-dialog v-model="dialogPrice">
          <div v-if="isPrice === 1">
            <v-stepper v-model="step" vertical non-linear v-for="(price, index) in price" :key="index">
              <v-stepper-step :step="index" complete editable>
                时间: {{ price.created_at }}
              </v-stepper-step>

              <v-stepper-content :step="index">
                <del>原价: {{ price.initial/100 }}</del> 现价: {{ price.final/100 }}
                <v-chip outline color="primary" v-if="price.discount_percent === 0">没有折扣</v-chip>
                <v-chip outline color="red" v-else>打折中: {{ price.discount_percent }}</v-chip>
              </v-stepper-content>

            </v-stepper>
          </div>
          <div v-if="isPrice === 0" class="text-xs-center">
            无数据或者是免费游戏
            <v-progress-linear indeterminate color="primary" class="mb-0"></v-progress-linear>
          </div>
        </v-dialog>
      </v-container>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    async asyncData () {
      return axios.get(`https://api.steamhub.cn/api/v1/steam/game/lists`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(function (response) {
          return { list: response.data, page: response.data.page }
        })
    },
    data: () => ({
      dialog2: false,
      dialogPrice: false,
      price: '',
      step: '0',
      isPrice: ''
    }),
    methods: {
      fetchPrice (appid) {
        return axios.get(`https://api.steamhub.cn/api/v1/steam/game/searches/?appid=` + appid + `&filter=priceTimeDesc`, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
          .then(response => {
            if (response.data[0] === undefined) {
              this.isPrice = 0
            } else {
              this.isPrice = 1
            }
            this.price = response.data
          })
      },
      fetchPage: function (page) {
        return axios.get(`https://api.steamhub.cn/api/v1/steam/game/lists?page=` + page, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
          .then(response => {
            this.list = response.data
            this.page = page++
            this.price = ''
          })
      }
    },
    created: function () {
      const Today = new Date()
      this.month = Today.getMonth() + 1
      this.day = Today.getDate()
    },
    watch: {
      dialog2 (val) {
        if (!val) return
        setTimeout(() => (this.dialog2 = false), 1000)
      }
    }
  }
</script>