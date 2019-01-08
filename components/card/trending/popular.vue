<template>
  <VCard
    :href="`https://store.steampowered.com/app/${popular.appid}`"
    height="160px"
    class="text-xs-left"
    target="_blank"
  >
    <div>
      <VImg
        :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${popular.appid}/header.jpg`"
        height="160px"
      >
        <VLayout
          align-start
          justify-start
          column
          fill-height
        >
          <div>
            <div v-if="popular.game_reviews.length > 0">
              <VTooltip top>
                <VChip
                  v-if="rating = popular.game_reviews.length > 0 ? popular.game_reviews[0].score / 20 : null"
                  slot="activator"
                  small
                  class="grey lighten-2"
                >
                  <v-rating 
                    v-model="rating"
                    half-increments
                    dense
                    small
                  />
                  <span>
                    {{ popular.game_reviews[0].score / 10 }}
                  </span>
                </VChip>
                <span>
                  {{ popular.game_reviews[0].count }} 篇评测中 {{ popular.game_reviews[0].score }}% 的用户推荐
                </span>
              </VTooltip>
            </div>
            <div v-else>
              <v-chip 
                small 
                class="grey lighten-2"
              >
                <v-icon left>
                  far fa-question-circle
                </v-icon>
                暂无评分
              </v-chip>
            </div>
          </div>
        </VLayout>
      </VImg>
    </div>
    <div>
      <VLayout
        align-start
        justify-space-between
        row
        style="margin: 0 5px;"
      >
        <div>
          <h4 class="body-2 font-weight-bold">
            {{ popular.name }}
          </h4>
          <h5 class="caption">
            当前在线: {{ popular.current }}
            <br>
            {{ popular.created_at }} 
          </h5>
          
        </div>
        <div />
        <div v-if="popular.game_prices.length > 0">
          <VMenu
            v-model="priceMenu"
            :close-on-content-click="false"
            :nudge-width="700"
            :offset-overflow="true"
            lazy
            open-on-hover
          >
            <VChip
              slot="activator"
              small
              class="grey lighten-2"
              @mouseover="chipPriceHover(popular.game_prices, popular.appid)"
              @mouseleave="chipPriceLeave(popular.game_prices, popular.appid)"
            >
              <span v-if="popular.game_prices.length === 0 && popular.game_list.free === 1">
                免费
              </span>
              <span v-else-if="popular.game_prices[0]">
                ￥ {{ popular.game_prices[0].final }}
              </span>
              <span v-else>
                未知
              </span>
            </VChip>
            <VCard>
              <v-alert
                :value="true"
                color="info"
                icon="info"
                outline
              >
                SteamHub API 已被重写,旧价格数据不再显示
              </v-alert>
              <VeLine
                :ref="`chart${popular.appid}`"
                :colors="chartColors"
                :legend-visible="false"
                :extend="chartExtend"
                :settings="chartSettings"
                :data="chartData"
              />
            </VCard>
          </VMenu>
        </div>
        <div v-else>
          <v-chip
            small
            class="grey lighten-2"
          >
            暂无价格
          </v-chip>
        </div>
      </VLayout>
    </div>
  </VCard>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    popular: {
      type: null,
      default: null,
      required: true
    }
  },
  data() {
    this.chartSettings = {
      labelMap: {
        final: '价格'
      }
    }
    return {
      rating: null,
      priceMenu: false,
      chartColors: null,
      chartData: {
        columns: ['created_at', 'final'],
        rows: null
      },
      chartExtend: {
        series: {
          step: 'end',
          type: 'line',
          smooth: false,
          lineStyle: {
            width: 5
          }
        },
        yAxis: {
          scale: true
        },
        xAxis: {
          inverse: true
        }
      }
    }
  },
  mounted() {
    this.chartColors = [
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#f44881' },
        { offset: 1, color: '#ec454f' }
      ])
    ]
    if (this.popular.game_prices.length > 0) {
      const parse_price = this.popular.game_prices
      const last_price = parse_price[parse_price.length - 1]
      const chunk = {
        final: last_price.final,
        created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
      this.popular.game_prices.push(chunk)
      this.popular.game_prices.reverse()
    }
  },
  methods: {
    chipPriceHover: function(val, appid) {
      this.chartData.rows = val
      this.$refs[`chart${appid}`].echarts.resize()
    },
    chipPriceLeave: function(val, appid) {
      this.$refs[`chart${appid}`].echarts.resize()
    }
  }
}
</script>
