<template>
  <v-parallax dark src="https://compass-ssl.xbox.com/assets/59/91/59914d88-e694-416d-90ff-69dbd55996ef.jpg?n=64728194_GLP-Page-Hero-1084_1920x1080.jpg" class="hidden-sm-and-down">
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
          <v-flex d-flex xs3>
            <div>
              <v-btn dark block large flat outline :to="$i18n.path('apps/812140')">
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