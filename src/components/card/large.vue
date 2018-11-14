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
        style="background: linear-gradient(180deg,#f44881,#ec454f);border-radius: .5rem;"
      >
        <v-layout
          align-center
          justify-space-around
          column
          fill-height
        >
          <div>
            <v-btn
              color="pink darken-1"
              depressed
              round
              dark
            >
              新闻
            </v-btn>
          </div>
          <div>
            <v-img
              src="/book.svg"
              width="120px"
              height="120px"
              style="margin: 0 auto;"
            />
          </div>
          <div>
            <v-btn
              flat
              dark
            >
              <v-icon left>
                far fa-newspaper
              </v-icon>
              游研社
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
              class="font-weight-medium"
              style="color: #3d4852;font-size: 1.5rem;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;"
            >
              因为一个感人的故事，任天堂允许在自己赞助...
            </h5>
          </div>
          <div class="my-3">
            <h6
              class="font-weight-regular"
              style="font-size: .875rem;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;"
            >
              在日本，有个叫“奇迹体验”的节目组，节目内容也正如其名，介绍来自世界各地难以置信的故事，或充满希望，或让人毛骨悚然，都永远围绕着“奇迹”二字。
            </h6>
          </div>
          <div>
            <v-chip
              flat
              round
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
              round
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
