<template>
  <v-layout align-center class="text-xs-center">
    <v-flex xs12 sm12 md12>
      <v-card
        class="grey lighten-4"
      >
        <v-expansion-panel 
          popout
        >
          <v-expansion-panel-content
            v-for="(item,i) in list.data"
            :key="i"
            class="grey lighten-4"
          >
            <div slot="header" v-on:click="fetchPrice(item.appid)"><v-chip outline color="primary">
              appid {{ item.appid }}</v-chip> {{ item.name }}
            </div>
            <v-card color="primary">
              <v-card-text>
                <v-stepper v-model="step" vertical non-linear v-for="(price, index) in price" :key="index"  v-if="price.hasOwnProperty('id')">
                  <v-stepper-step :step="index" complete editable>
                    时间: {{ price.created_at }} 
                  </v-stepper-step>

                  <v-stepper-content :step="index">
                    <del>原价: {{ price.initial/100 }}</del> 现价: {{ price.final/100 }}
                    <v-chip outline color="primary" v-if="price.discount_percent === 0">没有折扣</v-chip>
                    <v-chip outline color="red" v-else>打折中: {{ price.discount_percent }}</v-chip>
                  </v-stepper-content>

                </v-stepper>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-pagination
            v-model="page"
            :length="list.lastPage"
            circle
        ></v-pagination>
      </v-card>
    </v-flex>
  </v-layout>
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
    list: '',
    price: '',
    panel: [false, true, true],
    step: '0'
  }),
  methods: {
    fetchPrice (appid) {
      return axios.get(`https://api.steamhub.cn/api/v1/steam/game/prices/` + appid)
        .then(response => {
          this.price = response.data
        })
    }
  },
  watch: {
    page: function (newPage, oldPage) {
      return axios.get(`https://api.steamhub.cn/api/v1/steam/game/lists?page=` + newPage)
        .then(response => {
          this.list = response.data
          this.price = ''
        })
    }
  }
}
</script>

