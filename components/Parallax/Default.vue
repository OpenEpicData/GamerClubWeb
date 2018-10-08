<template>
  <v-parallax dark :src="imgPath" class="hidden-sm-and-down">
    <v-container fluid grid-list-sm class="index-main-container">
      <v-layout align-center justify-start row fill-height>
        <v-flex xs10 lg6 class="px-3 py-5" style="background: linear-gradient(to right, rgba(170,75,107,.7), rgba(59,141,153,.7))">
          <div class="py-3">
            <h1 class="display-3">
              {{ $t('carousel.item1.title') }}
            </h1>
            <h4 class="headline font-weight-thin">
              "{{ $t('carousel.item1.description') }}"
            </h4>
          </div>
          <v-flex d-flex xs12>
            <div>
              <v-btn dark large flat outline :href="this.$t('carousel.item1.href')" target="_black" class="mx-0">
                <span>{{ $t('learn-more') }}</span>
              </v-btn>
              <v-btn dark large flat class="ml-3" :href="this.$t('carousel.item1.video')" target="_black">
                <v-icon left>far fa-play-circle</v-icon> <span>{{ $t('Play video') }}</span>
              </v-btn>
            </div>
          </v-flex>
          <v-flex d-flex xs3>
            <v-progress-linear :v-model="12" background-color="g-purple-purplin" color="g-purple-purplin"></v-progress-linear>
          </v-flex>
          <h2 class="title font-weight-thin">{{ $t('carousel.item1.star') }}</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-parallax>
</template>

<script>
export default {
  props: ['imgPath']
}
</script>

