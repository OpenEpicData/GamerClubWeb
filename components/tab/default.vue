<template>
  <v-tabs 
    v-model="tab.model"
    :color="tab.color" 
    :slider-color="tab.slider.color"
    :centered="tab.centered"
    :fixed-tabs="tab.fixed"
    :dark="tab.dark"
    vertical
    class="hidden-sm-and-down"
    active-class="">
    <v-tab 
      v-for="(item, i) in tab.item"
      :key="i"
      :to="item.link"
    >
      {{ item.title }}
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
  updated() {
    this.tab.model = this.$route.fullPath
  }
}
</script>
