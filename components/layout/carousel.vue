<template>
  <v-carousel
    hide-delimiter-background
    hide-delimiters>
    <v-carousel-item 
      v-for="(item, k) in carousel" 
      :key="k"
      style="cursor:pointer"
      class="elevation-3"
      @click="target(item.href)">
      <v-sheet 
        height="100%" 
        tile>
        <v-img
          :src="item.img.src"
          aspect-ratio="16/9"
          height="100%"
          gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.7), rgba(0,0,0,.9)"
        >
          <v-layout 
            align-end 
            fill-height 
            justify-center >
            <div class="text-xs-center">
              <h1>
                {{ item.content.title }}
              </h1>
              <h3>
                {{ item.content.desc }}
              </h3>
            </div>
          </v-layout>

        </v-img>

      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    carousel: {
      type: Array,
      default: Array,
      required: true
    }
  },
  methods: {
    target(href) {
      window.open(href, '_blank')
    }
  }
}
</script>
