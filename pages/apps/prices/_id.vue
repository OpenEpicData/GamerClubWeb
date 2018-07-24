<template>
  <div>
    <PageHeader :headerText.sync="headerText"></PageHeader>
    <v-container fluid grid-list-sm class="index-main-container">
      <div class="hidden-sm-and-down">
        <div class="hidden-sm-and-down" v-for="(item,i) in appdetails" :key="i">
          <v-progress-linear indeterminate color="blue" class="mb-0" :height="carouselLoading"></v-progress-linear>
          <el-carousel :interval="4000" type="card">
            <el-carousel-item v-for="(img,k) in item.data.screenshots" :key="k" class="text-xs-center">
              <img :src="img.path_thumbnail" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="page-main">
        <GameHeader :gameHeader.sync="gameHeader" :lastUpdated.sync="lastUpdated" :appID.sync="appid"></GameHeader>
          <div class="text-xs-right">
            <h4>游戏价格每小时更新,属于独立更新程序,不计入更新队列中</h4>
          </div>
          <v-layout row wrap id="today">
            <v-flex xs12>
              <div v-if="isDiscount">
                <h2 class="mt-3">
                  <span>正在打折中</span>
                  <v-chip><span v-if="discountPrice === minPriceFinal" class="mx-1">史低</span> {{ discountPrice }} 元 </v-chip>
                </h2>
                <h2 class="mt-3" v-if="discountPrice !== minPriceFinal">
                  历史最低价格:
                  <v-chip> {{ minPriceFinal }} 元 </v-chip>
                </h2>
              </div>
              <div v-else>
                <h2 class="mt-3">
                  暂无折扣, 历史最低价格:
                  <v-chip> {{ minPriceFinal }} 元 </v-chip>
                </h2>
              </div>
            </v-flex>
          </v-layout>
        <ve-line :data="chartData"></ve-line>
      </div>
    </v-container>
  </div>
</template>

<script>
  import PageHeader from '~/components/PageHeader'
  import GameHeader from '~/components/GameHeader'
  import axios from 'axios'

  export default {
    async asyncData ({ query, params }) {
      let [apps, appPrices] = await Promise.all([
        axios.get(`https://api.steamhub.cn/api/v1/steam/apps/` + params.id),
        axios.get(`https://api.steamhub.cn/api/v1/steam/game/prices/` + params.id + `?country=China`)
      ])
      let i
      for (i = 0; i < appPrices.data.length; i++) {
        appPrices.data[i].现价 = appPrices.data[i]['PriceFinal'] / 100
        appPrices.data[i].原价 = appPrices.data[i]['PriceInitial'] / 100
        appPrices.data[i].折扣力度 = appPrices.data[i]['PriceDiscount']
        appPrices.data[i].更新时间 = appPrices.data[i]['LastUpdated']
        delete appPrices.data[i].PriceFinal
        delete appPrices.data[i].PriceInitial
        delete appPrices.data[i].PriceDiscount
        delete appPrices.data[i].LastUpdated
      }
      return {
        apps: apps.data,
        appPrices: appPrices.data,
        appid: params.id,
        title: apps.data[0]['Name'],
        lastUpdated: apps.data[0]['LastUpdated'],
        chartData: {
          columns: ['更新时间', '原价', '现价', '折扣力度'],
          rows: appPrices.data
        }
      }
    },
    components: {
      PageHeader,
      GameHeader
    },
    data: () => ({
      appid: '',
      appdetails: '',
      carouselLoading: 6,
      lastUpdated: '',
      headerText: {
        title: '',
        descript: '',
        button: `使用 API`,
        dialog: {
          text: `功能开发中`,
          progressBar: {
            height: `6`
          }
        }
      },
      chartData: {
        columns: '',
        rows: ''
      },
      isDiscount: '',
      gameHeader: '',
      minPriceFinal: ''
    }),
    created: function () {
      this.headerText.title = this.title
      if (this.appPrices[this.appPrices.length - 1].折扣力度 !== 0) {
        this.isDiscount = true
        this.discountPrice = this.appPrices[this.appPrices.length - 1].现价
      }
      this.gameHeader = [
        { icon: 'info', text: '信息', outline: true, link: '/apps/' + this.appid },
        { icon: 'attach_money', text: '价格', dark: true, link: '/apps/prices/' + this.appid },
        { icon: 'subject', text: '软件包', outline: true, disable: true },
        { icon: 'playlist_add', text: '扩充包', outline: true, disable: true },
        { icon: 'home', text: '仓库', outline: true, disable: true },
        { icon: 'history', text: '更新历史', outline: true, disable: true }
      ]
      let newArrPriceFinal = []
      for (let i = 0; i < this.appPrices.length; i++) {
        newArrPriceFinal = newArrPriceFinal.concat(this.appPrices[i].现价)
      }
      this.minPriceFinal = Math.min.apply(Math, newArrPriceFinal)
      axios.get(`https://api.steamhub.cn/api/v1/steam/app/appdetails/` + this.appid, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(response => {
          this.appdetails = response.data
          this.carouselLoading = 0
        })
    },
    head () {
      return {
        title: 'AppID:' + this.appid + ' -- ' + this.title + ' 应用的历史的价格,走势,数据及分析  -- SteamHub',
        meta: [
          { hid: 'description', name: 'description', content: '在 SteamHub 中查询使用 ' + 'AppID: ' + this.appid + this.headerText.title + ' 应用的历史的价格,走势,数据及分析' }
        ]
      }
    }
  }
</script>

<style>
  .v-datatable th {
    text-align: center !important;
  }
</style>