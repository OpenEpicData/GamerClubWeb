<template>
  <v-app-bar flat color="transparent">
    <v-toolbar-title class="app-title">
      <nuxt-link to="/" exact class="link">
        <v-avatar>
          <v-icon size="48" color="primary">
            mdi-gamepad-variant-outline
          </v-icon>
        </v-avatar>
        EpicGamer
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn v-for="(item, i) in appBar.data" :key="i" text>
      {{ item.text }}
    </v-btn>
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
          text: '数据分析'
        },
        {
          text: '关于我们'
        },
        {
          text: '中文'
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
