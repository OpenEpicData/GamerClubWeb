<template>
  <v-layout
    align-center
    justify-center
    class="white--text"
  >
    <v-img
      :aspect-ratio="16/9"
      src="https://i.loli.net/2018/11/15/5bed603019f22.png"
      height="100vh"
      gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
    >
      <v-layout
        align-space-between
        justify-space-between
        fill-height
        column
      >
        <div />
        <div>
          <h1 class="display-4">
            <span class="font-weight-thin">
              准确完整的
            </span>
            <span class="font-weight-black">
              Steam 数据
            </span>
          </h1>
          <h2 class="display-2 my-3">
            <span>
              通过 SteamHub,探索你不知道的 Steam 秘密
            </span>
          </h2>
          <div>
            <v-btn
               
              large
              color="primary"
              to="/game/trending"
            >
              查看趋势
            </v-btn>
            <v-btn
               
              large
              outline
              dark
              to="/game/"
            >
              浏览游戏
            </v-btn>
          </div>
        </div>
        <div>
          <v-icon
            x-large
            dark
          >
            fas fa-angle-double-down faa-bounce animated
          </v-icon>
        </div>
      </v-layout>
    </v-img>
  </v-layout>
</template>
