<template>
  <v-slide-group 
    :v-model="1" 
    class="background" 
    center-active 
    show-arrows>
    <v-slide-item 
      v-for="(item, k) in slide" 
      :key="k">
      <v-card
        :href="item.path_full"
        :class="slide_margin(k, slide)"
        color="background"
        height="200"
        width="300"
        target="_black"
      >
        <v-img 
          :src="item.path_full" 
          height="100%" 
          width="100%"/>
      </v-card>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
export default {
  props: {
    slide: {
      type: Array,
      default: Array,
      required: true
    }
  },

  methods: {
    slide_margin(k, data) {
      return {
        'mx-2': k !== 0 && k !== data.length - 1
      }
    }
  }
}
</script>
