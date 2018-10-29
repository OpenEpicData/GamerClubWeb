<template>
  <div style="height: 100%">
    <v-card height="100%" flat>
      <div style="height: calc(100% - 56px)">
        <v-img @click="cardTo($i18n.path('apps/' + $t('carousel_game.game.tab[' + carouselTab + '].to')))" :src="image" height="100%" :aspect-ratio="16/9" gradient="to top right, rgba(0,0,0,.7), rgba(0,0,0,.7)" style="cursor: pointer;">
          <v-layout fill-height align-center justify-center>
            <v-flex xs12 md10 class="white--text text-xs-center">
              <v-container>
                <h2>
                  <nuxt-link class="white--text" :to="$i18n.path('apps/' + $t('carousel_game.game.tab[' + carouselTab + '].to'))" style="text-decoration:none">
                    {{ $t('carousel_game.game.tab[' + carouselTab + '].title') }}
                  </nuxt-link>
                </h2>
                <h3 class="my-3">{{ $t('carousel_game.game.tab[' + carouselTab + '].description') }}</h3>
                <v-layout fill-height align-center justify-center class="hidden-sm-and-down">
                  <v-flex xs3>
                    <v-progress-linear background-color="g-blue-hydrogen"></v-progress-linear>
                  </v-flex>
                </v-layout>
                <h4 class="hidden-sm-and-down">{{ $t('carousel_game.game.tab[' + carouselTab + '].star') }}</h4>
              </v-container>
            </v-flex>
          </v-layout>
        </v-img>
      </div>
      <v-bottom-nav
        :active.sync="carouselTab"
        :value="true"
        absolute
        class="black"
      >
        <v-btn
          dark
          flat
          :value="i"
          v-for="(item, i) in $t('carousel_game.game.tab')"
          :key="i"
        >
          <span>{{ item.title }}</span>
        </v-btn>
      </v-bottom-nav>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carouselTab: 0,
      image: this.$t('carousel_game.game.tab[0].img')
    }
  },
  mounted: function () {
    const carouselTab = parseInt(this.carouselTab)
  },
  methods: {
    cardTo: function (value) {
      this.$router.push(value)
    }
  },
  watch: {
    carouselTab: function (value) {
      this.image = this.$t('carousel_game.game.tab[' + value + '].img')
    }
  }
}
</script>

