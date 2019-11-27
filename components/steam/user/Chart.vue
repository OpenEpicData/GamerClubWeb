<template>
  <div>
    <v-card flat color="transparent">
      <v-card-text>
        <h2 class="subtitle-2 text-center">Steam 在线人数</h2>

        <client-only>
          <!-- eslint-disable vue/require-component-is -->
          <component
            :is="apexchart"
            :options="options"
            :series="series"
            class="mt-5"
            height="300px"
            width="100%"
            type="area"
          />
        </client-only>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: null
    },
    series: {
      type: Array,
      default: null
    }
  },
  computed: {
    apexchart() {
      return () => {
        if (process.client) {
          return import('vue-apexcharts')
        }
      }
    }
  }
}
</script>
