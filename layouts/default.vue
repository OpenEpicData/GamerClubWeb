<template>
  <v-app id="inspire">
    <v-toolbar app fixed clipped-left class="white">
      <span class="title ml-3 mr-5">SteamHub</span>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">浏览</v-btn>
        <v-btn flat>趋势</v-btn>
      </v-toolbar-items>
      <v-text-field
        class="mt-2 ml-1 hidden-sm-and-down"
        solo-inverted
        label="搜索 游戏名称,ID"
        append-icon="search"
        v-model="search"
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
    <v-bottom-nav
      class="hidden-md-and-up"
      :active.sync="bottomNav"
      color="white"
      :value="true"
      fixed
      shift
    >
      <v-btn>
        <span>搜索</span>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn>
        <span>浏览</span>
        <v-icon>list</v-icon>
      </v-btn>

      <v-btn 
      :disabled="dialog"
      @click.stop="dialog = true"
      >
        <span>加入社区</span>
        <v-icon>add_circle_outline</v-icon>
      </v-btn>

    </v-bottom-nav>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      bottomNav: 1,
      search: ''
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