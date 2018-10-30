<template>
  <v-parallax dark :src="$t('carousel[0].img')">
    <v-container fluid grid-list-sm class="index-main-container">
      <v-layout align-center justify-start row fill-height>
        <v-flex xs12 lg6 class="px-3 py-5" style="background: linear-gradient(to right, rgba(170,75,107,.7), rgba(59,141,153,.7))">
          <div class="hidden-sm-and-down">
            <h1 class="display-3">
              {{ $t('carousel[0].title') }}
            </h1>
            <h4 class="headline font-weight-thin py-3">
              "{{ $t('carousel[0].description') }}"
            </h4>
          </div>
          <div class="hidden-md-and-up">
            <h1 class="display-1">
              {{ $t('carousel[0].title') }}
            </h1>
            <h4 class="subheading font-weight-thin py-3">
              "{{ $t('carousel[0].description') }}"
            </h4>
          </div>
          <v-flex d-flex xs6>
            <v-btn dark flat outline :href="this.$t('carousel[0].href')" target="_black" class="mx-0">
              <span>{{ $t('learn-more') }}</span>
            </v-btn>
            <v-btn dark flat :href="this.$t('carousel[0].video')" target="_black"  class="ml-3">
              <v-icon left>far fa-play-circle</v-icon> <span>{{ $t('Play video') }}</span>
            </v-btn>
          </v-flex>
          <v-flex d-flex xs3>
            <v-progress-linear background-color="red" color="red" class="hidden-sm-and-down"></v-progress-linear>
          </v-flex>
          <h2 class="title font-weight-thin hidden-sm-and-down">{{ $t('carousel[0].star') }}</h2>
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

