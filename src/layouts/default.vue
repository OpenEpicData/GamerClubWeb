<template>
  <v-app>
    <v-toolbar
      flat
      absolute
      color="transparent"
      dark
    >
      <v-toolbar-title>SteamHub</v-toolbar-title>
      <v-spacer />
      <div class="hidden-sm-and-down">
        <v-btn flat>注册</v-btn>
        <v-btn
          flat
          outline
          round
        >立即开始</v-btn>
      </div>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<style>
@media (min-width: 0) and (max-width: 600px) {
  .display-4 {
    font-size: 30px !important;
  }
  .display-2 {
    font-size: 15px !important;
  }
  .display-1 {
    font-size: 25px !important;
  }
}
@media (min-width: 600px) and (max-width: 960px) {
  .display-4 {
    font-size: 50px !important;
  }
  .display-2 {
    font-size: 25px !important;
  }
}
@media (min-width: 960px) and (max-width: 1264px) {
  .display-4 {
    font-size: 70px !important;
  }
  .display-2 {
    font-size: 35px !important;
  }
}
@media (min-width: 1264px) and (max-width: 1904px) {
  .display-4 {
    font-size: 90px !important;
  }
  .display-2 {
    font-size: 45px !important;
  }
}
</style>
