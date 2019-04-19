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
          height="260px"
          class="elevation-5 secondary"
        >
          <v-layout 
            align-start 
            justify-start 
            column 
            fill-height>
            <div>
              <div v-if="popular.game_reviews.length > 0">
                <v-chip
                  v-if="rating = popular.game_reviews.length > 0 ? popular.game_reviews[0].score / 20 : null"
                  slot="activator"
                  class="elevation-10"
                  color="accent"
                >
                  <v-rating 
                    v-model="rating" 
                    half-increments 
                    dense/>
                  <v-avatar right>{{ popular.game_reviews[0].score / 10 }}</v-avatar>
                </v-chip>
              </div>
              <div v-else>
                <v-chip 
                  class="elevation-10" 
                  color="accent">
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
            <h4 class="display-1 font-weight-bold text-no-wrap text-truncate">{{ popular.name }}</h4>
            <div class="blue-grey--text">
              <h5 class="title text-no-wrap text-truncate">
                By
                <span
                  v-if="popular.game_list && popular.game_list.publishers"
                >{{ popular.game_list.publishers }}</span>
                <span v-else>Unkown</span>
              </h5>
            </div>
          </v-flex>
          <v-flex/>
          <v-flex 
            v-if="popular.game_prices.length > 0" 
            xs3 
            class="text-xs-right">
            <v-chip>
              <h4 class="title">
                <span v-if="popular.game_prices.length === 0 && popular.game_list.free === 1">免费</span>
                <span
                  v-else-if="popular.game_prices.length > 2 && popular.game_prices[2].final > popular.game_prices[1].final"
                >￥ {{ popular.game_prices[0].final }}</span>
                <span v-else-if="popular.game_prices[0] ">￥ {{ popular.game_prices[0].final }}</span>
                <span v-else>未知</span>
              </h4>
            </v-chip>
          </v-flex>
          <v-flex 
            v-else 
            xs3 
            class="text-xs-right">
            <v-chip disabled>
              <h4 class="title">
                <del>￥ ?</del>
              </h4>
            </v-chip>
          </v-flex>
        </v-layout>

        <v-fade-transition>
          <v-overlay 
            v-if="hover" 
            absolute 
            color="primary">
            <v-btn large>浏览更多</v-btn>
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
