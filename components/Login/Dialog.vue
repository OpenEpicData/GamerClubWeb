<template>
    <v-dialog
      v-model="LoginDialog"
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <div>
          <v-container class="text-xs-center" style="padding-bottom: 0">
            <h2 class="headline">加入社区</h2>
            <h6 class="body-1">SteamHub 是针对游戏和创意社区的数据交流平台</h6>
            <div class="mt-5">
              <v-btn disabled><v-icon left>fas fa-gamepad</v-icon>登录方式：InBuff</v-btn> <br>
              <span class="body-1 font-weight-bold">没有账户？<a href="#!" class="white--text">创建一个账户</a></span>
            </div>
            <v-divider class="mt-5" color="grey"></v-divider>
            <div>
              <v-btn flat disabled><v-icon left>fas fa-caret-down</v-icon>其他登录方式</v-btn>
            </div>
          </v-container>
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block color="blue" style="margin: 9px 0 0 0;box-shadow: none;-webkit-box-shadow:none ">服务条款</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block color="blue" style="margin: 9px 0 0 0;box-shadow: none;-webkit-box-shadow:none">隐私政策</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    props: {
      LoginDialog: {
        default: false
      }
    },
    watch: {
      LoginDialog (val) {
        if (this.$route.path === '/login') {
          if (!val) {
            this.$router.push('/')
          } else {
            this.$router.push('login')
          }
        } else {
          if (!val) {
            this.$emit('update:LoginDialog', false)
          }
        }
      }
    }
  }
</script>

