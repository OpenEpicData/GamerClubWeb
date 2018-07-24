<template>
  <v-layout row wrap>
    <v-flex xs8>
      <v-btn color="deep-purple lighten-1" :dark="item.dark" :to="item.link" :outline="item.outline" :disabled="item.disable" v-for="(item,i) in gameHeader" :key="i">
        <v-icon left class="mt-1">{{ item.icon }}</v-icon>{{ item.text }}
      </v-btn>
    </v-flex>
    <v-flex xs4>
      <div class="text-xs-right mt-3">
        <h3>上次更新: {{ lastUpdated | time }}</h3>
      </div>
    </v-flex>
    <v-tooltip top>
      <v-btn fixed dark fab bottom right color="orange" slot="activator" :href="'https://store.steampowered.com/app/' + appID" target="_balck">
        <v-icon>shop</v-icon>
      </v-btn>
      <span>前往 Steam 商店购买</span>
    </v-tooltip>
  </v-layout>
</template>

<script>
  import relativeTime from 'dayjs/plugin/relativeTime'
  import dayjs from 'dayjs'

  import 'dayjs/locale/zh-cn'
  dayjs.extend(relativeTime)

  export default {
    props: [
      'gameHeader',
      'lastUpdated',
      'appID'
    ],
    filters: {
      time: function (value) {
        return dayjs().locale('zh-cn').from(dayjs(value))
      }
    }
  }
</script>
