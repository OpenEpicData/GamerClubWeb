<template>
  <div>
    <v-hover>
      <div slot-scope="{ hover }" @mouseover="drawer_open(hover)" @mouseout="drawer_close(hover)">
        <v-navigation-drawer
          fixed
          dark
          app
          clipped
          :mini-variant="drawer.mini"
          width="200"
          hide-overlay
        >
          <v-list
            dense
            dark
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
        </v-navigation-drawer>
      </div>
    </v-hover>
    <v-toolbar app fixed clipped-left dark>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAELklEQVR4nO2YTWgbRxTH/07VYkMPMiRgQwreoBxkKoJys6kPEYTABnJwLrVCSo3aS9Qeyral0B5KqXMosg+hJlCUFFzkQ8HpIcg5ST4kyIcU5WDQHlykS0GCGlbgwApMedm4caPVh7Xym/UHeT8YgUbLfPz0Zt/MDAAgCAfm1FEP4KQjApmIQCYikIkIZCICmYhAJiKQiQhkIgKZiEAmIpCJCGQiApmIQCYikIkIZCICmYhAJiKQiQhkIgKZiEAmIpCJCGQiApmIQCYikIkIZCICmQQOpxsNsU8TSMzomIiEMTroX0+NegXmRh7Zu/cw9/CZfx01QX6W6OcZKv1DR4JdyVFqRvN1fj4K1Cn1uHo05lzYVP49SdrJEqhTesM+anMurLzhi8SBPYvq0GDki0hdCnb8tfFXHg/Wa6++DUK7PI2JEbUj6Ebt4ScYvXZPebtK/xFtoUj7xV7pvvt5I28pjza76wAsyn2hdr6KtzEG0rNR+Jhk96X2ZB43zg9gaGgA5+LzWN9qfSKI2K0MYor7VRd9d4o9o8O3CKyskN46ptkstaexKmVnj2kEJqeiKpvri3qlgNXWyl/zKNVbK0cwOZNU1q/CjbSB6Ji7xp0w/qPy2P3Ms0cZLP893FRzsMQyODTcXhnSMPxue3VQm3RS3SIq/XXRFUXhnKZSj+XqtRxoWe+UKePaNGvd27FyZCia9yEd5Xxgyzmy1RrAaQ3hESdtBTTEl4qYuFXAuhNa4csxREf8T2cn8jKhvvYdLp45h/HIOMZHx3HjNxONlz8EgtA+0BG/qR+KvN0u1TVlouq8sMNN++fRyM9I3izAanqqbi5j9c/X37VLzvvubPNkNUxqnTfhuzxfx2JsDq+vCSpY/ugzXJ/KYXrM41C3anjg8VEvKEvp6Y3eryr2NmYz0/FIlnrq/ej48linas5Kl/DcU1Nlc50ZC8MItVYmED7rdck2YK7NKx2Ssn8DoRQVewSCio20bWYoHtprI0rf9tNGNUsJlXNWKtAp+lLZd4G77Nhkb9v7nHs7YVPhB7X3g285H9/3Fa892PxjE+99eB0XT3fOT2//ewbPG0GcvxBB5MI1XJnWXYnHM6cCCLzjlD7SYH3tG1z5eBVthxMmSv+R3RIyKHcc7lKbsM10+1lZQfHhPvAVoSRWHqUwHep/P1Z7sogff3Fvf4BhXP06hfj7B2lvHompL9vPyopQH4H/F42SSyWydjyGiVWi7E/6vu3FF3JU9vre2y5TbiHu53U++Sxwb0nHyLiTpULFanvp29sWVTdylP4q1sdEo5S4vUIFs0pWl/YytxMUPYS5+beE3xBO5Fn4OCECmYhAJiKQiQhkIgKZiEAmIpCJCGQiApmIQCYikIkIZCICmYhAJiKQiQhkIgKZiEAmIpCJCGQiApmIQCYikIkIZPICBNiu4Qo5mxcAAAAASUVORK5CYII=" alt="SteamHub Logo" width="80px" height="100%">
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
        <v-btn flat v-if="this.$store.state.locale === 'zh-cn'" @click="enTo()" exact>English</v-btn>
        <v-btn flat v-else-if="this.$store.state.locale === 'en-us'" @click="cnTo()" exact>中文</v-btn>
        <v-btn flat :to="$i18n.path('changelog')" exact>{{ $t('ChangeLog') }}</v-btn>
        <v-btn flat @click.stop="LoginDialog = true" exact>
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
      display: null,
      mini: true
    },
    search: {
      value: null
    }
  }),
  mounted: function () {
    this.drawer.display = this.$vuetify.breakpoint.xs ? false : true
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
    },
    drawer_open: function (value) {
      this.drawer.mini = value ? false : ''
    },
    drawer_close: function (value) {
      this.drawer.mini = value ? true : ''
    }
  },
}
</script>
