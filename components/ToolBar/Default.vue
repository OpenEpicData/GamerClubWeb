<template>
  <div>
    <div class="hidden-sm-and-down">
      <v-toolbar app fixed clipped-left class="white">
        <img src="/logo_64x64.png" alt="SteamHub Logo">
        <span class="title ml-3 mr-5">{{ ToolBar.title }}</span>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-for="(item, i) in ToolBar.items.left" :key="i" :to="$i18n.path(item.link)">{{ $t(item.value) }}</v-btn>
        </v-toolbar-items>
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
    </div>
    <div class="hidden-md-and-up">
      <v-toolbar app tabs fixed clipped-left class="white">
        <img src="/logo_20x20_white.png" alt="SteamHub Logo">
        <span class="title ml-3 mr-5 mt-2">{{ ToolBar.title }}</span>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-for="(item, i) in ToolBar.items.left" :key="i" :to="$i18n.path(item.link)" v-if="item.key !== 0">{{ $t(item.value) }}</v-btn>
        </v-toolbar-items>
        <v-tabs slot="extension" centered slider-color="black">
          <v-tab v-for="(item, i) in ToolBar.items.left" :key="i" :to="$i18n.path(item.link)"  v-if="item.key !== 0">
            {{ $t(item.value) }}
          </v-tab>
        </v-tabs>
      </v-toolbar>
    </div>
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
    LoginDialog: false
  }),
  methods: {
    enTo: function (value) {
      this.$router.push(this.$router.currentRoute.path.replace('zh-cn', 'en-us'))
    },
    cnTo: function (value) {
      this.$router.push(this.$router.currentRoute.path.replace('en-us', 'zh-cn'))
    }
  }
}
</script>
