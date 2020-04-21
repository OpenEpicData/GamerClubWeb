<template>
  <div>
    <div v-if="news">
      <v-row no-gutters>
        <v-col cols="12">
          <h3 class="display-1 secondary--text">
            <span> {{ title }} </span>
          </h3>
        </v-col>

        <v-col v-for="(item, i) in news" :key="i" cols="12">
          <v-card flat color="transparent" hover class="py-4">
            <v-row no-gutters class="align-center justify-space-between">
              <v-col cols="10">
                <v-row>
                  <v-col cols="2" class="d-none d-md-flex">
                    <v-img
                      v-if="item.image"
                      @click="
                        ;(dialog = true), (url = item.ref_link), (open_news = i)
                      "
                      :src="item.image"
                      class="pointer"
                      width="100%"
                      height="100%"
                      max-height="60"
                    ></v-img>
                  </v-col>

                  <v-col col="12" md="10">
                    <div>
                      <h4
                        @click="
                          ;(dialog = true),
                            (url = item.ref_link),
                            (open_news = i)
                        "
                        class="underline pointer title text-truncate mb-1"
                      >
                        <span>
                          {{ item.title }}
                        </span>
                      </h4>

                      <h5 class="subtitle-2 font-weight-light grey--text">
                        {{ item.description }}
                      </h5>
                    </div>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="auto" class="d-none d-md-flex text-right">
                <div>
                  <v-chip
                    @click="
                      $store.commit('setSearch', { refName: item.ref.name })
                      $store.dispatch('fetch_news')
                    "
                    small
                    label
                    color="tertiary"
                  >
                    <v-icon left small>mdi-map-marker</v-icon>
                    {{ item.ref.name }}
                  </v-chip>
                  <br />
                  <v-btn text small>
                    {{ $dayjs.utc(item.updated_at).toNow() }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
          <v-divider />
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col cols="8" lg="6">
          <v-pagination
            v-if="pagination"
            v-model="page"
            :length="$store.state.data.news.latest.last_page"
            class="news-pagination"
            color="primary"
            circle
          ></v-pagination>
        </v-col>
      </v-row>

      <v-dialog
        v-model="dialog"
        max-width="1300px"
        scrollable
        transition="scroll-x-transition"
      >
        <v-card height="80vh">
          <iframe
            :src="url"
            frameborder="0"
            width="100%"
            height="100%"
          ></iframe>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      url: null,
      open_news: null,
      page: this.$store.state.data.news.latest.current_page
    }
  },
  watch: {
    page(newVal, oldVal) {
      this.$store.commit('setSearch', { page: this.page })
      this.$store.dispatch('fetch_news')
    },
    dialog(newVal, oldVal) {
      if (oldVal) {
        this.url = null
      }
    }
  }
}
</script>
