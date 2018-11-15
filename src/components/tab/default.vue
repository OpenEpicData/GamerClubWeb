<template>
  <v-tabs
    v-model="tab.model"
    :color="tab.color"
    :slider-color="tab.slider.color"
    :centered="tab.centered"
    :fixed-tabs="tab.fixed"
    :dark="tab.dark"
    height="60vh"
    active-class=""
  >
    <v-tab
      v-for="(item, i) in tab.item"
      :key="i"
      :to="item.link"
      ripple
    >
      <h2 class="title font-weight-bold">
        {{ item.title }}
      </h2>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  props: {
    tab: {
      type: null,
      default: null,
      required: true
    }
  },
  updated () {
    this.tab.model = this.$route.fullPath
  }
}
</script>

<style>
.v-tabs__slider {
  border-bottom: 5px solid #fff;
  border-radius: 9999px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>


