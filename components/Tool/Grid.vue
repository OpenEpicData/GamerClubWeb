<template>
  <v-container fluid class="index-main-container" style="height: 100%">
    <v-layout row wrap style="height: 100%;" class="mx-2">
      <v-flex d-flex xs12 sm9>
        <v-layout row wrap>
          <v-flex d-flex style="border: 1px solid #fff">
            <v-card color="black" dark tile flat>
              <v-layout fill-height align-center justify-center>
                <v-flex>
                  <h2 class="text-xs-center display-2">
                    <a href="https://steamcdn-a.akamaihd.net/client/installer/SteamSetup.exe" target="_black" class="white--text">
                      {{ $t('Tool.Grid.Download-Steam') }}
                    </a>
                  </h2>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm3 child-flex style="border: 1px solid #fff">
        <v-layout column>
          <v-flex d-flex xs12 v-for="(item, i) in side" :key="i">
            <v-card color="black" dark tile flat>
              <v-layout fill-height align-center justify-center>
                <v-flex>
                  <h4 class="text-xs-center headline">
                    <nuxt-link :to="$i18n.path(item.to)" class="white--text">{{ item.title }}</nuxt-link>
                  </h4>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs3 v-for="(item, i) in bottom" :key="i" style="border: 1px solid #fff">
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card tile flat dark color="black">
              <v-layout fill-height align-center justify-center>
                <v-flex>
                  <h4 class="text-xs-center">
                    <nuxt-link :to="$i18n.path(item.to)" class="white--text">{{ item.title }}</nuxt-link>
                  </h4>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      side: [
        { title: this.$t('Tool.Grid.Beginner-tutorial'), to: '' },
        { title: this.$t('Tool.Grid.Community-information'), to: '' }
      ],
      bottom: [
        { title: this.$t('Tool.Grid.Grievance-guide'), to: '' },
        { title: this.$t('Tool.Grid.Account-inquiry'), to: '' },
        { title: this.$t('Tool.Grid.Server-status'), to: '' },
        { title: this.$t('Tool.Grid.Player-community'), to: '' },
      ]
    }
  }
}
</script>

<style scoped>
a {
  text-decoration:none !important;
}
</style>

