<template>
  <v-app id="inspire">
    <v-toolbar app fixed clipped-left class="white">
      <span class="title ml-3 mr-5">SteamHub</span>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">浏览</v-btn>
        <v-btn flat>趋势</v-btn>
      </v-toolbar-items>
      <v-text-field
        class="mt-2 ml-1"
        solo-inverted
        label="搜索暂不可用"
        append-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn 
        flat
        :disabled="dialog"
        @click.stop="dialog = true"
        >
          加入社区 <v-icon right>add_circle_outline</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content class="grey lighten-4">
      <nuxt />
    </v-content>
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          功能开发中
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      dialog: false
    }),
    props: {
      source: String
    },
    watch: {
      dialog (val) {
        if (!val) return
        setTimeout(() => (this.dialog = false), 1000)
      }
    }
  }
</script>

<style>
  #keep main .container {
    height: 660px;
  }
  .v-navigation-drawer__border {
    display: none;
  }
  .text {
    font-weight: 400;
  }
</style>