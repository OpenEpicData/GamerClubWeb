<template>
  <VCard
    :href="`https://store.steampowered.com/app/${review.AppID}`"
    height="310px"
    class="text-xs-left"
    target="_blank"
    color="transparent"
    flat
  >
    <div>
      <div>
        <v-sheet
          class="v-sheet--offset px-1 mx-3"
          color="brown"
          elevation="15"
          style="opacity:.9"
        >
          <VTooltip top>
            <VChip
              slot="activator"
              small
              class="brown lighten-3"
            >
              <VIcon
                small
                left
              >
                far fa-smile-beam
              </VIcon>
              <span>
                {{ review.app_review[0].ReviewTitle }}
                {{ parseFloat(review.app_review[0].Percentage) }}/100
              </span>
            </VChip>
            <span>
              {{ review.app_review[0].ReviewPeople }} 篇评测中 {{ review.app_review[0].Percentage }} 的用户推荐
            </span>
          </VTooltip>
          <v-sparkline
            :labels="parse_label(review)"
            :smooth="true"
            :value="parse_value(review)"
            color="white"
            elevation="12"
            line-width="2"
            padding="16"
          />
        </v-sheet>
      </div>
      <VImg
        :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${review.AppID}/header.jpg`"
        height="150px"
      >
        <VLayout
          align-space-around
          justify-space-between
          fill-height
          column
        >
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
            {{ review.Name }}
          </h4>
          <h5 class="caption">
            {{ review.LastUpdated }}
          </h5>
        </div>
        <div />
        <div>
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
              @mouseover="chipPriceHover(review.app_price, review.AppID)"
              @mouseleave="chipPriceLeave(review.app_price, review.AppID)"
            >
              <span v-if="review.app_price.length === 0 && review.Free === 1">
                免费
              </span>
              <span v-else-if="review.app_price[0]">
                ￥ {{ review.app_price[0].PriceFinal }}
              </span>
              <span v-else>
                未知
              </span>
            </VChip>
            <VCard>
              <VeLine
                :ref="`chart${review.AppID}`"
                :colors="chartColors"
                :legend-visible="false"
                :extend="chartExtend"
                :settings="chartSettings"
                :data="chartData"
              />
            </VCard>
          </VMenu>
        </div>
      </VLayout>
    </div>
  </VCard>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default {
  props: {
    review: {
      type: null,
      default: null,
      required: true
    }
  },
  data() {
    this.chartSettings = {
      labelMap: {
        PriceFinal: '价格'
      }
    }
    return {
      appidPrice: false,
      priceMenu: false,
      chartColors: null,
      chartData: {
        columns: ['LastUpdated', 'PriceFinal'],
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
  },
  methods: {
    chipPriceHover: function(val, appid) {
      this.chartData.rows = val
      this.$refs[`chart${appid}`].echarts.resize()
    },
    chipPriceLeave: function(val, appid) {
      this.$refs[`chart${appid}`].echarts.resize()
    },
    parse_label: function(val) {
      let array_label = []
      for (let index = 5; index > 0; index--) {
        array_label.push(dayjs(val.app_review[index].LastUpdated).toNow())
      }
      return array_label
    },
    parse_value: function(val) {
      let array_label = []
      for (let index = 0; index < 5; index++) {
        array_label.push(val.app_review[index].ReviewPeople)
      }
      return array_label.reverse()
    }
  }
}
</script>

<style>
  .v-sheet--offset {
    top: 60px;
    position: relative;
    z-index: 2
  }
</style>