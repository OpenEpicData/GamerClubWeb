<template>
  <v-container
    fluid
    class="text-xs-center"
  >
    <fullScreenPromotion />
    <div class="mt-5">
      <h4 class="display-1">
        为开发人员/游戏爱好者提供全量数据
      </h4>
    </div>
    <div>
      <v-layout
        wrap
        row
        justify-center
        fill-height
        class="mt-5"
      >
        <v-flex
          v-for="i in 3"
          :key="i"
          xs4
          md3
          lg2
          class="px-3"
          style="border: 1px solid #fff;border-image: url(/border.svg) 1 round"
        >
          <div class="my-3">
            <h5 v-if="i === 1">
              <span class="headline">
                40,680
              </span>
              <br>
              <span class="subheading grey--text mt-2">
                已知游戏
              </span>
            </h5>
            <h5 v-if="i === 2">
              <span class="headline">
                609,564
              </span>
              <br>
              <span class="subheading grey--text mt-2">
                归档价格
              </span>
            </h5>
            <h5 v-if="i === 3">
              <span class="headline">
                37,465
              </span>
              <br>
              <span class="subheading grey--text mt-2">
                用户评测
              </span>
            </h5>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        align-start
        justify-center
        row
        wrap
        class="mt-5"
      >
        <v-flex
          v-for="i in 4"
          :key="i"
          xs6
          md3
          lg2
          class="px-3 my-3"
        >
          <smallCard />
        </v-flex>
      </v-layout>
      <div class="mt-3">
        <v-btn
          outline
          large
          round
        >浏览所有游戏</v-btn>
      </div>
      <div class="mt-5">
        <h4 class="display-1">
          接下来您将了解到什么?
        </h4>
        <h6 class="subheading grey--text mt-2">
          SteamHub 的内容并不匮乏,搜索大多数报道，探索您喜爱的拓展知识。
        </h6>
      </div>
      
      <div class="my-5">
        <swiperWitchLargeCard />
      </div>
      <div
        class="white--text pt-5"
        style="background: radial-gradient(circle at 1% 1%,#328bf2,#1644ad)"
      >
        <div class="mt-3">
          <h4 class="display-1">
            立即开启你的新旅程
          </h4>
          <h6 class="subheading mt-2">
            加入需要不到一分钟,这将是你一整天中做出的最佳决定.<br>
            SteamHub 是一个非盈利的开源项目,我们也提供开发者付费计划用以支持每月的服务器建设支出.
          </h6>
        </div>
        <div class="py-5">
          <v-layout
            align-center
            justify-center
            fill-height
          >
            <div>
              <v-text-field
                label="您的邮件地址"
                append-icon="email"
                type="email"
                solo
                color="white"
                background-color="transparent"
                dark
              >
                <v-btn
                  slot="append-outer"
                  round
                  style="top: -12px"
                >或使用 Steam 登录</v-btn>
              </v-text-field>
            </div>
          </v-layout>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import fullScreenPromotion from '~/components/jumbotron/fullScreenPromotion'
import smallCard from '~/components/card/small'
import swiperWitchLargeCard from '~/components/swiper/withLargeCard'
export default {
  components: {
    fullScreenPromotion,
    smallCard,
    swiperWitchLargeCard
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.container {
  padding: 0
}
</style>

