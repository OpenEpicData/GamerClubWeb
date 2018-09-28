<template>
  <v-parallax dark src="https://i.loli.net/2018/09/28/5bad7c94ac367.jpg" class="hidden-sm-and-down">
    <v-container fluid grid-list-sm class="index-main-container">
      <v-layout align-center justify-start row fill-height>
        <v-flex xs10 lg6 class="mx-3">
          <div class="my-3">
            <h1 class="display-3">
              {{ $t('carousel.item1.title') }}
            </h1>
            <h4 class="headline font-weight-thin">
              "{{ $t('carousel.item1.description') }}"
            </h4>
          </div>
          <v-flex d-flex xs3>
            <div>
              <v-btn dark block large flat outline :to="$i18n.path('apps/435150')">
                <span>{{ $t('learn-more') }}</span>
              </v-btn>
              <v-progress-linear :v-model="12" background-color="g-blue-hydrogen" color="g-purple-purplin"></v-progress-linear>
            </div>
          </v-flex>
          <h2 class="title font-weight-thin">{{ $t('carousel.item1.star') }}</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-parallax>
</template>