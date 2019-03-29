<template>
  <div>
    <v-card 
      :loading="loading" 
      class="mx-auto" 
    />
    <v-img
      :src="`https://s2.ax1x.com/2019/01/23/kE9MQ0.png`"
      :lazy-src="`https://s2.ax1x.com/2019/01/23/kE9MQ0.png`"
      height="160px"
      class="elevation-5"
    >
      <v-layout 
        align-start 
        justify-start 
        column 
        fill-height>
        <div>
          <v-chip 
            slot="activator" 
            class="elevation-10" 
            small 
            label 
            color="primary">
            <v-rating
              v-model="rating"
              color="accent"
              background-color="secondary"
              half-increments
              dense
              small
            />
            <v-avatar 
              right 
              class="secondary--text">0</v-avatar>
          </v-chip>
        </div>
      </v-layout>
    </v-img>

    <v-layout
      align-start
      justify-space-between
      row
      wrap
      class="text-xs-left"
    >
      <v-flex xs12>
        <v-progress-linear 
          v-for="i in 3" 
          :indeterminate="true" 
          :key="i" 
          height="3"/>
              
      </v-flex>
      <v-flex/>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: null,
      default: null,
      required: true
    }
  },
  data: function() {
    return {
      rating: 0
    }
  }
}
</script>
