<template>
  <div v-if="high_score">
    <div class="red-gradient white--text py-5">
      <v-layout justify-center align-center fill-height row wrap>
        <v-flex xs12 md8 lg6 xl4 align-center class="text-xs-left pt-5 mx-2">
          <div>
            <h1 class="display-3 text-truncate">
              {{ high_score.data[0].Name }}
            </h1>
            <h2 class="subheading my-4" style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
              {{ high_score.data[0].ShortDescription }}
            </h2>
            <h2 class="subheading" style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
              {{ parseHTML(high_score.data[0].DetailedDescription) }}
            </h2>
          </div>
          <div class="pt-5">
            <v-chip dark color="transparent" class="white--text mx-0" v-if="high_score.data[0].RequiredAge >= 16">
              <v-avatar>
                <v-icon>
                  fas fa-prescription
                </v-icon>
              </v-avatar>
              限制级 R{{ high_score.data[0].RequiredAge }}
            </v-chip>
            <v-chip dark color="transparent" class="white--text mx-0" v-for="(platformItem, platformIndex) in splitPlatforms(high_score.data[0].Platforms)" :key="platformIndex">
              <v-avatar>
                <v-icon v-if="platformItem === 'windows'">
                  fab fa-windows
                </v-icon>
                <v-icon v-if="platformItem === 'mac'">
                  fab fa-apple
                </v-icon>
                <v-icon v-if="platformItem === 'linux'">
                  fab fa-linux
                </v-icon>
              </v-avatar>
              {{ platformItem }}
            </v-chip>
          </div>
          <div class="pt-2">
            <v-btn round large class="mx-0">查看游戏 ￥ {{ high_score.data[0].app_price[0].PriceFinal / 100 }}</v-btn>
            <v-btn round large outline dark disabled>关注</v-btn>
          </div>
        </v-flex>
        <v-flex xs12 sm6 md4 class="pt-5 mt-4">
          <v-progress-circular
            :rotate="-90"
            :size="150"
            :width="15"
            color=""
            :value="high_score.data[0].Metacritic"
          >
            <h2 class="title">
              {{ high_score.data[0].Metacritic }}
              Metacritic
            </h2>
          </v-progress-circular>
          <div class="mt-3">
            <h4 class="body-2 font-weight-regular">
              Metacritic 是一个权威评测机构,<br>提供媒体评测与用户打分
            </h4>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <div>
      <v-layout align-center justify-center fill-height row wrap>
        <v-flex md8>
          <v-timeline>
            <v-timeline-item
              hide-dot
              v-for="(highScoreItem, highScoreIndex) in high_score.data.slice(1)"
              :key="highScoreIndex"
              color="grey"
              large
              class="my-4"
            >
              <v-progress-circular
                slot="opposite"
                :rotate="-90"
                :size="150"
                :width="10"
                color=""
                :value="highScoreItem.Metacritic"
                class="mt-3"
              >
                <h2 class="title text-xs-center">
                  {{ highScoreItem.Metacritic }}
                  Metacritic
                </h2>
              </v-progress-circular>
              <v-card flat color="transparent" small class="text-xs-left pa-2 mt-3">
                <div>
                  <h2 class="title text-truncate">
                    {{ highScoreItem.Name }} 
                    <v-chip small>
                      <span>
                        ￥ {{ highScoreItem.app_price[0].PriceFinal / 100 }}  
                      </span> 
                    </v-chip>
                  </h2>
                  <v-chip color="transparent" small class="mx-0" v-if="highScoreItem.RequiredAge >= 16">
                    <v-avatar>
                      <v-icon small>
                        fas fa-prescription
                      </v-icon>
                    </v-avatar>
                    限制级 R{{ highScoreItem.RequiredAge }}
                  </v-chip>
                  <v-chip color="transparent" small class="mx-0" v-for="(platformItem, platformIndex) in splitPlatforms(highScoreItem.Platforms)" :key="platformIndex">
                    <v-avatar>
                      <v-icon small v-if="platformItem === 'windows'">
                        fab fa-windows
                      </v-icon>
                      <v-icon small v-if="platformItem === 'mac'">
                        fab fa-apple
                      </v-icon>
                      <v-icon small v-if="platformItem === 'linux'">
                        fab fa-linux
                      </v-icon>
                    </v-avatar>
                    {{ platformItem }}
                  </v-chip>
                  <h4 class="body-2" style="overflow: hidden;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;">
                    {{ parseHTML(highScoreItem.ShortDescription) }}
                  </h4>
                </div>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      high_score: null
    }
  },
  async mounted () {
    await this.fetchTrending()
  },
  methods: {
    async fetchSomething (url) {
      return await this.$axios.$get(encodeURI(url))
    },
    async fetchTrending () {
      let [high_score] = await Promise.all([
        await this.fetchSomething('https://rest.steamhub.cn/api/v2/apps/lists?type=high-score&param=16'),
      ])
      this.high_score = high_score
    },
    parseHTML: function (val) {
      return val.replace(/<[^>]+>/g, '')
    },
    splitPlatforms: function (val) {
      return val.split('|')
    }
  },
}
</script>

<style>
.container {
  padding: 0
}
</style>

<style scoped>
.title {
  line-height: 30px !important
}
</style>
