<template>
  <v-app>
    <div>
      <v-app-bar color="primary tertiary--text">
        <span class="title ml-3 mr-5">
          EpicData&nbsp;|
          <span class="font-weight-light">Gamer</span>
        </span>
        <v-text-field
          disabled
          solo-inverted
          flat
          hide-details
          label="搜索"
          prepend-inner-icon="mdi-magnify"
          class="d-none d-md-flex"
        ></v-text-field>
        <v-spacer></v-spacer>

        <v-btn rounded large color="secondary" disabled>加入抢先体验计划</v-btn>
      </v-app-bar>
    </div>
    <v-content class="secondary">
      <nuxt />
    </v-content>
  </v-app>
</template>

<style lang="scss">
.secondary-primary {
  background: linear-gradient(90deg, #3d4a5c, #243042);
}
.v-card {
  $height: 34px;
  .v-sheet,
  .v-toolbar__content {
    height: $height !important;
  }
  .v-toolbar__content {
    padding: 0px 14px;
  }
}
</style>
