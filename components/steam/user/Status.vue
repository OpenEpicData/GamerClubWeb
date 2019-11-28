<template>
  <div>
    <h2 class="display-2">Steam 在线人数</h2>

    <v-row class="mt-10">
      <v-col cols="12" sm="6" class="mt-5">
        <h3 class="display-1 primary--text">
          {{ parseInt(data.avg.toFixed(0)).toLocaleString() }}
        </h3>
        <h4 class="headline">
          平均在线
        </h4>
      </v-col>

      <v-col cols="12" sm="6" class="mt-5">
        <h3 class="display-1 primary--text">
          {{ data.max.toLocaleString() }}
        </h3>
        <h4 class="headline">
          今日峰值
        </h4>
      </v-col>

      <v-col cols="12" sm="6" class="mt-5">
        <h3 class="display-1 primary--text">
          {{ data.min.toLocaleString() }}
        </h3>
        <h4 class="headline">
          今日低谷
        </h4>
      </v-col>

      <v-col cols="12" sm="6" class="mt-5">
        <h3 class="display-1 primary--text">
          {{ data.now.user.toLocaleString() }}
        </h3>
        <h4 class="headline">
          当前在线
        </h4>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>
