<template>
  <div>
    <v-navigation-drawer
      v-model="drawer.display"
      fixed
      class="grey lighten-3"
      app
      clipped
      :mini-variant="drawer.mini"
      width="200"
    >
      <v-list
        dense
        class="grey lighten-3 pt-3"
      >
        <template v-for="(item, i) in ToolBar">
          <v-layout
            v-if="item.heading"
            :key="i"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                <span>{{ $t(item.heading) }}</span>
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
            :to="$i18n.path(item.link)"
            :exact="item.link === 'topic' ? false : true"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                <span>{{ $t(item.text) }}</span>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <v-footer fixed color="grey lighten-3">
        <v-flex text-xs-center>
          <v-btn block flat @click="drawer.mini = true" v-if="!drawer.mini">
            <v-icon>fas fa-long-arrow-alt-left</v-icon>
          </v-btn>
          <v-btn block flat @click="drawer.mini = false" v-else>
            <v-icon>fas fa-long-arrow-alt-right</v-icon>
          </v-btn>
        </v-flex>
      </v-footer>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <img src="data:image/png;base64,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" alt="SteamHub Logo" width="80px" height="100%">
      <span class="title mx-3">SteamHub</span>
      <v-text-field
        solo-inverted
        flat
        hide-details
        :label="this.$t('search')"
        prepend-inner-icon="search"
        class="hidden-sm-and-down"
        @keyup.enter="go_search()"
        v-model="search.value"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-if="this.$store.state.locale === 'zh-cn'" @click="enTo()">English</v-btn>
        <v-btn flat v-else-if="this.$store.state.locale === 'en-us'" @click="cnTo()">中文</v-btn>
        <v-btn flat @click.stop="LoginDialog = true">
          {{ $t('Join the community') }}
          <v-icon right>add_circle_outline</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <LoginDialog :LoginDialog.sync="LoginDialog"></LoginDialog>
  </div>
</template>

<script>
import LoginDialog from '~/components/Login/Dialog'
export default {
  props: ['ToolBar'],
  components: {
    LoginDialog
  },
  data: () => ({
    LoginDialog: false,
    drawer: {
      display: true,
      mini: true
    },
    search: {
      value: null
    }
  }),
  mounted: function () {
    this.search_value_display()
  },
  methods: {
    enTo: function (value) {
      this.$router.push(this.$router.currentRoute.path.replace('zh-cn', 'en-us'))
    },
    cnTo: function (value) {
      this.$router.push(this.$router.currentRoute.path.replace('en-us', 'zh-cn'))
    },
    go_search: function () {
      const value = this.search.value
      if (value && value.length !== 0) {
        this.$router.push(this.$i18n.path('search/q/' + value))
      }
    },
    search_value_display: function () {
      const search_param = this.$router.currentRoute.params.q
      if (search_param && search_param.length !== 0) {
        this.search.value = search_param
      }
    }
  }
}
</script>
