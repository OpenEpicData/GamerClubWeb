<template>
  <div>
    <div v-swiper:mySwiper="swiperOption">
      <div class="primary pa-4 elevation-3 swiper-prev">
        <v-icon
          x-large
          color="white"
        >
          far fa-arrow-alt-circle-left
        </v-icon>
      </div>
      <div class="swiper-wrapper">
        <div
          v-for="d in 12"
          :key="d"
          class="swiper-slide"
        >
          <largeCard />
        </div>
      </div>
      <div class="primary pa-4 elevation-3 swiper-next">
        <v-icon
          x-large
          color="white"
        >
          far fa-arrow-alt-circle-right
        </v-icon>
      </div>
    </div>
    <div class="mt-3">
      <v-btn
        outline
        large
        round
      >了解更多</v-btn>
    </div>
  </div>
</template>

<script>
import largeCard from '~/components/card/large'
export default {
  components: {
    largeCard,
  },
  data () {
    return {
      swiperOption: {
        centeredSlides: true,
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        spaceBetween: 30,
        simulateTouch: false,
        slidesOffsetBefore: -700,
        navigation: {
          prevEl: '.swiper-prev',
          nextEl: '.swiper-next',
        },
      }
    }
  }
}
</script>

<style scoped>
.swiper-prev, .swiper-next {
  border-radius: 30%;
  cursor: pointer;
  z-index: 2;
}
.swiper-prev {
  position:absolute;
  left: 0;
  top: 42%;
}
.swiper-next {
  position:absolute;
  right: 0;
  top: 42%;
}
</style>

