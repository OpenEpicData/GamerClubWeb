<template>
  <v-card
    height="240px"
    flat
    class="elevation-0"
  >
    <v-card
      :color="tagWithSmall.color"
      :dark="tagWithSmall.dark"
      height="180px"
      flat
      class="elevation-0"
    >
      <v-layout
        align-center
        justify-space-around
        column
        fill-height
      >
        <div />
        <div>
          <v-img
            :src="tagWithSmall.img"
            width="120px"
            height="120px"
            style="margin: 0 auto;"
          />
        </div>
        <div class="my-2">
          <h5 class="subheading">
            {{ tagWithSmall.title }}
          </h5>
        </div>
      </v-layout>
    </v-card>
    <v-layout
      align-center
      justify-center
      row
      fill-height
      style="height:60px;border: 1px solid #ccc;border-radius: .5rem;border-image:url(/border.svg) 1 rounded"
    >
      <v-flex
        v-for="k in 3"
        :key="k"
      >
        <div
          v-if="k === 2"
          class="grey--text"
        >
          |
        </div>
        <div v-else-if="k === 1">
          <h5 class="subheading">
            <span v-if="tagTotal">
              {{ tagTotal[tagWithSmall.title].toLocaleString() }}
            </span>
            <v-progress-circular
              v-else
              indeterminate
              color="primary"
            />
            <br>
            <span class="grey--text body-2">
              {{ tagWithSmall.knownGame.title }}
            </span>
          </h5>
        </div>
        <div v-else>
          <h5 class="subheading">
            <span v-if="tagReviewTotal">
              {{ tagReviewTotal[tagWithSmall.title].toLocaleString() }}
            </span>
            <v-progress-circular
              v-else
              indeterminate
              color="primary"
            />
            <br>
            <span class="grey--text body-2">
              {{ tagWithSmall.knownReview.title }}
            </span>
          </h5>
        </div>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    tagWithSmall: {
      type: Object,
      default: Object,
      required: true
    },
    tagTotal: {
      type: null,
      default: null,
      required: true
    },
    tagReviewTotal: {
      type: null,
      default: null,
      required: true
    }
  }
}
</script>
