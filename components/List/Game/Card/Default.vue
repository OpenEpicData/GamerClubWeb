<template>
  <v-flex d-flex xs12>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md3 lg2 v-for="(item,i) in 6" :key="i" class="game-list-card px-2" v-if="!list">
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`" flat class="grey lighten-4 my-3">
            <v-img style="cursor:pointer" :src="'/unknow.jpg'" :lazy-src="'/unknow.jpg'">
            </v-img>
            <v-card-title primary-title>
              <v-layout row wrap>
                <v-flex xs12>
                  <span class="grey--text"><v-progress-linear :indeterminate="true" background-color="transparent" color="g-purple-purplin" v-for="i in 2" :key="i"></v-progress-linear></span>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3 lg2 v-for="(item,i) in list" :key="i" class="game-list-card px-2">
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`" flat class="grey lighten-4 my-3" height="33vh">
            <v-img style="cursor:pointer" :src="'https://cdn.steamstatic.com.8686c.com/steam/apps/' + item.AppID + '/header.jpg'" :lazy-src="'/unknow.jpg'" height="200px" v-on:click="cardTo(item.AppID)">
              <v-container fill-height fluid pa-2>
                <v-layout align-start justify-start row fill-height>
                  <v-flex xs12 flexbox class="text-xs-right" v-if="item.app_type">
                    <span v-if="item.app_price[0]">
                      <span v-if="item.app_price[0].PriceFinal">
                        <v-btn dark small color="g-purple-purplin" class="card-right-icon">
                          {{ item.app_price | minAppPrice }} 元
                        </v-btn>
                      </span>
                    </span>
                    <v-btn class="card-right-attention-icon" small color="g-blue-hydrogen" dark :loading="dialogAttention"
                      @click.stop="dialogAttention = true">
                      <v-icon left>
                        add
                      </v-icon>
                      关注
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title primary-title>
              <v-layout row wrap>
                <v-flex xs12>
                  <nuxt-link :to="'/apps/'+ item.AppID" style="text-decoration: none;color: #000">
                    <h3>
                      {{ item.Name }}
                    </h3>
                    <span class="grey--text">更新于: {{ item.LastUpdated | time }}</span>
                  </nuxt-link>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<style>
  .v-image__image--preload {
    filter: blur(0)
  }
  
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
        dialogAttention: false
      }
    },
    methods: {
      cardTo: function (id) {
        this.$router.push({ path: '/apps/' + id })
      }
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
      }
    }
  }
</script>