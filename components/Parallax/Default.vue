<template>
  <v-img dark :src="$t('carousel[0].img')" :aspect-ratio="16/9" gradient="to top right, rgba(31,31,34,.33), rgba(31,31,34,.33)" max-height="60vh">
    <v-container fluid grid-list-sm fill-height>
      <v-layout align-center justify-center row>
        <v-flex xs12 lg6 class="px-3 py-5 text-xs-center white--text">
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
          <v-flex d-flex xs12>
            <v-layout align-start justify-center row fill-height>
              <v-flex xs12>
                <vs-button color="red" style="width: 25%">
                  <span>{{ $t('learn-more') }}</span>
                </vs-button>
                <vs-button color="white" style="width: 25%" class="black--text">
                  <span>{{ $t('Play video') }}</span>
                </vs-button>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
export default {
  props: ['imgPath']
}
</script>

