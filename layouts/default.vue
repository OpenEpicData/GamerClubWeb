<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      class="grey lighten-4 toolbar-drawer"
      app
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-layout
            v-if="item.heading"
            :key="i"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-3"
          ></v-divider>
          <v-list-tile
            v-else
            :key="i"
            :to=item.link
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer" class="toolbar-drawer-icon"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">SteamHub</span>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>浏览</v-btn>
        <v-btn flat>趋势</v-btn>
      </v-toolbar-items>
      <v-text-field
        class="mt-2"
        solo-inverted
        label="搜索其实很简单"
        append-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>加入社区 <v-icon right>add_circle_outline</v-icon></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content class="grey lighten-4">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      items: [
        { icon: 'home', text: '主页', link: '/' },
        { divider: true },
        { heading: '游戏' },
        { icon: 'list', text: '列表', link: '/steam/game/list' },
        { icon: 'search', text: '搜索', link: '/steam/game/search' },
        { divider: true }
      ]
    }),
    props: {
      source: String
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