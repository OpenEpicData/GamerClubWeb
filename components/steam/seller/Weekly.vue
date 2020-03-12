<template>
  <div v-if="$store.state.data.steam.weekly.sellers">
    <v-row>
      <v-col cols="12">
        <h2 class="display-2">
          销量周榜 (
          {{
            $dayjs
              .unix($store.state.data.steam.weekly.sellers[0].timestamp)
              .subtract(1, 'week')
              .format('YYYY/MM/DD')
          }}
          -
          {{
            $dayjs
              .unix($store.state.data.steam.weekly.sellers[0].timestamp)
              .format('YYYY/MM/DD')
          }}) -- 第
          {{
            $dayjs
              .unix($store.state.data.steam.weekly.sellers[0].timestamp)
              .week()
          }}
          周
        </h2>
      </v-col>

      <v-col cols="12" md="7">
        <v-date-picker
          v-model="picker"
          full-width
          locale="zh-cn"
        ></v-date-picker>
      </v-col>
    </v-row>

    <v-simple-table class="mt-10" fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">排名</th>
            <th class="text-left">游戏名</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in $store.state.data.steam.weekly.sellers"
            :key="item.rank"
          >
            <td>{{ item.rank }}</td>
            <td>
              <h4 class="subtitle-1">
                <a :href="item.link" target="_blank" rel="noopener noreferrer">
                  <span class="black--text">
                    {{ item.title }}
                  </span>
                </a>
              </h4>
            </td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    picker: new Date().toISOString().substr(0, 10)
  }),
  watch: {
    picker(newT, oldT) {
      const subweek = this.$dayjs(newT).diff(
        new Date().toISOString().substr(0, 10),
        'week'
      )
      if (subweek <= 0) {
        const abs = Math.abs(subweek)
        this.$store.commit('setSteamWeekly', { subWeek: abs })
        this.$store.dispatch('fetch_steam_weekly_sellers')
      }
    }
  },
  mounted() {
    this.$store.dispatch('fetch_steam_weekly_sellers')
  }
}
</script>
