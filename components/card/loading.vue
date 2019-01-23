<template>
  <v-card
    height="160px"
    class="text-xs-left"
    color="transparent"
    flat
  >
    <v-container grid-list-sm fluid>
      <div>
        <v-img
          :src="`https://s2.ax1x.com/2019/01/23/kE9MQ0.png`"
          :lazy-src="`https://s2.ax1x.com/2019/01/23/kE9MQ0.png`"
          height="160px"
        >
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </v-img>
      </div>
    </v-container>
  </v-card>
</template>