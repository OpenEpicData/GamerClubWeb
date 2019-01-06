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
              <a               
                :href="`https://store.steampowered.com/app/${high_score[0].appid}`"
                target="_black"
                class="white--text"
              >
                {{ high_score[0].name }}
              </a>
            </h1>
            <h2
              class="subheading my-4 hide-2line"
            >
              {{ high_score[0].short_description }}
            </h2>
            <h2
              class="subheading hide-2line"
            >
              {{ parseHTML(high_score[0].detailed_description) }}...
            </h2>
          </div>
          <div class="pt-5">
            <VChip
              v-if="high_score[0].age >= 16"
              dark
              color="transparent"
              class="white--text mx-0"
            >
              <VAvatar>
                <VIcon>
                  fas fa-prescription
                </VIcon>
              </VAvatar>
              限制级 R{{ high_score[0].age }}
            </VChip>
            <VChip
              v-for="(platformItem, platformIndex) in splitPlatforms(high_score[0].platforms)"
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
              :href="`https://store.steampowered.com/app/${high_score[0].appid}`"
              round
              large
              class="mx-0"
              target="_black"
            >
              查看游戏 
              <span v-if="high_score[0].game_prices.length > 0">
                ￥ {{ high_score[0].game_prices[0].final }}
              </span>
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
            :value="high_score[0].metacritic_review_score"
            color=""
          >
            <h2 class="title">
              {{ high_score[0].metacritic_review_score }}
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
              v-for="(highScoreItem, highScoreIndex) in high_score"
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
                :value="highScoreItem.metacritic_review_score"
                color=""
                class="mt-3"
              >
                <h2 class="title text-xs-center">
                  {{ highScoreItem.metacritic_review_score }}
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
                    <a               
                      :href="`https://store.steampowered.com/app/${highScoreItem.appid}`"
                      target="_black"
                      class="black--text"
                    >
                      {{ highScoreItem.name }}
                    </a>
                  </h2>
                  <VChip 
                    class="mx-0" 
                    small
                  >
                    <span v-if="highScoreItem.game_prices.length > 0">
                      ￥ {{ highScoreItem.game_prices[0].final }}  
                    </span> 
                    <span v-else-if="highScoreItem.free === true">
                      免费游戏
                    </span>
                    <span v-else>
                      价格未知
                    </span>
                  </VChip>
                  <VChip
                    v-if="highScoreItem.age >= 16"
                    color="transparent"
                    small
                    class="mx-0"
                  >
                    <VAvatar>
                      <VIcon small>
                        fas fa-prescription
                      </VIcon>
                    </VAvatar>
                    限制级 R{{ highScoreItem.age }}
                  </VChip>
                  <VChip
                    v-for="(platformItem, platformIndex) in splitPlatforms(highScoreItem.platforms)"
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
                        v-else-if="platformItem === 'linux'"
                        small
                      >
                        fab fa-linux
                      </VIcon>
                      <VIcon
                        v-else-if="platformItem === 'mac'"
                        small
                      >
                        fab fa-apple
                      </VIcon>
                    </VAvatar>
                    {{ platformItem }}
                  </VChip>
                  <h4
                    class="body-2 hide-4line"
                  >
                    {{ parseHTML(highScoreItem.short_description) }}
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
  data() {
    return {
      high_score: null
    }
  },
  async mounted() {
    let high_score = await this.fetchSomething(
      'https://v3.steamhub.cn/api/v3/game/list?order=desc&order_field=metacritic_review_score&length=16&simple_paginate=1'
    )
    this.high_score = high_score.data
  },
  methods: {
    async fetchSomething(url) {
      return await this.$axios.$get(encodeURI(url))
    },
    parseHTML: function(val) {
      return val.replace(/<[^>]+>/g, '').slice(0, 200)
    },
    splitPlatforms: function(val) {
      const split_data = val.split('|')
      return split_data.slice(0, split_data.length - 1)
    }
  },
  head() {
    return {
      title: '媒体高分 -- SteamHub',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            '来自专业评测机构 metacritic_review_score 的打分,每一分都客观可靠.'
        }
      ]
    }
  }
}
</script>

<style>
.container {
  padding: 0;
}
</style>

<style scoped>
.title {
  line-height: 30px !important;
}
</style>
