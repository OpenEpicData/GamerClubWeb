<template>
  <v-flex d-flex xs12 v-if="list">
    <v-layout row wrap>
      <v-flex d-flex xs6 sm6 md4 lg3 xl2 v-for="(item,i) in list" :key="i" class="game-list-card px-2">
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`" flat class="grey lighten-4 my-3" width="100%">
            <v-layout align-space-between justify-space-between column fill-height>
              <v-flex>
                <v-img style="cursor:pointer" :src="'https://cdn.steamstatic.com.8686c.com/steam/apps/' + item.AppID + '/header.jpg'"
                  gradient="to top right, rgba(20,30,48,.33), rgba(36,59,85,.33)" :lazy-src="'/unknow.jpg'" height="215px"
                  v-on:click="cardTo(item.AppID)">
                  <v-container fill-height fluid pt-0 pl-0>
                    <v-layout align-start justify-start row fill-height>
                      <v-flex xs12 flexbox class="text-xs-left cardTip">
                        <span v-if="item.app_price[0]">
                          <span v-if="item.app_price[0].PriceFinal">
                            <v-btn dark small color="g-blue-hydrogen" class="cardTipButton">
                              {{ minAppPrice(item.app_price) }}
                            </v-btn>
                          </span>
                        </span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
              </v-flex>
              <v-flex xs12 class="mx-1 mt-2">
                <nuxt-link :to="$i18n.path('apps/'+ item.AppID)" style="text-decoration: none;color: #000">
                  <h3 style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                    {{ item.Name }}
                  </h3>
                </nuxt-link>
              </v-flex>
              <v-flex xs12 class="mx-1 pb-2">
                <h5 class="grey--text text--lighten-1">
                  {{ $t('Updated on') }}: {{ time(item.LastUpdated) }}
                </h5>
              </v-flex>
            </v-layout>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<style lang="stylus" scoped>
  .v-image__image--preload
      filter blur(0)
  
  .card-right-attention-icon
      display none
  
  .game-list-card
      :hover
          .card-right-icon
              display none
  
          .card-right-attention-icon
              display inline
  
  .v-menu__content
      box-shadow none
  
  @media (max-width: 960px)
      .card-right-attention-icon
          display inline
  
      .card-right-icon
          display none
  
</style>

<script>
import _ from 'lodash'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
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
      this.$router.push({ path: this.$i18n.path('apps/' + id) })
    },
    minAppPrice: function (value) {
      const price = _.minBy(value, 'PriceFinal')
      if (price.PriceFinal === value[0].PriceFinal) {
        if (value[0].PriceDiscount !== 0) {
          if (value[0].PriceDiscount !== value[1].PriceDiscount) {
            return this.$t('Lowest historical price') + ' ' + this.$t('Symbol of money') + ' ' + value[0].PriceFinal / 100
          }
        }
      } else if (value[0].PriceFinal < value[1].PriceFinal) {
        return this.$t('discounted') + ' ' + value[0].PriceFinal / 100
      }
      return this.$t('Symbol of money') + ' ' + value[0].PriceFinal / 100
    },
    time: function (value) {
      if (this.$store.state.locale === 'zh-cn') return dayjs().locale('zh-cn').from(dayjs(value))
      if (this.$store.state.locale === 'en-us') return dayjs().from(dayjs(value))
    }
  },
  watch: {
    dialogAttention (val) {
      if (!val) return
      setTimeout(() => (this.dialogAttention = false), 1000)
    }
  },
  filters: {
  }
}
</script>