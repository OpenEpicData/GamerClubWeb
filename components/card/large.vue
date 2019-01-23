<template>
  <v-card
    height="260px"
    color="transparent"
    class="elevation-3 my-2"
    style="border-radius: .5rem;"
  >
    <v-layout
      align-start
      justify-start
      fill-height
    >
      <v-flex
        xs12
        md4
        fill-height
        class="white--text"
        style="background: linear-gradient(180deg,#FFD200,#FFD200);border-radius: .5rem;"
      >
        <v-layout
          align-center
          justify-space-around
          column
          fill-height
        >
          <div>
            <v-btn
              color="amber darken-1"
              depressed
              rounded 
              dark
            >
              新闻
            </v-btn>
          </div>
          <div>
            <v-img
              src="data:image/png;base64,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"
              width="120px"
              height="120px"
              style="margin: 0 auto;"
            />
          </div>
          <div>
            <v-btn
              text
            >
              <v-icon left>
                far fa-newspaper
              </v-icon>
              {{ news.Site }}
            </v-btn>
          </div>
        </v-layout>
      </v-flex>
      <v-flex
        xs12
        md8
        fill-height
        class="px-5 text-xs-left"
      >
        <v-layout
          align-start
          justify-center
          column
          fill-height
        >
          <div>
            <h5
              class="font-weight-medium hide-2line"
              style="color: #3d4852;font-size: 1.5rem;"
            >
              因为一个感人的故事，任天堂允许在自己赞助...
            </h5>
          </div>
          <div class="my-3">
            <h6
              class="font-weight-regular hide-3line"
              style="font-size: .875rem;"
            >
              在日本，有个叫“奇迹体验”的节目组，节目内容也正如其名，介绍来自世界各地难以置信的故事，或充满希望，或让人毛骨悚然，都永远围绕着“奇迹”二字。
            </h6>
          </div>
          <div>
            <v-chip
              flat
              rounded
              small
              class="mx-0 grey--text"
              color="transparent"
            >
              <v-icon
                small
                left
              >
                fas fa-gamepad
              </v-icon>
              4个相关游戏
            </v-chip>
            <v-chip
              flat
              rounded
              small
              class="mx-0 grey--text"
              color="transparent"
            >
              <v-icon
                small
                left
              >
                fas fa-clock
              </v-icon>
              2018-11-14
            </v-chip>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    news: {
      type: null,
      default: null,
      required: true
    }
  }
}
</script>
