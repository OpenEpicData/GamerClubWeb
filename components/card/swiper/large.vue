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
          v-for="(item, i) in news"
          :key="i"
          class="swiper-slide"
        >
          <v-card
            height="260px"
            color="secondary"
            class="elevation-3 my-2"
            style="border-radius: .5rem;"
          >
            <v-layout
              align-start
              justify-start
              fill-height
            >
              <v-flex
                xs12
                md4
                fill-height
                class="primary"
              >
                <v-layout
                  align-center
                  justify-space-around
                  column
                  fill-height
                >
                  <div>
                    <v-btn
                      color="secondary"
                      depressed
                       
                      dark
                    >
                      {{ item.Type }}
                    </v-btn>
                  </div>
                  <div>
                    <v-icon size="120">
                      fas fa-monument
                    </v-icon>
                  </div>
                  <div>
                    <v-btn
                      text
                    >
                      <v-icon left>
                        far fa-newspaper
                      </v-icon>
                      {{ item.Site }}
                    </v-btn>
                  </div>
                </v-layout>
              </v-flex>
              <v-flex
                xs12
                md8
                fill-height
                class="px-5 text-xs-left"
              >
                <v-layout
                  align-start
                  justify-center
                  column
                  fill-height
                >
                  <div>
                    <h5
                      class="font-weight-medium hide-2line"
                      style="font-size: 1.5rem;"
                    >
                      <a
                        :href="item.Link"
                        target="_black"
                        class="accent--text"
                      >
                        {{ item.Title }}...
                      </a>
                    </h5>
                  </div>
                  <div class="my-3">
                    <h6
                      class="font-weight-regular hide-3line"
                      style="font-size: .875rem;"
                      v-text="item.Description"
                    />
                  </div>
                  <div>
                    <v-chip
                      flat
                      
                      small
                      class="mx-0 grey--text"
                      color="transparent"
                    >
                      <v-icon
                        small
                        left
                      >
                        fas fa-clock
                      </v-icon>
                      {{ item.LastUpdated }}
                    </v-chip>
                  </div>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card>
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
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: null,
      default: null,
      required: true
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        slidesPerColumn: 2,
        slidesPerColumnFill: 'row',
        spaceBetween: 30,
        simulateTouch: false,
        navigation: {
          prevEl: '.swiper-prev',
          nextEl: '.swiper-next'
        }
      }
    }
  },
  methods: {
    parseHTML: function(val) {
      return val.replace(/<[^>]+>/g, '')
    }
  }
}
</script>

<style scoped>
.swiper-prev,
.swiper-next {
  border-radius: 30%;
  cursor: pointer;
  z-index: 2;
}
.swiper-prev {
  position: absolute;
  left: 0;
  top: 42%;
}
.swiper-next {
  position: absolute;
  right: 0;
  top: 42%;
}
</style>
