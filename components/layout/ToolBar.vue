<template>
  <v-app-bar flat color="transparent">
    <v-btn class="app-title" to="/" x-large outlined tile exact color="primary">
      <v-avatar>
        <v-icon size="48" color="primary" left>
          mdi-gamepad-variant-outline
        </v-icon>
      </v-avatar>
      EpicGamer
    </v-btn>

    <v-tabs
      class="d-flex justify-center"
      centered
      grow
      background-color="transparent"
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
          <v-icon left large>
            {{ item.icon }}
          </v-icon>
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
