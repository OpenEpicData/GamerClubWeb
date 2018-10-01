<template>
  <v-flex d-flex xs12>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4 lg3 v-for="(item,i) in list" :key="i" class="game-list-card px-2">
        <v-hover>
          <v-menu
            :v-model="i"
            offset-x
            open-on-hover
            slot-scope="{ hover }"
            :close-on-content-click="false"
          >
            <v-card slot="activator" :to="$i18n.path('apps/'+ item.AppID)" :class="`elevation-${hover ? 12 : 0}`" flat class="grey lighten-4 my-3" height="320px" width="100%">
              <v-img style="cursor:pointer" :src="'https://cdn.steamstatic.com.8686c.com/steam/apps/' + item.AppID + '/header.jpg'" :lazy-src="'/unknow.jpg'" height="215px" v-on:click="cardTo(item.AppID)">
                <v-container fill-height fluid pa-2>
                  <v-layout align-start justify-start row fill-height>
                    <v-flex xs12 flexbox class="text-xs-right" v-if="item.app_type">
                      <v-btn class="card-right-attention-icon" small color="g-blue-hydrogen" dark :loading="dialogAttention"
                        @click.stop="dialogAttention = true">
                        <v-icon left>
                          add
                        </v-icon>
                        {{ $t('attention') }}
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <v-card-title primary-title>
                <v-layout row wrap>
                  <v-flex xs7>
                    <nuxt-link :to="$i18n.path('apps/'+ item.AppID)" style="text-decoration: none;color: #000">
                      <h3>
                        {{ item.Name }}
                      </h3>
                      <span class="grey--text">{{ $t('Updated on') }}: {{ time(item.LastUpdated) }}</span>
                    </nuxt-link>
                  </v-flex>
                  <v-flex xs5>
                    <div class="text-xs-right">
                       <span v-if="item.app_price[0]">
                        <span v-if="item.app_price[0].PriceFinal">
                          <v-btn dark small color="g-purple-purplin">
                            {{ minAppPrice(item.app_price) }}
                          </v-btn>
                        </span>
                      </span>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>

            <div v-if="item.app_price[0]">
              <v-card v-if="item.app_price[0].PriceFinal">
                <v-list>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img :src="'https://steamcdn-a.opskins.media/steam/apps/' + item.AppID + '/capsule_sm_120.jpg'">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.Name }}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-btn icon>
                        <v-icon>favorite</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>

                <v-divider></v-divider>

                <v-data-table
                  :items="item.app_price"
                  hide-actions
                  hide-headers
                  class="elevation-1"
                >
                  <template slot="items" slot-scope="props" v-if="props.item.PriceInitial">
                    <td>{{ props.item.LastUpdated }}</td>
                    <td>
                        {{ $t('Symbol of money') }}
                        {{ props.item.PriceFinal  / 100 }}
                    </td>
                  </template>
                </v-data-table>
              </v-card>
            </div>
          </v-menu>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<style lang="stylus">
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