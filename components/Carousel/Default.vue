<template>
  <v-carousel delimiter-icon="far fa-circle" prev-icon="fas fa-angle-left" next-icon="fas fa-angle-right">
    <v-carousel-item transition="fade-transition" reverse-transition="fade-transition" v-for="(item, i) in carousel" :key="i" :dark="item.dark" :light="item.light">
      <v-img :src="item.src" :lazy-src="'/unknow.jpg'" :aspect-ratio="16/9" v-bind:class="item.color" height="100%"
        width="100%" :gradient="item.gradient">
        <v-layout align-center justify-space-around row fill-height>
          <v-flex xs5 sm5 md8 class="mx-3">
            <h1 class="display-1" id="header_description">{{ item.description }}</h1>
            <h4 class="subheading my-3">{{ item.star }}</h4>
            <v-btn :dark="item.dark" outline flat :light="item.light" large class="mx-0" :to="item.to">{{
              item.btn_title }}</v-btn>
          </v-flex>
          <v-flex xs1>
          </v-flex>
        </v-layout>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    props: {
      carousel: Array
    }
  }
</script>

<style>
  .el-carousel__item:nth-child(2n) {
    background-color: transparent;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: transparent;
  }

  .v-carousel__controls {
    background: transparent;
  }

  .v-carousel__next,
  .v-carousel__prev {
    margin: 0 1vw;
  }

  .v-carousel__prev .v-btn i,
  .v-carousel__next .v-btn i {
    color: #f5f5f5 !important;
    font-size: 30px !important;
    margin: 15px 20px;
  }

  .v-carousel {
    box-shadow: none;
    -webkit-box-shadow: none;
  }

  #header_description {
    line-height: 6vh !important;
  }
</style>