<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card 
        :to="`/${popular.appid}`" 
        class="text-xs-left" 
        color="secondary" 
        exact 
        outlined>
        <v-img
          :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${popular.appid}/header.jpg`"
          height="160px"
          class="elevation-5"
        >
          <v-layout 
            align-start 
            justify-start 
            column 
            fill-height>
            <div>
              <div v-if="popular.game_reviews.length > 0">
                <v-tooltip 
                  top 
                  color="accent primary--text">
                  <v-chip
                    v-if="rating = popular.game_reviews.length > 0 ? popular.game_reviews[0].score / 20 : null"
                    slot="activator"
                    class="elevation-10"
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
                    <v-avatar right>{{ popular.game_reviews[0].score / 10 }}</v-avatar>
                  </v-chip>
                  <span>
                    {{ popular.game_reviews[0].count }} 篇评测中
                    <strong>{{ popular.game_reviews[0].score }}%</strong> 的用户推荐
                  </span>
                </v-tooltip>
              </div>
              <div v-else>
                <v-chip 
                  small 
                  label 
                  class="elevation-10" 
                  color="primary">
                  暂无评分
                  <v-avatar right>?</v-avatar>
                </v-chip>
              </div>
            </div>
          </v-layout>
        </v-img>

        <v-layout 
          align-start 
          justify-space-between 
          row 
          wrap 
          style="margin: 10px 5px;">
          <v-flex xs8>
            <h4 class="title font-weight-bold text-no-wrap text-truncate">{{ popular.name }}</h4>
            <div class="blue-grey--text">
              <h5 class="body-2 text-no-wrap text-truncate">
                By
                <span
                  v-if="popular.game_list && popular.game_list.publishers"
                  
                >{{ popular.game_list.publishers }}</span>
                <span v-else>Unkown</span>
              </h5>
              <h5 class="caption">当前在线: {{ popular.current }}</h5>
            </div>
          </v-flex>
          <v-flex/>
          <v-flex 
            v-if="popular.game_prices.length > 0" 
            xs3 
            class="text-xs-right">
            <v-chip 
              small 
              color="primary">
              <span v-if="popular.game_prices.length === 0 && popular.game_list.free === 1">免费</span>
              <span
                v-else-if="popular.game_prices.length > 2 && popular.game_prices[2].final > popular.game_prices[1].final"
              >
                <span class="accent--text body-2">￥ {{ popular.game_prices[0].final }}</span>
              </span>
              <span v-else-if="popular.game_prices[0] ">￥ {{ popular.game_prices[0].final }}</span>
              <span v-else>未知</span>
            </v-chip>
          </v-flex>
          <v-flex 
            v-else 
            xs3 
            class="text-xs-right">
            <v-chip 
              small 
              disabled>
              <del>￥ ?</del>
            </v-chip>
          </v-flex>
        </v-layout>

        <v-fade-transition>
          <v-overlay 
            v-if="hover" 
            absolute 
            color="primary">
            <v-btn>浏览更多</v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    popular: {
      type: null,
      default: null,
      required: true
    },
    truncate: {
      type: null,
      default: null
    }
  },
  data() {
    return {
      rating: null
    }
  }
}
</script>
