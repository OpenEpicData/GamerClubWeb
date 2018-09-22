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
            <h2 class="headline">{{ $t('Join the community') }}</h2>
            <h6 class="body-1">{{ $t('SteamHub is a data exchange platform for games and creative communities') }}</h6>
            <div class="mt-5">
              <v-btn disabled><v-icon left>fas fa-gamepad</v-icon>{{ $t('Login Method') }}：InBuff</v-btn> <br>
              <span class="body-1 font-weight-bold">{{ $t('No account') }}? <a href="#!" class="white--text">{{ $t('Create an account') }}</a></span>
            </div>
            <v-divider class="mt-5" color="grey"></v-divider>
            <div>
              <v-btn flat disabled><v-icon left>fas fa-caret-down</v-icon>{{ $t('Other login methods') }}</v-btn>
            </div>
          </v-container>
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn block color="blue" style="margin: 9px 0 0 0;box-shadow: none;-webkit-box-shadow:none ">{{ $t('Terms of Service') }}</v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn block color="blue" style="margin: 9px 0 0 0;box-shadow: none;-webkit-box-shadow:none">{{ $t('Privacy Policy') }}</v-btn>
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

