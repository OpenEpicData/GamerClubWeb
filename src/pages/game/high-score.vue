<template>
  <div v-if="high_score">
    <div class="red-gradient white--text py-5">
      <VLayout
        justify-center
        align-center
        fill-height
        row
        wrap
      >
        <VFlex
          xs12
          md8
          lg6
          xl4
          align-center
          class="text-xs-left pt-5 mx-2"
        >
          <div>
            <h1 class="display-3 text-truncate">
              {{ high_score.data[0].Name }}
            </h1>
            <h2
              class="subheading my-4 hide-2line"
            >
              {{ high_score.data[0].ShortDescription }}
            </h2>
            <h2
              class="subheading hide-2line"
            >
              {{ parseHTML(high_score.data[0].DetailedDescription) }}
            </h2>
          </div>
          <div class="pt-5">
            <VChip
              v-if="high_score.data[0].RequiredAge >= 16"
              dark
              color="transparent"
              class="white--text mx-0"
            >
              <VAvatar>
                <VIcon>
                  fas fa-prescription
                </VIcon>
              </VAvatar>
              限制级 R{{ high_score.data[0].RequiredAge }}
            </VChip>
            <VChip
              v-for="(platformItem, platformIndex) in splitPlatforms(high_score.data[0].Platforms)"
              :key="platformIndex"
              dark
              color="transparent"
              class="white--text mx-0"
            >
              <VAvatar>
                <VIcon v-if="platformItem === 'windows'">
                  fab fa-windows
                </VIcon>
                <VIcon v-if="platformItem === 'mac'">
                  fab fa-apple
                </VIcon>
                <VIcon v-if="platformItem === 'linux'">
                  fab fa-linux
                </VIcon>
              </VAvatar>
              {{ platformItem }}
            </VChip>
          </div>
          <div class="pt-2">
            <VBtn
              round
              large
              class="mx-0"
            >
              查看游戏 ￥ {{ high_score.data[0].app_price[0].PriceFinal / 100 }}
            </VBtn>
            <VBtn
              round
              large
              outline
              dark
              disabled
            >
              关注
            </VBtn>
          </div>
        </VFlex>
        <VFlex
          xs12
          sm6
          md4
          class="pt-5 mt-4"
        >
          <VProgressCircular
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
          </VProgressCircular>
          <div class="mt-3">
            <h4 class="body-2 font-weight-regular">
              Metacritic 是一个权威评测机构,<br>提供媒体评测与用户打分
            </h4>
          </div>
        </VFlex>
      </VLayout>
    </div>
    <div>
      <VLayout
        align-center
        justify-center
        fill-height
        row
        wrap
      >
        <VFlex md8>
          <VTimeline>
            <VTimelineItem
              v-for="(highScoreItem, highScoreIndex) in high_score.data.slice(1)"
              :key="highScoreIndex"
              hide-dot
              color="grey"
              large
              class="my-4"
            >
              <VProgressCircular
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
              </VProgressCircular>
              <VCard
                flat
                color="transparent"
                small
                class="text-xs-left pa-2 mt-3"
              >
                <div>
                  <h2 class="title text-truncate">
                    {{ highScoreItem.Name }} 
                  </h2>
                  <VChip 
                    class="mx-0" 
                    small
                  >
                    <span>
                      ￥ {{ highScoreItem.app_price[0].PriceFinal / 100 }}  
                    </span> 
                  </VChip>
                  <VChip
                    v-if="highScoreItem.RequiredAge >= 16"
                    color="transparent"
                    small
                    class="mx-0"
                  >
                    <VAvatar>
                      <VIcon small>
                        fas fa-prescription
                      </VIcon>
                    </VAvatar>
                    限制级 R{{ highScoreItem.RequiredAge }}
                  </VChip>
                  <VChip
                    v-for="(platformItem, platformIndex) in splitPlatforms(highScoreItem.Platforms)"
                    :key="platformIndex"
                    color="transparent"
                    small
                    class="mx-0"
                  >
                    <VAvatar>
                      <VIcon
                        v-if="platformItem === 'windows'"
                        small
                      >
                        fab fa-windows
                      </VIcon>
                      <VIcon
                        v-else-if="platformItem === 'mac'"
                        small
                      >
                        fab fa-apple
                      </VIcon>
                      <VIcon
                        v-else-if="platformItem === 'linux'"
                        small
                      >
                        fab fa-linux
                      </VIcon>
                    </VAvatar>
                    {{ platformItem }}
                  </VChip>
                  <h4
                    class="body-2 hide-4line"
                  >
                    {{ parseHTML(highScoreItem.ShortDescription) }}
                  </h4>
                </div>
              </VCard>
            </VTimelineItem>
          </VTimeline>
        </VFlex>
      </VLayout>
    </div>
  </div>
  <div v-else>
    <VProgressCircular
      indeterminate
      color="primary"
    />
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
  head () {
    return {
      title: '媒体高分 -- SteamHub',
      meta: [
        { hid: 'description', name: 'description', content: '来自专业评测机构 Metacritic 的打分,每一分都客观可靠.' }
      ]
    }
  }
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
