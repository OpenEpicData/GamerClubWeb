<template>
  <v-card
    height="240px"
    flat
  >
    <v-card
      height="180px"
      style="background: linear-gradient(180deg,#f44881,#ec454f);border-radius: .5rem;"
      flat
      dark
    >
      <v-layout
        align-center
        justify-space-around
        column
        fill-height
      >
        <div />
        <div>
          <v-img
            src="/gaming.svg"
            width="120px"
            height="120px"
            style="margin: 0 auto;"
          />
        </div>
        <div class="my-2">
          <h5 class="subheading">
            动作游戏
          </h5>
        </div>
      </v-layout>
    </v-card>
    <v-layout
      align-center
      justify-center
      row
      fill-height
      style="height:60px;border: 1px solid #ccc;border-radius: .5rem;border-image:url(/border.svg) 1 round"
    >
      <v-flex
        v-for="k in 3"
        :key="k"
      >
        <div
          v-if="k === 2"
          class="grey--text"
        >
          |
        </div>
        <div v-else-if="k === 1">
          <h5 class="subheading">
            3210
            <br>
            <span class="grey--text body-2">
              已知游戏
            </span>
          </h5>
        </div>
        <div v-else>
          <h5 class="subheading">
            518
            <br>
            <span class="grey--text body-2">
              收录评测
            </span>
          </h5>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>
