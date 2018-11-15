<template>
  <v-card
    height="160px"
    class="text-xs-left"
  >
    <div>
      <v-img
        :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${review.AppID}/header.jpg`"
        height="160px"
      >
        <v-layout
          align-start
          justify-start
          fill-height
          column
        >
          <div>
            <v-chip
              small
              class="grey lighten-2"
            >
              <v-icon
                small
                left
              >
                far fa-smile-beam
              </v-icon>
              <span>
                {{ review.app_review[0].ReviewTitle }}
                {{ review.app_review[0].ReviewPeople }}
              </span>
            </v-chip>
          </div>
        </v-layout>
      </v-img>
    </div>
    <div>
      <v-layout
        align-start
        justify-space-between
        row
        style="margin: 0 5px;"
      >
        <div>
          <h4 class="body-2 font-weight-bold">
            {{ review.Name }}
          </h4>
          <h5 class="caption">
            {{ review.LastUpdated }}
          </h5>
        </div>
        <div />
        <div>
          <v-chip
            small
            class="grey lighten-2"
          >
            <span v-if="review.app_price.length === 0 && review.Free === 1">
              免费
            </span>
            <span v-else-if="review.app_price[0]">
              ￥ {{ review.app_price[0].PriceFinal / 100 }}
            </span>
            <span v-else>
              未知
            </span>
          </v-chip>
        </div>
      </v-layout>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    review: {
      type: null,
      default: null,
      required: true
    },
  }
}
</script>
