<template>
  <v-app-bar flat color="transparent">
    <v-badge>
      <template v-slot:badge>Beta</template>
      <v-btn class="app-title" to="/" x-large outlined tile exact dark text>
        <h2 class="display-1">
          EpicGamer
        </h2>
      </v-btn>
    </v-badge>

    <v-tabs
      class="d-flex justify-start pl-5"
      centered
      grow
      background-color="transparent"
      dark
    >
      <v-tab
        v-for="(item, i) in appBar.data"
        :key="i"
        :to="item.link"
        :disabled="!item.link"
        text
        exact
      >
        <h2 class="title font-weight-bold">
          {{ item.text }}
        </h2>
      </v-tab>
    </v-tabs>

    <v-text-field
      label="搜索"
      disabled
      hide-details
      solo
      rounded
      outlined
      dense
      flat
    />
  </v-app-bar>
</template>

<style lang="scss" scoped>
.app-title {
  font-family: 'Comic Sans MS', 'Comic Sans', cursive;
}
</style>

<script>
export default {
  data: () => ({
    appBar: {
      data: [
        {
          text: '主页',
          link: '/',
          icon: 'mdi-home-outline'
        },
        {
          text: '业内新闻',
          link: '/news',
          icon: 'mdi-newspaper-variant-outline'
        },

        {
          text: '数据报告',
          link: '/data',
          icon: 'mdi-chart-timeline'
        },
        {
          text: '游戏库',
          link: '/game',
          icon: 'mdi-gamepad-square-outline'
        }
      ]
    }
  })
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration-line: none !important;
}
</style>
