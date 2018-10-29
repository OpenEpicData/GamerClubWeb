<template>
  <div>
    <v-bottom-nav class="hidden-md-and-up" :active.sync="BottomNavIndex" color="black" :value="true" fixed shift>
      <v-btn v-for="(item, i) in BottomNav.items" :key="i" :to="$i18n.path(item.link)" @click.stop="LoginDialog = item.click" dark>
        <span>{{ $t(item.value) }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-nav>
    <LoginDialog :LoginDialog.sync="LoginDialog"></LoginDialog>
  </div>
</template>

<script>
import LoginDialog from '~/components/Login/Dialog'

export default {
  props: ['BottomNav'],
  components: {
    LoginDialog
  },
  data: () => ({
    BottomNavIndex: 1,
    LoginDialog: false
  }),
  watch: {
    BottomNavIndex: function (val) {
      if (val === 2) {
        this.BottomNavIndex = 1
      }
    }
  }
}
</script>
