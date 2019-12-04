<template>
  <div>
    <v-container>
      <v-alert type="info" text>
        EpicGamer 游戏库（预览版）
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
            :href="`https://store.steampowered.com/app/${item.appid}`"
            target="_black"
            shaped
            hover
          >
            <v-img
              :src="
                `https://steamcdn-a.akamaihd.net/steam/apps/${item.appid}/capsule_616x353.jpg`
              "
            >
            </v-img>
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
  }
}
</script>
