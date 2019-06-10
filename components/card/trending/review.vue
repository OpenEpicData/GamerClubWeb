<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card 
        :to="`/${data.appid}`" 
        class="text-xs-left" 
        color="primary" 
        exact 
        outlined>
        <div>
          <v-img
            :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${data.appid}/header.jpg`"
            height="260px"
            class="elevation-5 primary"
          >
            <v-layout 
              align-start 
              justify-start 
              column 
              fill-height>
              <div>
                <div v-if="review.length > 0">
                  <v-chip
                    v-if="rating = review.length > 0 ? review[0].score / 20 : null"
                    slot="activator"
                    class="elevation-10"
                    color="primary"
                  >
                    <v-rating 
                      v-model="rating" 
                      half-increments 
                      dense/>
                    <v-avatar right>{{ review[0].score / 10 }}</v-avatar>
                  </v-chip>
                </div>
                <div v-else>
                  <v-chip 
                    class="elevation-10" 
                    color="primary">
                    暂无评分
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
            wrap 
            style="margin: 10px 5px;">
            <v-flex xs8>
              <h4 class="display-1 font-weight-bold text-no-wrap text-truncate">{{ data.name }}</h4>
              <div class="blue-grey--text">
                <h5 class="title text-no-wrap text-truncate">
                  By
                  <span v-if="data.publishers">{{ data.publishers }}</span>
                  <span v-else>Unkown</span>
                </h5>
              </div>
            </v-flex>
            <v-flex/>
            <v-flex 
              v-if="price.length > 0" 
              xs3 
              class="text-xs-right">
              <v-chip>
                <h4 class="title">
                  <span v-if="price.length === 0 && data.free === 1">免费</span>
                  <span v-else-if="price[0]">￥ {{ price[0].final }}</span>
                  <span v-else>未知</span>
                </h4>
              </v-chip>
            </v-flex>
            <v-flex 
              v-else 
              xs3>
              <v-chip disabled>
                <h4 class="title">
                  <del>￥ ??</del>
                </h4>
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
        </div>
      </v-card>
    </template>
  </v-hover>
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
