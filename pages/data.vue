<template>
  <div>
    <div>
      <v-card class="py-12" color="primary" dark tile>
        <v-container>
          <v-row class="align-center">
            <v-col cols="12" md="6" lg="5">
              <Status :data.sync="user_status" />
            </v-col>

            <v-col v-if="options" cols="12" md="6" lg="7">
              <Chart :options.sync="options" :series.sync="series" />
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-card flat class="py-12" color="transparent">
        <v-container>
          <v-row>
            <v-col>
              <Weekly />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Chart: () => import('~/components/steam/user/Chart'),
    Status: () => import('~/components/steam/user/Status'),
    Weekly: () => import('~/components/steam/seller/Weekly')
  },
  data() {
    return {}
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(
      `https://bird.ioliu.cn/v1?url=http://api.epicdata.net:1234/api/game/steam/status?toDaySubHours=8`
    )

    return {
      user_status: data.today,
      series: [{ name: '在线人数', data: data.user }],
      options: {
        chart: {
          background: '#161e2e'
        },
        stroke: {
          show: true
        },
        xaxis: {
          type: 'datetime',
          categories: data.created_at
        },
        theme: {
          mode: 'dark',
          palette: 'palette7',
          monochrome: {
            enabled: true,
            color: '#000'
          }
        }
      }
    }
  },
  head() {
    return {
      title: '数据报告',
      meta: [
        {
          hid: 'data',
          name: 'description',
          content: 'EpicGamer 实时分析并定期产出的数据报告。'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.sticky {
  position: sticky !important;
  top: 20px !important;
}
</style>
