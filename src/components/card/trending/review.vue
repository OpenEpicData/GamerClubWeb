<template>
  <VCard
    height="160px"
    class="text-xs-left"
    :href="`https://store.steampowered.com/app/${review.AppID}`"
    target="_blank"
  >
    <div>
      <VImg
        :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${review.AppID}/header.jpg`"
        height="160px"
      >
        <VLayout
          align-start
          justify-start
          fill-height
          column
        >
          <div>
            <VTooltip top>
              <VChip
                slot="activator"
                small
                class="grey lighten-2"
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
export default {
  props: {
    review: {
      type: null,
      default: null,
      required: true
    },
  },
  data () {
    this.chartSettings = {
      labelMap: {
        'PriceFinal': '价格'
      },
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
          type:'line',
          smooth: false,
          lineStyle: {
            width: 5,
          }
        },
        yAxis: {
          scale: true,
        },
        xAxis: {
          inverse: true,
        }
      }
    }
  },
  mounted () {
    this.chartColors = [
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: '#f44881' },
        { offset: 1, color: '#ec454f' },
      ]),
    ]
  },
  methods: {
    chipPriceHover: function (val, appid) {
      this.chartData.rows = val
      this.$refs[`chart${appid}`].echarts.resize()
    },
    chipPriceLeave: function (val, appid) {
      this.$refs[`chart${appid}`].echarts.resize()
    },
  },
}
</script>
