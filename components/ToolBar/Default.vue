<template>
  <div>
    <div class="hidden-sm-and-down">
      <v-toolbar app fixed clipped-left class="white">
        <img src="/logo_64x64.png" alt="SteamHub Logo">
        <span class="title ml-3 mr-5">{{ ToolBar.title }}</span>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-for="(item, i) in ToolBar.items.left" :key="i" :to="item.link">{{ item.value }}</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat @click.stop="LoginDialog = true">
            加入社区
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
          <v-btn flat v-for="(item, i) in ToolBar.items.left" :key="i" :to="item.link" v-if="item.key !== 0">{{ item.value }}</v-btn>
        </v-toolbar-items>
        <v-tabs slot="extension" centered slider-color="black">
          <v-tab v-for="(item, i) in ToolBar.items.left" :key="i" :to="item.link" v-if="item.key !== 0">
            {{ item.value }}
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
    })
  }
</script>
