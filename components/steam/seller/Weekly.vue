<template>
  <div v-if="$store.state.data.steam.weekly.sellers">
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
      }})
    </h2>

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
  mounted() {
    this.$store.dispatch('fetch_steam_weekly_sellers')
  }
}
</script>
