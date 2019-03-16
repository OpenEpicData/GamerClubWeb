<template>
  <v-card 
    :to="`/${data.appid}`" 
    height="160px" 
    class="text-xs-left" 
    color="primary">
    <div>
      <v-img
        :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${data.appid}/header.jpg`"
        height="160px"
        class="elevation-5"
      >
        <v-layout 
          align-space-around 
          justify-space-between 
          fill-height 
          column>
          <div>
            <div v-if="review.length > 0">
              <v-tooltip 
                top 
                color="accent primary--text">
                <v-chip
                  v-if="rating = review.length > 0 ? review[0].score / 20 : null"
                  slot="activator"
                  small
                  label
                  color="primary"
                >
                  <v-rating
                    v-model="rating"
                    color="accent"
                    background-color="transparent"
                    half-increments
                    dense
                    small
                  />
                  <v-avatar right>{{ review[0].score / 10 }}</v-avatar>
                </v-chip>
                <span>{{ review[0].count }} 篇评测中 <strong>{{ review[0].score }}%</strong> 的用户推荐</span>
              </v-tooltip>
            </div>
            <div v-else>
              <v-chip 
                small 
                label 
                color="primary"
                class="elevation-10">暂无评分
                <v-avatar right>?</v-avatar>
              </v-chip>
            </div>
          </div>
        </v-layout>
      </v-img>
    </div>
    <div>
      <v-layout 
        align-start 
        justify-space-between 
        row 
        style="margin: 10px 5px;">
        <v-flex xs8>
          <h4 class="title font-weight-bold">{{ data.name }}</h4>
          <div class="blue-grey--text">
            <h5 
              v-if="data.publishers" 
              class="body-2">By {{ data.publishers }}</h5>
            <h5 class="caption">
              <span v-if="data.released_at">{{ data.released_at }}</span>
            </h5>
          </div>
        </v-flex>
        <v-flex/>
        <v-flex 
          v-if="price.length > 0" 
          xs3 
          class="text-xs-right">
          <v-chip 
            small 
            color="primary">
            <span v-if="price.length === 0 && data.free === 1">免费</span>
            <span v-else-if="price[0]">￥ {{ price[0].final }}</span>
            <span v-else>未知</span>
          </v-chip>
        </v-flex>
        <v-flex 
          v-else 
          xs3>
          <v-chip 
            small 
            disabled>
            <del>￥ ??</del>
          </v-chip>
        </v-flex>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    review: {
      type: null,
      default: null,
      required: true
    },
    price: {
      type: null,
      default: null,
      required: true
    },
    data: {
      type: null,
      default: null,
      required: true
    },
    color: {
      type: null,
      default: null,
      required: true
    }
  },
  data() {
    return {
      rating: null
    }
  }
}
</script>
