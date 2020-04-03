<template>
  <div>
    <v-container>
      <v-alert type="info" outlined color="primary">
        EpicGamer 游戏库（预览版）
      </v-alert>

      <v-row>
        <v-col cols="12" md="10">
          <div>
            <v-alert
              border="left"
              colored-border="red"
              icon="mdi-fire"
              color="red"
            >
              本周最热门
            </v-alert>
            <v-row v-if="$store.state.data.steam.weekly.sellers">
              <v-col
                v-for="(item,
                i) in $store.state.data.steam.weekly.sellers.slice(0, 3)"
                :key="i"
                cols="12"
                sm="6"
                lg="4"
                xl="3"
              >
                <v-card
                  :to="`/game/${subNumber(item.link)[0]}`"
                  shaped
                  class="drop-shadow"
                >
                  <v-img
                    :src="
                      `https://steamcdn-a.akamaihd.net/steam/apps/${
                        subNumber(item.link)[0]
                      }/capsule_616x353.jpg`
                    "
                  >
                  </v-img>
                </v-card>

                <h2 class="d-flex justify-center title">
                  {{ item.title }}
                </h2>
              </v-col>
            </v-row>
          </div>

          <v-alert
            border="left"
            colored-border="primary"
            class="mt-10"
            icon="mdi-fire"
            color="primary"
          >
            全部游戏
          </v-alert>

          <v-row v-if="$store.state.data.steam.apps.games">
            <v-col
              v-for="(item, i) in $store.state.data.steam.apps.games.data"
              :key="i"
              cols="12"
              sm="6"
              lg="4"
              xl="3"
            >
              <v-card
                :to="`/game/${item.appid}`"
                shaped
                hover
                class="drop-shadow"
              >
                <v-img
                  :src="
                    `https://steamcdn-a.akamaihd.net/steam/apps/${item.appid}/capsule_616x353.jpg`
                  "
                >
                </v-img>
              </v-card>

              <h2
                class="d-flex justify-center title d-inline-block text-truncate"
              >
                {{ item.name }}
              </h2>
            </v-col>
          </v-row>
        </v-col>

        <v-col>
          <v-card outlined style="position: sticky; top: 10px">
            <v-card-title>
              广告位招租
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch('fetch_steam_apps')
    await this.$store.dispatch('fetch_steam_weekly_sellers')
  },
  head() {
    return {
      title: '游戏库',
      meta: [
        {
          hid: 'game',
          name: 'description',
          content:
            'EpicGamer 游戏库实时抓取各大平台的游戏资料，价格，在线人数以供查阅。'
        }
      ]
    }
  },
  methods: {
    subNumber(T) {
      const str = T
      const numArr = str.match(/\d+/g)
      return numArr
    }
  }
}
</script>
