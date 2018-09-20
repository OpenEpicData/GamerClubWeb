<template>
  <v-carousel
    delimiter-icon="far fa-circle"
    prev-icon="fas fa-angle-left"
    next-icon="fas fa-angle-right"
  >
    <v-carousel-item
      transition="fade-transition"
      v-for="(item, i) in carousel"
      :key="i"
      :dark="item.dark"
      :light="item.light"
    >
      <v-img
        :src="item.src"
        :lazy-src="'/unknow.jpg'"
        :aspect-ratio="16/9"
        v-bind:class="item.color"
        height="100%"
        width="100%"
        :gradient="item.gradient"
      >
        <v-layout
          align-center
          justify-space-around
          row
          fill-height
        >
          <v-flex
            xs3
            v-if="item.right"
          >
          </v-flex>
          <v-flex
            xs5
            sm5
            md8
            class="mx-3"
          >
            <h1
              class="display-1"
              id="header_description"
            >{{ item.description }}</h1>
            <h4 class="subheading my-3">{{ item.star }}</h4>
            <v-btn
              :dark="item.dark"
              outline
              flat
              :light="item.light"
              large
              class="mx-0"
              :to="item.to"
            >{{ item.btn_title }}</v-btn>
          </v-flex>
          <v-flex
            xs1
            v-if="item.left"
          >
          </v-flex>
        </v-layout>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: ['carousel'],
  data: () => ({
    carousel: [
      {
        src: String,
        left: Boolean,
        title: String,
        description: String,
        btn_title: String,
        color: String,
        dark: Boolean,
        star: String,
        to: String,
        gradient: String
      }
    ]
  })
}
</script>

<style>
  .el-carousel__item:nth-child(2n) {
    background-color: transparent;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: transparent;
  }
</style>
