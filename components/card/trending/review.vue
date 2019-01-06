<template>
  <VCard
    :href="`https://store.steampowered.com/app/${data.appid}`"
    height="160px"
    class="text-xs-left"
    target="_blank"
    color="transparent"
    flat
  >
    <div>
      <VImg
        :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${data.appid}/header.jpg`"
        height="160px"
      >
        <VLayout
          align-space-around
          justify-space-between
          fill-height
          column
        >
          <div>
            <div v-if="review.length > 0">
              <VTooltip top>
                <VChip
                  v-if="rating = review.length > 0 ? review[0].score / 20 : null"
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
                    {{ review[0].score / 10 }}
                  </span>
                </VChip>
                <span>
                  {{ review[0].count }} 篇评测中 {{ review[0].score }}% 的用户推荐
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
            {{ data.name }}
          </h4>
          <h5 class="caption">
            {{ data.created_at }}
          </h5>
        </div>
        <div />
        <div v-if="price.length > 0">
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
              @mouseover="chipPriceHover(price, data.appid)"
              @mouseleave="chipPriceLeave(price, data.appid)"
            >
              <span v-if="price.length === 0 && data.free === 1">
                免费
              </span>
              <span v-else-if="price[0]">
                ￥ {{ price[0].final }}
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
                :ref="`chart${data.appid}`"
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
    review: {
      type: null,
      default: null,
      required: true
    },
    price: {
      type: null,
      default: null,
      required: true
    },
    data: {
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
      appidPrice: false,
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
    if (this.price.length > 0) {
      const parse_price = this.price
      const last_price = parse_price[parse_price.length -1]
      const chunk = {
        final: last_price.final,
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss")
      }
      this.price.push(chunk)
      this.price.reverse()
      console.log(this.price)
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
